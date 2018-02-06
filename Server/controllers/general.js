const generalModel = require('../models/general');
const loggerHelper = require('../helpers/logger.js');

function checkColName(companyId, collection) {
    switch (collection) {
        case "Companies":
            break;
        case "Subscriptions":
            break;
        default:
            collection = companyId + collection;
    }
    return collection;
}

exports.collections = (req, res) => {
    var companyId = req.session.user.company._docId;
    generalModel.collections(companyId)
        .then(collections => {
            collections = collections.map(col=>{
                return {
                    name: col.name.includes(companyId) ? col.name.replace(companyId,"") : col.name
                }
            });
            res.send(collections);
        })
        .catch(err =>{
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        });
};

exports.all = (req, res) => {
    let queryParams = {
        select: (req.query.select != null) ? req.query.select.split(',') : [],
        orderby: (req.query.orderby != null) ? req.query.orderby.split(',') : [],
        top: req.query.top,
        skip: req.query.skip,
        filter: req.query.filter,
        expand: req.query.expand,
        CompanyId: req.session.user.company._docId
    };
    generalModel.all(checkColName(queryParams.CompanyId,req.params.collection), queryParams)
        .then(docs => {
            res.send(docs);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        });
};

exports.allKeys = (req, res) => {
    generalModel.allKeys(checkColName(req.session.user.company._docId,req.params.collection))
        .then(keys => {
            res.send(keys);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        })
};

exports.findById = (req, res) => {
    let queryParams = {
        expand: req.query.expand,
        CompanyId: req.session.user.company._docId
    };
    
    generalModel.findById(checkColName(queryParams.CompanyId,req.params.collection), req.params.id, queryParams)
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        })
};

exports.create = (req, res) => {
    generalModel.create(checkColName(req.session.user.company._docId, req.params.collection), req.body, req.session.user.userId, req.session.user.company._docId)
        .then(result => {
            loggerHelper.logger.log('verbose', 'Element %s from col %s was created by user %s', result.ops[0]._id, req.params.collection, req.session.user.userId);
            res.send(req.body);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        })
};

exports.update = (req, res) => {
    var body = req.body;

    if(req.params.collection.includes("Users") &&  req.params.id != req.session.user.userId && !req.session.user.admin ){
        return res.status(401).json({error: 'You do not have permission!'});
    }

    generalModel.update(checkColName(req.session.user.company._docId,req.params.collection), req.params.id, body, req.session.user)
        .then(result => {
            loggerHelper.logger.log('verbose', 'Element %s from col %s was modified by user %s', req.params.id, req.params.collection, req.session.user.userId);
            res.sendStatus(200);
        })
        .catch(err =>{
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        })
};

exports.delete = (req, res) => {

    if (req.params.collection.includes("Users") && !req.session.user.Admin) {
        return res.status(401).json({error: 'You do not have permission!'});
    }

    generalModel.delete(checkColName(req.session.user.company._docId,req.params.collection), req.params.id, req.session.user.company._docId)
        .then(result => {
            loggerHelper.logger.log('verbose', 'Element %s from col %s was deleted by user %s', req.params.id, req.params.collection, req.session.user.userId);
            res.sendStatus(200);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            return res.sendStatus(500);
        });
}