const request = require('superagent');

exports.all = function(site,access_token){//,status,email
    return request
        .get(`${site}/_api/web/lists/getByTitle('LSTasks')/Items?$top=5000`
            +`&$select=Title,ID,ContentType/Name,ContentType/Id,Created,StateID,`
                +`StartDate,TaskDueDate,TaskDescription,`
                +`sysIDItem,sysIDList,sysIDMainTask,sysIDParentMainTask,sysTaskLevel,`
                +`TaskResults,OData__Status,OData__Comments,`
                +`TaskAuthoreId,TaskAuthore/Title,TaskAuthore/EMail,AssignedToId,AssignetToTitle,AssignetToEmail,AssignedTo/Title,AssignedTo/EMail`
            +`&$expand=ContentType,TaskAuthore,AssignedTo`
            +`&$filter=`
                // +`(OData__Status+eq+'${status}')`
                // +`and (AssignetToEmail+eq+'${email}')`
                +`(OData__Status+eq+'Not Started')`
                +` or (OData__Status+eq+'In Progress')`
        )
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.subscription = function(site,access_token,data){
    return request
        .post(`${site}/_api/web/lists/getByTitle('LSTasks')/subscriptions`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        })
        .send(data)
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.unsubscribe = (subscription,access_token) =>{
    return request
        .delete(`${subscription.siteUrl}/_api/web/lists/getByTitle('LSTasks')/subscriptions('${subscription.subscriptionId}')`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.triggerSync = (url, body) => {
    return request
        .post(url)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        .send(body)
        .then((data,err)=>{
            if(err)
                throw err;
            return data;
        })
}

exports.getWebUrl = function(access_token){
    return request
        .get(`https://graph.microsoft.com/beta/sites?search="site"`)//https://graph.microsoft.com/beta/sites/root`)
        .set({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.getSubTasks = function(site,access_token,doc){
    return request
        .get(`${site}/_api/Web/Lists/GetByTitle('LSTasks')/items?`
            +`$select=sysIDItem,ID,sysIDList,Title,StartDate,sysTaskLevel,TaskResults,sysIDMainTask,sysIDParentMainTask,`
            +`TaskDueDate,OData__Status,TaskAuthore/Title,TaskAuthore/EMail,AssignedToId,AssignedTo/Title,AssignedTo/EMail,ContentType/Name`
            +`&$expand=TaskAuthore/Title,TaskAuthore/EMail,AssignedTo/Title,AssignedTo/EMail,ContentType`
            +`&$filter=(ContentType ne 'LSResolutionTaskToDo') and (sysIDMainTask eq '${doc.sysIDMainTask == 0 ? doc.Id : doc.sysIDMainTask }') and (sysTaskLevel eq '${parseInt(doc.sysTaskLevel)+1}')`
        )
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.getSubResolutions = function(site,access_token,doc){
    return request
        .get(`${site}/_api/Web/Lists/GetByTitle('LSTasks')/items?`
            +`$select=sysIDItem,ID,sysIDList,Title,StartDate,sysTaskLevel,TaskResults,sysIDMainTask,sysIDParentMainTask,`
            +`TaskDueDate,OData__Status,TaskAuthore/Title,TaskAuthore/EMail,AssignedToId,AssignedTo/Title,AssignedTo/EMail,ContentType/Name`
            +`&$expand=TaskAuthore/Title,TaskAuthore/EMail,AssignedTo/Title,AssignedTo/EMail,ContentType`
            +`&$filter=(sysIDItem eq '${doc.sysIDItem}') and (sysIDList eq '${doc.sysIDList}') and (ContentType eq 'LSResolutionTaskToDo') and (TaskAuthore/EMail eq '${doc.AssignedTo.EMail}') and (StateID eq '${doc.StateID}')`
        )
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}
    
exports.checkResolution = function(site,access_token,doc){
    return request
        .get(`${site}/_api/Web/Lists/GetByTitle('LSTasks')/items?`
            +`$select=ID,sysIDItem,ID,sysIDList,ContentType/Name,TaskAuthore/EMail`
            +`&$expand=TaskAuthore,ContentType`
            +`&$filter=(sysIDItem eq '${doc.sysIDItem}') and (sysIDList eq '${doc.sysIDList}')`
            +` and (ContentType eq '${doc.ContentType}')`
            +` and (TaskAuthore/EMail eq '${encodeURI(doc.CurentUserEmail)}')`
        )
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.docProps = function(site,access_token,itemId,listId){
    return request
        .get(`${site}/_api/Web/Lists('${listId}')/Items(${itemId})/FieldValuesAsText`)
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.docFields = function(site,access_token,listId,contentTypeId){
    return request
        .get(`${site}/_api/Web/Lists('${listId}')/ContentTypes('${contentTypeId}')/Fields?$select=StaticName,Group,Hidden,Title&$filter=(Hidden ne true) and (Group ne 'Hidden')`)
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.updateTaskData = function(site,access_token,digest,id,data){
    return request
        .post(`${site}/_api/web/lists/getByTitle('LSTasks')/Items(${id})`)
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`,
            'X-RequestDigest': digest,
            'X-HTTP-Method':'MERGE',
            'IF-MATCH': '*',
            'Content-Type': 'application/json;odata=verbose'
        })
        .send(data)
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.updateTransitHistory = function(site,access_token,digest,routeData,historyType) {
    let url = `${site}/_api/Web/Lists/GetByTitle('LSDocsListTransitHistory')/Items`;
    
    let body = {
        "__metadata": {
            type: "SP.Data.LSDocsListTransitHistoryItem"
        },
        Title : historyType ? historyType : routeData.HistoryType,
        ListID : routeData.sysIDList,
        ItemID : routeData.sysIDItem,
        Type : routeData.EventTypeUser,
        historyData : JSON.stringify(routeData.HistoryArray),
        itemData : JSON.stringify(routeData.itemData)
    }
    
    return request
        .post(url)
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`,
            'X-RequestDigest': digest,
            'X-HTTP-Method':'POST',
            'IF-MATCH': '*',
            'Content-Type': 'application/json;odata=verbose'
        })
        .send(body)
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.updateTransitTask = function(site,access_token,digest,taskData){
    let url = `${site}/_api/Web/Lists/GetByTitle('LSDocsListTransitTasks')/Items`;

    let body = {
      '__metadata': {
        type: "SP.Data.LSDocsListTransitTasksItem"
      },
      Title :  taskData.Action,
      ListID : taskData.ListID,
      ItemID: taskData.ItemID,
      Type: taskData.Type,
      DataSource : JSON.stringify(taskData.DataSource)
    }

    return request
        .post(url)
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`,
            'X-RequestDigest': digest,
            'X-HTTP-Method':'POST',
            'IF-MATCH': '*',
            'Content-Type': 'application/json;odata=verbose'
        })
        .send(body)
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.changes = (site,access_token,changeToken) => {
    let url = `${site}/_api/Web/Lists/GetByTitle('LSTasks')/getchanges?$orderby=Time desc`;
    
    let body = { 
        'query' : { 
            '__metadata': { 
                'type': 'SP.ChangeQuery' 
            },
            'Add': 'True',
            'Item': 'True',
            'Update' : 'True',
            'Restore' :'True',
            'DeleteObject' : 'True'
        }
    };

    changeToken ? (body.query.ChangeTokenStart = {
        'StringValue': changeToken //"1;3;cb90fc0b-656d-4ee9-9533-44b92de75dd2;636475629481000000;26402906"
    } ) : (url+='&$top=1') ;
   
    return request
        .post(url)
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json;odata=verbose'
        })
        .send(body)
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}

exports.items = (site,access_token,ids) => {
    // if(ids.length == 0)
    //     return Promise.resolve([]);
    // let items = '';
    // ids.map( id => {
    //     items+=(`(Id eq '${id}') and `)
    // });
    // items+=items.substring(0,items.length - " and ".length );
    // console.log('acce:',access_token)
    return request
        .get(`${site}/_api/web/lists/getByTitle('LSTasks')/Items?`
            // +`$top=5000`
            +`$select=Title,ID,ContentType/Name,ContentType/Id,Created,StateID,`
                +`StartDate,TaskDueDate,TaskDescription,`
                +`sysIDItem,sysIDList,sysIDMainTask,sysIDParentMainTask,sysTaskLevel,`
                +`TaskResults,OData__Status,OData__Comments,`
                +`TaskAuthoreId,TaskAuthore/Title,TaskAuthore/EMail,AssignedToId,AssignetToTitle,AssignetToEmail,AssignedTo/Title,AssignedTo/EMail`
            +`&$expand=ContentType,TaskAuthore,AssignedTo`
            +`&$filter=`
                +`(Id eq '${ids}') and `
                +`((OData__Status+eq+'Not Started') or (OData__Status+eq+'In Progress'))`
                //+items
        )
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access_token}`
        })
        .then((data,err) =>{
            if(err)
                throw err;
            return data;
        })
}