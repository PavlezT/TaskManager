const db = require('../db');
const ObjectID = require('mongodb').ObjectID;
const generalModel = require('./general');
const fs = require('fs');

exports.current = (sessionUser) => {
    return new Promise((resolve, reject) => {
        db.get().collection(`${sessionUser.company._docId}Users`).findOne({"Email": sessionUser.email, "Company._docId": sessionUser.company._docId}, (err, user) => {
            if(err)
                return reject(err);
            resolve(user);
        });
    })
}

exports.getCompany = (companyInfo) => {
    return new Promise((resolve, reject) => {
        db.get().collection('Companies').findOne({"id" : companyInfo.id}, (err, company) => {
            if(err)
                return reject(err);
            if(company != null )
                resolve({company: company, created: false});
            else {
                companyInfo.Created = (new Date(Date.now())).toISOString();
                companyInfo.Modified = (new Date(Date.now())).toISOString()
                db.get().collection("Companies").insert(companyInfo, (err, result) => {
                    if (!fs.existsSync(__dirname + '/../src/img/avatars/' + result.ops[0]["_id"])) {
                        fs.mkdirSync(__dirname + '/../src/img/avatars/' + result.ops[0]["_id"]);
                    }
                    if (err)
                        return reject(err);
                    resolve({company: result.ops[0], created: true});
                });
            }
        })
    });
}

exports.ensureUser = (userInfo, companyCreated) => {
    var mail = userInfo.userPrincipalName || userInfo.mail;
    return new Promise((resolve, reject) => {
        db.get().collection(`${userInfo.company._docId}Users`).findOne({"Email": mail, "Company": userInfo.company}, (err, user) => {
            if (err)
                return reject(err);
            if (user != null) {
               resolve({user : user, created : false});
            } else {
                db.get().collection(`${userInfo.company._docId}Users`).insert({"Email": mail, "Admin": companyCreated, "Company": userInfo.company , "Name": userInfo.displayName, "Department": userInfo.department, "JobTitle": userInfo.jobTitle, "Phone": userInfo.mobilePhone , "Created": (new Date()).toISOString(), "Modified": (new Date()).toISOString()}, (err, result) => {
                    if (err)
                        return reject(err);
                    resolve({user: result.ops[0], created: true});
                });
            }
        });
    });
}

exports.createCollection = (collectionName) => {
    return db.get().createCollection(collectionName)
}