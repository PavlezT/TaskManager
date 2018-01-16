const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
};

exports.connect = (url) => {
    return new Promise((resolve,reject) => {
        if (state.db) {
            return resolve();
        }

        MongoClient.connect(url, (err, db) => {
            if (err) {
                return reject(err);
            }
            state.db = db;
            return resolve();
        });
    })
};

exports.get = () => {
    return state.db;
};