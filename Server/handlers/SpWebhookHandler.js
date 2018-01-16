const generalModel = require('../models/general');
const lsdocstasksModel = require('../models/lsdocstasks');
const auth_lsdocs = require('../helpers/auth_lsdocs');
const db = require('../db');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

const config = {
  subscriptionList : 'Subscriptions',
  usersList : 'Users',
  lstasksList : 'Tasks',
  externalList : 'LSDocsTasks'
}
// webhook response :
/* {"value":[
  {
    "subscriptionId":"567b8ae6-ae2c-449a-9950-536a499552e5",
    "clientState":null,
    "expirationDateTime":"2017-11-27T16:17:57.0000000Z",
    "resource":"6dc74f0c-f9b2-4821-bd3b-acd98c9a5a04",
    "tenantId":"efd1ecec-87f9-49d0-a7cc-04c7e6bc0c64",
    "siteUrl":"/sites/LaxaContracts",
    "webId":"b60bb7bc-20ec-4744-a9cd-86f425301cd5"
  }
  ]} */

exports.post = function(req,res){
  if(req.query.validationtoken){
    res.setHeader('Content-Type', 'text/plain')
    res.send(req.query.validationtoken);
  } else {
    SPEventReceived(req,res);
  }
}

function SPEventReceived(req,res){
  let event = req.body.value ? req.body.value[0] : { subscriptionId : null, siteUrl : 'value[0] is null' };
  log("\nstart event received: " + (new Date(Date.now()).toJSON()), event.siteUrl || 'test')
  generalModel.all(config.subscriptionList,{filter : {
    subscriptionId : event.subscriptionId
  }})
    .then(subscribe => {
      if(!subscribe[0])
        throw `No subscription for: ${event.siteUrl}`;

      event.subscribe = subscribe[0];
      req.body.siteUrl = event.subscribe.siteUrl;
      
      return new Promise( (resolve,reject) => { auth_lsdocs.checkAuth(req,res,resolve) });
    })
    .then(()=>{
      
      if(event.all || !event.subscribe.ChangeToken)
        getAll(event.subscribe,req.session.authLSDocs.access_token);
      else
        getChanges(event.subscribe,req.session.authLSDocs.access_token);

      res.status(200).json({});
    })
    .catch(error=>{
      logerror('<SPWebHook> error:',error);
      res.status(500).json({})
    })
}

function getChanges(subscribe,access_token){
  let Changes = [];
  log('get changesApi tasks:', (new Date(Date.now()).toJSON()))
  lsdocstasksModel.changes(subscribe.siteUrl,access_token,subscribe.ChangeToken)
    .then( changes => {
      Changes = (changes.body.d ? changes.body.d.results : []);
      let Items = [];
      let Ids = {};
      Changes.map(item=>{
        if(item.ItemId && !Ids[item.ItemId]){
          Items.push(lsdocstasksModel.items(subscribe.siteUrl,access_token,item.ItemId).catch(error=>{}));
          Ids[item.ItemId] = true;
        }
      })
      log('api  changes  length:',changes.body.d.results.length)
      log('all changes get keys:',Object.keys(Ids).length)
      if(Object.keys(Ids).length == 0)
        return Promise.resolve([[],[]])
      return Promise.all([
        (new Promise( (resolve,reject) =>db.get().collection(subscribe.Company._docId + config.lstasksList).find(
          { 
            "Company._docId" : subscribe.Company._docId,
            "Source" : 'lsdocs',
            "ExternalId" : {
              "$in" : Object.keys(Ids).map(item=>{
                        return parseInt(item);
                      })
            }
          }
        ).toArray((error,tasks)=>{
          if(error) 
            return reject(error);
          resolve(tasks);
        }))),
        Promise.all(Items).then(data => {
          let items = []
          data.map( res=> {
            if(res && res.body.d && res.body.d.results && res.body.d.results[0]){
              items.push(res.body.d.results[0]);
            }
              
          })
          
          return items;
        })
      ])
    })  
    .then(([oldTasks,data])=>{
      let newTasks = data;//data.body ? (data.body.d ? data.body.d : []) : [];
      console.log('newtask:',oldTasks.length)
      log('received sp oldtasks: ' + oldTasks.length);
      log('received sp newTasks: ' + newTasks.length);

      //Start: Finding already saved LSDocsTasks in our DB and remove them to prevent duplicates
      for(var i = 0; i < oldTasks.length; i++){
        for(var j = 0; j < newTasks.length; j++){
          if(newTasks[j] && oldTasks[i].ExternalId && newTasks[j].ID == oldTasks[i].ExternalId){

            let temp = {
              new : newTasks[j],
              oldId : oldTasks[i]["_id"],
              oldPropsId : oldTasks[i].ExternalDoc? oldTasks[i].ExternalDoc._docId : null,
              task : {}
            }
            temp.task.Title = temp.new.Title;
            temp.task.Description = temp.new.TaskDescription;
            temp.task.DueDate = temp.new.TaskDueDate;
            temp.task.Status = temp.new.OData__Status;

            Promise.all([
              generalModel.all(subscribe.Company._docId+config.usersList,{select : ['_id'],filter : {
                Email : temp.new.TaskAuthore.EMail,
                "Company._docId" : subscribe.Company._docId
              }}),
              generalModel.all(subscribe.Company._docId+config.usersList,{select : ['_id'],filter : {
                Email : temp.new.AssignedTo && temp.new.AssignedTo.EMail && temp.new.AssignedTo.EMail.length > 1 ? temp.new.AssignedTo.EMail : (temp.new.AssignetToEmail && temp.new.AssignetToEmail.length > 1 ? temp.new.AssignetToEmail : 'not found'),
                "Company._docId" : subscribe.Company._docId
              }})
            ])
            .then(([author,assignedTo]) => {
              author = author && author[0] && author[0]._id ? `${author[0]._id}` : null;
              assignedTo = assignedTo && assignedTo[0] && assignedTo[0]._id ? `${assignedTo[0]._id}` : null;

              temp.task.AssignedTo =  {
                "_col": subscribe.Company._docId+config.usersList,
                "_docId": assignedTo
              };
              temp.task.Author = {
                "_col": subscribe.Company._docId+config.usersList,
                "_docId": author
              }
      
              return generalModel.update(subscribe.Company._docId+config.lstasksList,temp.oldId,temp.task, {
                company : { _docId :  subscribe.Company._docId },
                userId : temp.task.Author._docId
              });
            })
            .then( ()=>{
              return generalModel.update(subscribe.Company._docId+config.externalList,temp.oldPropsId,temp.new, {
                company : { _docId :  subscribe.Company._docId },
                userId : temp.task.Author._docId
              });
            })
            .catch(error=>{
                logerror('<SPWebHook> error updating task:'+ (new Date(Date.now())).toJSON(),error);
            }) 

            delete newTasks[j];
            delete oldTasks[i];
            break;
          }
        }
      }         
      //End: Finding saved LSDocsTasks

      //Start: Delete Old Tasks (their status is Done in SP)
      deleteTasks(oldTasks,subscribe);
      //End: Delete Old Tasks 
      
      //Start: Add New Tasks
      insertTasks(newTasks,subscribe);
      //End: Add New Tasks 

      //Update changeToken
      updateChangeToken( subscribe, Changes );
      log('changes tasks  ended:', (new Date(Date.now())).toJSON());
    })
    .catch(error=>{
      logerror('<SPWebHook> changes error: ' + (new Date(Date.now())).toJSON() + "\n",error);
    })
}

function getAll(subscribe,access_token) {
  log('getall tasks started:', (new Date(Date.now()).toJSON()))

  Promise.all([
    generalModel.all(subscribe.Company._docId+config.lstasksList,{top:100100,select:['ID','_id','Editor','ExternalId','ExternalDoc'],
      filter : {
        "Company._docId" : subscribe.Company._docId,
        Source : 'lsdocs'
    }}),
    lsdocstasksModel.all(subscribe.siteUrl,access_token)
  ])
  .then( ([oldTasks, data]) =>{ 
    let newTasks = data.body ? (data.body.d ? data.body.d.results : data.body.d) : [];

    log('received sp newTasks: '+ (new Date(Date.now()).toJSON()), newTasks.length );
    log('received sp oldTasks: '+ (new Date(Date.now()).toJSON()), oldTasks.length );

    //Start: Finding already saved LSDocsTasks in our DB and remove them to prevent duplicates
    for(var i = 0; i < oldTasks.length; i++){
      for(var j = 0; j < newTasks.length; j++){
        if(newTasks[j] && oldTasks[i].ExternalId && newTasks[j].ID == oldTasks[i].ExternalId){
          delete newTasks[j];
          delete oldTasks[i];
          break;
        }
      }
    }         
    //End: Finding saved LSDocsTasks

    //Start: Delete Old Tasks (their status is Done in SP)
    deleteTasks(oldTasks,subscribe);
    //End: Delete Old Tasks 

    //Start: Add New Tasks
    insertTasks(newTasks,subscribe);
    //End: Add New Tasks 

    //Update changeToken
    updateChangeToken( subscribe, false , access_token )
      .then((token)=> {
        updateChangeToken( subscribe, false , access_token, token )
      })
    log('getall tasks   ended:', (new Date(Date.now())).toJSON());
  })
  .catch(error=>{
    logerror('<SPWebHook> all error: ' + (new Date(Date.now())).toJSON() + "\n",error);
  })
}

function deleteTasks(oldTasks,subscribe) {
  var TasksToDelete = { tasks : [] , lsdocstasks : []};
  oldTasks.map(task=>{
    TasksToDelete.tasks.push(task._id);
    TasksToDelete.lsdocstasks.push(ObjectID(task.ExternalDoc._docId))
  })

  TasksToDelete.tasks.length > 0 && Promise.all([
    db.get().collection(subscribe.Company._docId+config.lstasksList).deleteMany({
      "_id": {
        "$in":TasksToDelete.tasks
      }
    }),
    db.get().collection(subscribe.Company._docId+config.externalList).deleteMany({
      "_id": {
        "$in":TasksToDelete.lsdocstasks
      }
    })
  ])
  .then(()=>{
    log('end deleting oldtask: ' + (new Date(Date.now())).toJSON(), TasksToDelete.tasks.length)
  })
  .catch( error=>{
    logerror('<SPWebHook> error deleting task:'+JSON.stringify(error) + '::'+ (new Date(Date.now())).toJSON());
  })
}

function insertTasks(newTasks,subscribe) {
  var TasksToCreate = [];
  let NewTasks  = [];
  var Users = {};

  newTasks.map(task=>{
    var temp = {};
    temp.Title = task.Title;
    temp.Description = task.TaskDescription;
    temp.IsImportant = false;
    temp.DueDate = task.TaskDueDate; //2017-10-27T09:00:00.000Z  == // 2017-07-11T00:00:00Z
    temp.Status = task.OData__Status;
    temp.Company = subscribe.Company;
    temp.Source = 'lsdocs';
    temp.ExternalId = task.Id;

    temp.AssignedTo = task.AssignedTo && task.AssignedTo.EMail && task.AssignedTo.EMail.length > 1 ? task.AssignedTo.EMail : (task.AssignetToEmail && task.AssignetToEmail.length > 1 ? task.AssignetToEmail : 'not found') ;
    temp.Editor = task.TaskAuthore.EMail;
    
    if(temp.AssignedTo && !Users[temp.AssignedTo])
      Users[temp.AssignedTo] = 1;
    if(task.TaskAuthore.EMail && !Users[task.TaskAuthore.EMail])
      Users[task.TaskAuthore.EMail] = 1;

    TasksToCreate.push(temp);
    NewTasks.push(task);
  })

  TasksToCreate.length > 0 && (new Promise((resolve,reject) => db.get().collection(subscribe.Company._docId+config.usersList).find(
    {
      "Email": {
        "$in":Object.keys(Users)
      }
    },
    { "_id" : 1 , "Email" : 1 }
  ).toArray((error,users)=>{
    if(error) 
      return reject(error);
    
    users.map( user => {
      Users[user.Email] = user._id
    })
    resolve();
  })))
  .then(()=>{
    TasksToCreate.map((temp,index) => {        
      temp.AssignedTo =  {
        "_col": subscribe.Company._docId+config.usersList,
        "_docId": (Users[temp.AssignedTo] && Users[temp.AssignedTo] != 1 ?  Users[temp.AssignedTo].toString() : null)
      };
      temp.Editor = {
        "_col": subscribe.Company._docId+config.usersList,
        "_docId": (Users[temp.Editor] && Users[temp.Editor] != 1 ?  Users[temp.Editor].toString() : null)
      }
      temp.Author = temp.Editor;
    })
  })
  .then(()=>{
    log("before tasks  insert: " + (new Date(Date.now()).toJSON()))
    var lsdocstasks = [];
    var tasks = [];
    //selecting tasks only assigned to existing in our DB users
   
    NewTasks.map( (item,index) =>{
      item.Company = subscribe.Company;
      if( TasksToCreate[index].AssignedTo["_docId"] ){
        lsdocstasks.push(item)
        tasks.push(TasksToCreate[index]);
      }
    })

    return Promise.all([
      (lsdocstasks.length > 0 ? db.get().collection(subscribe.Company._docId+config.externalList).insert(lsdocstasks) : Promise.resolve(false)),
      Promise.resolve(tasks)
    ])
  })
  .then( ([insertedTask,tempMass]) => {
    if(insertedTask){
      log("after tasks inserted: " + (new Date(Date.now()).toJSON()) + ' ' +insertedTask.ops.length )
      insertedTask.ops.map( (item,index) =>{
        tempMass[index].ExternalDoc = { "_col": subscribe.Company._docId+config.externalList, "_docId": item["_id"].toString() };
      })
      return db.get().collection(subscribe.Company._docId+config.lstasksList).insert(tempMass)
    }
  })
  .then((inserted)=>{
    log("end  inserting tasks: " + (new Date(Date.now()).toJSON()) +' '+ (inserted ? inserted.ops.length : 0))
  })
  .catch(error=>{
    logerror('<SPWebHook> inserting error: ' +  (new Date(Date.now())).toJSON() + "\n",error);
  })
}

function updateChangeToken(subscribe, Changes, access_token, OldToken){
  return (Changes ? Promise.resolve({ body:{d : { results : Changes } }})
    : lsdocstasksModel.changes(subscribe.siteUrl,access_token, OldToken || false ))
    .then( data => {
      let changes = data.body.d.results || [];
      let newToken = false;

      newToken = changes.length > 0 ? changes[0].ChangeToken.StringValue : null;
      log('new token time start:',changes[0] ? changes[0].Time : "not updated");
      newToken && db.get().collection(config.subscriptionList).updateOne(
        { "_id" : subscribe._id },
        { $set : { "ChangeToken" : newToken } }
      )
      return newToken;
    })
    .catch(error => {
      logerror('<SPWebHook> change token error: ' +  (new Date(Date.now())).toJSON() + "\n",error);
    })
}

function log(text,data){
  console.log(text,data);
  if(data && typeof data == 'object'){
    try{
      data = JSON.stringify(data);
    }catch(e){
      data = `${data}`;
    }
  } else {
    data = data ? data.toString() : '';
  }
  
  fs.appendFile('log.txt', text + " " + data + '\n', (err) => {  
      if (err) {};
  });
}

function logerror(text,data){
  console.error(text,data);
  if(data && typeof data == 'object'){
    try{
      data = JSON.stringify(data);
    }catch(e){
      data = `${data}`;
    }
  } else {
    data = data ? data.toString() : '';
  }
  
  fs.appendFile('log.txt', "Error:" + text + " " + data + '\n', (err) => {  
    if (err) {};
  });
}

// mongoexport -h ds145379.mlab.com:45379 -d tasksdb -c 5a18933cb1387a1584da188cLSDocsTasks -u dbUser -p qwer1234 -o 5a18933cb1387a1584da188cLSDocsTasks.json
// mongoexport -h ds145379.mlab.com:45379 -d tasksdb -c 5a18933cb1387a1584da188cTasks -u dbUser -p qwer1234 -o 5a18933cb1387a1584da188cTasks.json
// mongoimport -h ds145379.mlab.com:45379 -d tasksdb -c 5a18933cb1387a1584da188cLSDocsTasks -u dbUser -p qwer1234 --file 5a18933cb1387a1584da188cLSDocsTasks.json
// mongoimport -h ds145379.mlab.com:45379 -d tasksdb -c 5a18933cb1387a1584da188cTasks -u dbUser -p qwer1234 --file 5a18933cb1387a1584da188cTasks.json