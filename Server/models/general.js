const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

exports.collections = (companyId) => {
    return new Promise((resolve,reject) => {
        db.get().listCollections({ name: { $regex: new RegExp(companyId) }}).toArray((err, collections) => {
            if (err)
                return reject(err);
            resolve(collections);
        });
    });
};

exports.all = (collection, queryParams) => {
    let selectObj = {};
    queryParams.select && queryParams.select.forEach(selectSetting => {
        selectObj[selectSetting] = 1;
    }, this);
    let sortObj = {};
    queryParams.orderby && queryParams.orderby.forEach((orderbySetting) => {
        sortObj[orderbySetting.split(' ')[0]] = (orderbySetting.split(' ')[1] == 'desc') ? -1 : 1;
    }, this);
    queryParams.top = (queryParams.top) != null ? parseInt(queryParams.top) : 5000;
    queryParams.skip = (queryParams.skip) != null ? parseInt(queryParams.skip) : 0;
    let filterObj = {};
    if (queryParams.filter != null) {
        filterObj = typeof queryParams.filter == 'string' ? JSON.parse(queryParams.filter) : queryParams.filter;
    }
    queryParams.CompanyId && ( filterObj["Company._docId"] = queryParams.CompanyId )
    return new Promise( (resolve, reject) => {
        db.get().collection(collection).find(filterObj, selectObj).sort(sortObj).skip(queryParams.skip).limit(queryParams.top).toArray((err, docs) => {
            // If need to expand
            if (queryParams.expand != null) {
                //  Forming minimal quantity of requests
                var promiseArr = [];
                var expandedItems = [];            
                queryParams.expand.split(',').forEach(fieldToExpand => {
                    docs.forEach((doc) => {
                        if (doc[fieldToExpand] != null) {
                            var itemsToExpand = [];
                            //Check if it is Object (not Array)
                            if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Object]") {
                                itemsToExpand.push(doc[fieldToExpand])
                            } else if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Array]") {
                                itemsToExpand = doc[fieldToExpand]
                            }
                            itemsToExpand.forEach(itemToExpand => {
                                var itemWasExpandedBefore = false;
                                expandedItems.forEach(expandedItem => {
                                    if ((expandedItem.Col == itemToExpand['_col'])&&(itemToExpand['_docId'] && expandedItem.DocId == itemToExpand['_docId'].toString())) {
                                        itemWasExpandedBefore = true;
                                        return false;
                                    }
                                });
                                if (itemWasExpandedBefore == false) {
                                    promiseArr.push(db.get().collection(itemToExpand['_col']).findOne({ _id: ObjectID(itemToExpand['_docId'])}));
                                    expandedItems.push({ 'Col': itemToExpand['_col'], 'DocId': itemToExpand['_docId'] ? itemToExpand['_docId'].toString() : null });
                                }
                            });
                        }
                    });
                });
                // Saving results of expanding requests
                Promise.all(promiseArr).then(response => {
                    queryParams.expand.split(',').forEach(fieldToExpand => {
                        docs.forEach((doc) => {
                            var itemsToExpand = [];
                            if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Object]") {
                                itemsToExpand.push(doc[fieldToExpand])
                            } else if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Array]") {
                                itemsToExpand = doc[fieldToExpand]
                            }

                            itemsToExpand.forEach(itemToExpand => {
                                expandedItems.forEach((expandedItem, i) => {
                                    if ((expandedItem.Col == itemToExpand['_col'])&&(itemToExpand['_docId'] && expandedItem.DocId == itemToExpand['_docId'].toString())) {
                                        itemToExpand['props'] = response[i];
                                        return false;
                                    }
                                });
                            });
                        });
                    });
                    if (err)
                        return reject(err);
                    resolve(docs);
                });
            } else {
                if (err)
                    return reject(err);
                resolve(docs);
            }
        });  
    })
};

exports.allKeys = (collection) => {
    return new Promise((resolve,reject) => {
        db.get().command({
            "mapreduce": collection,
            "map": `function() { for (var key in this) emit(key, null); }`,
            "reduce": "function(key, stuff) { return null; }",
            "out": { "inline": 1 }
        }, (err, res) => {
            if(err)
                return reject(err);
            let keys = [];
            res.results.forEach(result => keys.indexOf(result._id) == -1 ? keys.push(result._id) : null);
            resolve(keys);
        });
    });
};

exports.findById = (collection, id, queryParams) => {
    return new Promise((resolve,reject) => {
        db.get().collection(collection).findOne({ _id: ObjectID(id) , "Company._docId": queryParams.CompanyId }, (err, doc) => {
            // If need to expand
            if (queryParams.expand != null) {
                //  Forming minimal quantity of requests
                var promiseArr = [];
                var expandedItems = [];            
                queryParams.expand.split(',').forEach(fieldToExpand => {
                    if (doc[fieldToExpand] != null) {
                        var itemsToExpand = [];
                        //Check if it is Object (not Array)
                        if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Object]") {
                            itemsToExpand.push(doc[fieldToExpand]);
                        } else if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Array]") {
                            itemsToExpand = doc[fieldToExpand];
                        }
                        itemsToExpand.forEach(itemToExpand => {
                            var itemWasExpandedBefore = false;
                            expandedItems.forEach(expandedItem => {
                                if ((expandedItem.Col == itemToExpand['_col'])&&(expandedItem.DocId == itemToExpand['_docId'].toString())) {
                                    itemWasExpandedBefore = true;
                                    return false;
                                }
                            });
                            if (itemWasExpandedBefore == false) {
                                promiseArr.push(db.get().collection(itemToExpand['_col']).findOne({ _id: ObjectID(itemToExpand['_docId'])}));
                                expandedItems.push({ 'Col': itemToExpand['_col'], 'DocId': itemToExpand['_docId'].toString() });
                            }
                        });
                    }
                });
                // Saving results of expanding requests
                Promise.all(promiseArr).then(response => {
                    queryParams.expand.split(',').forEach((fieldToExpand) => {
                        var itemsToExpand = [];
                        if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Object]") {
                            itemsToExpand.push(doc[fieldToExpand]);
                        } else if (Object.prototype.toString.call(doc[fieldToExpand]) == "[object Array]") {
                            itemsToExpand = doc[fieldToExpand];
                        }

                        itemsToExpand.forEach(itemToExpand => {
                            expandedItems.forEach((expandedItem, i) => {
                                if ((expandedItem.Col == itemToExpand['_col'])&&(expandedItem.DocId == itemToExpand['_docId'].toString())) {
                                    itemToExpand['props'] = response[i];
                                    return false;
                                }
                            });
                        });
                    });
                    if (err)
                        return reject(err);
                    resolve(doc);
                });
            } else {
                if (err)
                    return reject(err);
                resolve(doc);
            }
        });
    });
};

exports.create = (collection, doc, authorId, CompanyId) => {
    doc.Created = (new Date()).toISOString();
    doc.Modified = doc.Created;
    doc.Company = { "_col": 'Companies', "_docId": CompanyId ? CompanyId : doc.Company._docId };
    doc.Author = { "_col": doc.Company._docId + "Users", "_docId": authorId };
    doc.Editor = { "_col": doc.Company._docId + "Users", "_docId": authorId };
    return new Promise((resolve, reject) => {
        db.get().collection(collection).insert(doc, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
    });
};

exports.update = (collection, id, newData, user) => {
    newData.Modified = (new Date()).toISOString();
    newData.Editor = { "_col": user.company._docId + "Users", "_docId": user.userId };
    return new Promise( (resolve,reject) =>{
        db.get().collection(collection).updateOne(
            { _id: ObjectID(id) , "Company._docId" : user.company._docId },
            { $set: newData },
            (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            }
        );
    });
};

exports.delete = (collection, id, CompanyId) => {
    return new Promise((resolve,reject) => {
        db.get().collection(collection).deleteOne(
            { _id: ObjectID(id), "Company._docId" : CompanyId },
            (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            }
        );
    });
};