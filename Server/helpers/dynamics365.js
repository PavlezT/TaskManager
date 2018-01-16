const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

exports.getResource = (companyId) => {
    return new Promise((resolve, reject) => {
        db.get().collection("Subscriptions").findOne({"Source": "dynamics365", "Company._docId": companyId}, (err, subscription) => {
            if (err)
                return reject(err);
            resolve(subscription);
        });
    });
}