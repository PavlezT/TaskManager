const db = require('../db');
const ObjectID = require('mongodb').ObjectID;
const request = require('superagent');

const userFields = ["AssignedTo", "Author", "Editor"];

exports.taskOnCreate = (req, res) => {
    var promiseArr = [];
    var companyId = req.body["CompanyId"];
    Object.keys(req.body).forEach(field => {
        if (userFields.indexOf(field) != -1) {
            promiseArr.push(db.get().collection(companyId + "Users").findOne({"Dynamics365Id": req.body[field]}));
        }
    });
    Promise.all(promiseArr).then(response => {
        var counter = 0;
        Object.keys(req.body).forEach(field => {
            if (userFields.indexOf(field) != -1) {
                req.body[field] = {
                    "_col": companyId + "Users",
                    "_docId": response[counter]["_id"].toString()
                }
                ++counter;
            } else if (field == "IsImportant") {
                req.body[field] = (req.body[field] == "true") ? true : false;
            }
        });

        req.body["Company"] = {
            "_col": "Companies", 
            "_docId": companyId
        };
        req.body["Source"] = "dynamics365";

        delete req.body["CompanyId"];
        db.get().collection(companyId + "Tasks").insert(req.body, (err, result) => {
            if (err) {
                loggerHelper.logger.log('error', 'Dynamics 365 query error: %s', err);
                return res.sendStatus(500);
            }
            return res.sendStatus(200);
        });
    });
};

exports.taskOnUpdate = (req, res) => {
    var promiseArr = [];
    var companyId = req.body["CompanyId"];
    Object.keys(req.body).forEach(field => {
        if (userFields.indexOf(field) != -1) {
            promiseArr.push(db.get().collection(companyId + "Users").findOne({"Dynamics365Id": req.body[field]}));
        }
    });
    Promise.all(promiseArr).then(response => {
        var counter = 0;
        Object.keys(req.body).forEach(field => {
            if (userFields.indexOf(field) != -1) {
                req.body[field] = {
                    "_col": companyId + "Users",
                    "_docId": response[counter]["_id"].toString()
                }
                ++counter;
            } else if (field == "IsImportant") {
                req.body[field] = (req.body[field] == "true") ? true : false;
            }
        });

        req.body["Company"] = {
            "_col": "Companies", 
            "_docId": req.body["CompanyId"]
        };

        db.get().collection(companyId + "Tasks").findOne({"ExternalId": req.body["ExternalId"]}).then(task => {
            var taskId = task["_id"].toString();
            Object.keys(req.body).forEach(field => {
                task[field] = req.body[field];
            });
            delete task["_id"];
            delete task["CompanyId"];
            db.get().collection(companyId + "Tasks").updateOne(
                { _id: ObjectID(taskId) },
                { $set: task },
                (err, result) => {
                    if (err) {
                        loggerHelper.logger.log('error', 'Dynamics 365 query error: %s', err);
                        return res.sendStatus(500);
                    }
                    return res.sendStatus(200);
                }
            );
        });
    });
};

exports.getSubscriptionsList = (req, res) => {
    db.get().collection("Subscriptions").find({"Source": "dynamics365"}, {
        "_id": 1,
        "Company": 1,
        "DynamicsInstanceUrl": 1,
        "DynamicsOrgName": 1
    }).toArray((err, docs) => {
        if (err) {
            loggerHelper.logger.log('error', 'Dynamics 365 query error: %s', err);
            return res.sendStatus(500);
        }
        return res.send(docs);
    });
}

exports.taskUpdate = (req, res) => {
    var resource;
    Object.keys(req.session.authInfo).forEach(authResource => {
        if (authResource.indexOf('crm') != -1) resource = authResource;
    });
    request
        .patch(`${resource}/api/data/v8.1/tasks(${req.params.id})`)
        .send(req.body)
        .set('Authorization', 'Bearer ' + req.session.authInfo[resource].access_token)
        .then((response,err) => {
            if (err) {
                loggerHelper.logger.log('error', 'Dynamics365 error from resource while updating task %s: %s', resource, err);
                return res.sendStatus(500);
            }
            return res.send(response.body);
        });
}

exports.getUsers = (req, res) => {
    var resource;
    Object.keys(req.session.authInfo).forEach(authResource => {
        if (authResource.indexOf('crm') != -1) resource = authResource;
    });
    request
        .get(`${resource}/api/data/v8.1/systemusers?$select=systemuserid,internalemailaddress,fullname,mobilephone`)
        .set('Authorization', 'Bearer ' + req.session.authInfo[resource].access_token)
        .then((response,err) => {
            if (err) {
                loggerHelper.logger.log('error', 'Dynamics365 error from resource while gettings users list %s: %s', resource, err);
                return res.sendStatus(500);
            }
            return res.send(response.body);
        });
}