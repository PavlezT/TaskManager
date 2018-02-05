const lsdocsModel = require('../models/lsdocstasks');
const generalModel = require('../models/general');
const ObjectID = require('mongodb').ObjectID;
const configHelper = require('../helpers/config.js');

exports.all = function(req,res) {
    let site = req.session.authLSDocs.siteUrl; 
    
    lsdocsModel.all(site,req.session.authLSDocs.access_token)
        .then(data=>{
            res.send(data.body ? (data.body.d ? data.body.d.results : data.body.d) : data.text );
        })
        .catch(err=>{
            console.error('<LSDocsTasks> get All error:',err)
            return res.status(500).json({error:'get LSTasks list error',message: err });
        })
}

exports.subscription = function(req,res){ 
    let site = req.session.authLSDocs.siteUrl;
    let notificationUrl = configHelper.config.notificationUrl_LSDocs;
    let expiryDate = (new Date(Date.now()));
    expiryDate.setMonth(expiryDate.getMonth() + 6);
    expiryDate.setDate(expiryDate.getDate()-2);

    let sendData = {
        "resource": `${site}/_api/web/Lists/getByTitle('LSTasks')`,
        "notificationUrl": notificationUrl,
        "expirationDateTime":  expiryDate//2017-11-27T16:17:57
      }

    if(!req.session.user)
        return res.status(403).json({error:'There is no user in session!'});
    if(!req.session.user.admin)
        return res.status(401).json({error:'You do not have permission!'});

    Promise.all([
            generalModel.all('Subscriptions',{filter : {
                "Company._docId" : req.session.user.company._docId,
                Source : "lsdocs"
            }}),
            lsdocsModel.subscription(site,req.session.authLSDocs.access_token,sendData)
        ])
        .then(([subscription,data])=>{
             /* Example of subscription response
            {
                "odata.metadata": "https://lizardsoftdev.sharepoint.com/sites/LaxaContracts/_api/$metadata#SP.ApiData.Subscriptions/@Element",
                "odata.type": "Microsoft.SharePoint.Webhooks.Subscription",
                "odata.id": "https://lizardsoftdev.sharepoint.com/sites/LaxaContracts/_api/web/lists('6dc74f0c-f9b2-4821-bd3b-acd98c9a5a04')/subscriptions",
                "odata.editLink": "web/lists('6dc74f0c-f9b2-4821-bd3b-acd98c9a5a04')/subscriptions",
                "clientState": null,
                "expirationDateTime": "2017-11-27T16:17:57Z",
                "id": "567b8ae6-ae2c-449a-9950-536a499552e5",
                "notificationUrl": "https://lstaskmanagertest.azurewebsites.net/_api/sharepoint/webhook",
                "resource": "6dc74f0c-f9b2-4821-bd3b-acd98c9a5a04",
                "resourceData": null
            } */
                let subs = {
                    subscriptionId : data.body.id,
                    resource : data.body.resource,
                    siteUrl : data.body["odata.id"].substring(0,data.body["odata.id"].indexOf('/_api/web')),
                    expirationDateTime : data.body.expirationDateTime,
                    Source : "lsdocs"
                }

                return Promise.all([
                    (subscription[0] ?
                        generalModel.update('Subscriptions',subscription[0]._id,subs,req.session.user)
                        :generalModel.create('Subscriptions',subs,req.session.user.userId,req.session.user.company._docId)
                    ),
                    (subscription[0] && subscription[0].siteUrl != subs.siteUrl ? 
                        lsdocsModel.unsubscribe(subscription[0],req.session.authLSDocs.access_token).then(()=>{return subs}).catch(err=>{return subs}) 
                        : Promise.resolve(subs))
                ])
        })
        .then( ([m,subs])=>{
            lsdocsModel.triggerSync(notificationUrl, { value : [ { subscriptionId : subs.subscriptionId, all : true } ]} ).catch(err=>{})
            res.status(201).json(subs);
        })
        .catch(err=>{
            console.error('<LSDocsTasks> set Subscription on list code error:',err)
            return res.status(500).json({error:'set Subscription on list code error',message: err });
        })
}

exports.getWebUrl = function(req,res){
    if(!req.session.authInfo['https://graph.microsoft.com/'] && !req.session.authInfo['https://graph.microsoft.com/'].access_token)
        return res.status(403).json({error:'There is no auth in GraphAPI'});

    lsdocsModel.getWebUrl(req.session.authInfo['https://graph.microsoft.com/'].access_token)
        .then(data=>{
            res.send(data.body ? (data.body.value ? data.body.value : data.body) : data.text );
        })
        .catch(error=>{
            console.error('<LSDocsTasks> getWebUrl error:',error)
            return res.status(500).json({error:'getWebUrl list error',message: error });
        })
}

exports.getSubTasks = (req,res) => {
    let task = req.body;
    let contentType = req.params.contentType;
    let site = req.session.authLSDocs.siteUrl;

    (contentType == "LSTaskResolution" ? 
        lsdocsModel.getSubRezolutions(site,req.session.authLSDocs.access_token,task)
      : lsdocsModel.getSubTasks(site,req.session.authLSDocs.access_token,task) 
    )
    .then( data => {
        res.send(data.body ? (data.body.d ? data.body.d.results : data.body.d) : data.text );
    })
    .catch(error=>{
        console.error('<LSDocsTasks> get sub tasks error:',error)
        return res.status(500).json({error:'get sub tasks error',message: error });
    })
}

exports.checkResolution = function(req,res){
    let site = req.session.authLSDocs.siteUrl;
    
    if(!req.body.sysIDItem || !req.body.sysIDList)
        return res.status(418).json({error:'Not all data presents!'});

    lsdocsModel.checkResolution(site,req.session.authLSDocs.access_token,req.body)
        .then(data=>{
            res.send(data.body ? (data.body.d ? data.body.d.results : data.body.d) : data.text );
        })
        .catch(err=>{
            console.error('<LSDocsTasks> checkResolution error:',err)
            return res.status(500).json({error:'checkResolution error',message: err });
        })
}

exports.docProps = function(req,res) {
    let site = req.session.authLSDocs.siteUrl;
    
    if(!req.session.user)
        return res.status(500).json({error:'There is no user in session!'});
    if(!req.query.itemId || !req.query.listId)
        return res.status(418).json({error:'Not all data presents!'});

    lsdocsModel.docProps(site,req.session.authLSDocs.access_token,req.query.itemId,req.query.listId)
        .then(data=>{
            res.send(data.body && data.body.d ? data.body.d  : data.text );
        })
        .catch(err=>{
            // console.error('<LSDocsTasks> get docProps error:',err.response.text)
            return res.status(500).json({error:'get docFields list error',message: err });
        })
}

exports.docFields = function(req,res) {
    let site = req.session.authLSDocs.siteUrl;
  
    if(!req.session.user)
        return res.status(500).json({error:'There is no user in session!'});
    if(!req.query.contentTypeId || !req.query.listId)
        return res.status(418).json({error:'Not all data presents!'});
    
    lsdocsModel.docFields(site,req.session.authLSDocs.access_token,req.query.listId,req.query.contentTypeId)
        .then(data =>{
            res.send(data.body ? (data.body.d ? data.body.d.results : data.body.d) : data.text );
        })
        .catch(err=>{
            // console.error('<LSDocsTasks> get docFields error:',err.response.text)
            return res.status(500).json({error:'get docFields list error',message: err });
        })
}

exports.update = function(req,res){
    let site = req.session.authLSDocs.siteUrl;

    let status = req.params.status; 
    let id = req.params.id;
    let data = req.body;

    if(!req.session.user)
        return res.status(500).json({error:'There is no user in session!'});
    if(!id || (!data && !data.updateTaskData && !data.toHistory))
        return res.status(418).json({error:'Not all data presents!'});

    lsdocsModel.updateTaskData(site,req.session.authLSDocs.access_token,req.session.authLSDocs.digest,id,data.updateTaskData)
        .then(response=>{
            res.end(JSON.stringify({'status':'Ok'}));
            return status? writeToHistoryAfterTaskDone(site,req.session.authLSDocs.access_token,req.session.authLSDocs.digest,data.toHistory,data.transitTaskData) 
                         : writeToHistoryAfterTaskGet(site,req.session.authLSDocs.access_token,req.session.authLSDocs.digest,data.toHistory);
        })
        .catch(err=>{
            return res.status(500).json({error:'update Task error',message: err });
        })
}

function writeToHistoryAfterTaskGet(site,access_token,digest,toHistory) {
    return Promise.all([
        lsdocsModel.updateTransitHistory(site,access_token,digest,toHistory),
        lsdocsModel.updateTransitHistory(site,access_token,digest,toHistory,'TaskAndDocHistory')
    ])
      .then(response=>{ })
      .catch(err=>{
        console.error('lsdocstasks (writeToHistoryAfterTaskGet) updateTransitHistory error in site :'+ site,err);
      })
}

function writeToHistoryAfterTaskDone(site,access_token,digest,toHistory,transitTaskData) {
    return lsdocsModel.updateTransitTask(site,access_token,digest,transitTaskData)
        .then(()=>{
            return Promise.all([
                lsdocsModel.updateTransitHistory(site,access_token,digest,toHistory),
                lsdocsModel.updateTransitHistory(site,access_token,digest,toHistory,'TaskAndDocHistory')
            ]);
        })
        .then(response=>{})
        .catch(err=>{
            console.error('lsdocstasks (writeToHistoryAfterTaskGet) updateTransitHistory error in site :'+ site,err);
        })
}