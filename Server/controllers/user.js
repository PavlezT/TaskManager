const userModel = require('../models/user');

exports.current = (req, res) => {
    userModel.current(req.session.user)
        .then(user=>{//([company,user]
            res.send(user);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            res.sendStatus(500);
        })
};

exports.userCompany = (req,res) => {
     userModel.getCompanyById(req.session.user.company)
        .then( company => {
            res.send(company);
        })
        .catch( error => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            res.sendStatus(500);
        })
}

exports.ensureCompany = (req,companyInfo,userInfo) =>{
    return userModel.getCompany(companyInfo)
        .then(({company,created}) => {
            userInfo.company = { "_col": "Companies", "_docId": company["_id"].toString() };
            return {userInfo : userInfo, created : created};
        })
}

exports.ensureUser = (req, companyCreated, userInfo) => {
    return userModel.ensureUser(userInfo,companyCreated)
        .then(({user, created}) => {
            req.session.user.company = userInfo.company;
            req.session.user.userId = user["_id"];
            req.session.user.admin = user.Admin;
            return {ensuredUser : user, wasCreated : created};
        });
}

exports.createCompanyCollections = (data) => {
    let companyId = data.userInfo.company._docId
    let promiseArr = [];

    promiseArr.push(userModel.createCollection(companyId+"Tasks"));
    promiseArr.push(userModel.createCollection(companyId+"Users"));
    promiseArr.push(userModel.createCollection(companyId+"UserTaskCategories"));
    promiseArr.push(userModel.createCollection(companyId+"TaskDiscussions"));  

    return Promise.all(promiseArr).then(() => { return data;})
}