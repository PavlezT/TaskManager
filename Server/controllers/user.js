const fs = require('fs');
const userModel = require('../models/user');
const graphHelper = require('../helpers/graph.js');
const loggerHelper = require('../helpers/logger.js');

exports.checkUser = (req, res) => {
    Promise.all([ 
		graphHelper.getCurrentUserData(req.session.authInfo['https://graph.microsoft.com/'].access_token),
		graphHelper.getCurrentUserCompany(req.session.authInfo['https://graph.microsoft.com/'].access_token)
	]).then(([user,company]) => {
		req.session.user = {};//userId : string, company : { _col : string, _docId : string }, admin : boolean
		req.session.user.displayName = user.body.displayName;
		req.session.user.email = user.body.userPrincipalName || user.body.mail;
		return ensureCompany(req, company.value[0], user.body);
	}).then(transitData => {
		return (transitData.created ? createCompanyCollections(transitData) : Promise.resolve(transitData));
	}).then(({userInfo,created}) => {
		return ensureUser(req, created, userInfo);             
	}).then(({ensuredUser, wasCreated}) => {
		return (wasCreated == true ?
			graphHelper.getCurrentUserAvatar(req.session.authInfo['https://graph.microsoft.com/'].access_token)
				.then(photoRes => { 
					return new Promise((resolve,reject) => {
						fs.writeFile(__dirname + '/../src/img/avatars/' + ensuredUser.Company._docId + '/' + ensuredUser._id + '.jpeg', photoRes,  "binary", 
						(err) => {
							if (err) 
								return reject(err);
							resolve();
						});
					});
				})
				.catch(error =>{
					loggerHelper.logger.log('error', 'Auth error while gettings user photo: %s', err);
				})
			: Promise.resolve());
	}).then(() => {
		res.redirect('/');
	}).catch(err => {
		loggerHelper.logger.log('error', 'Auth error: %s', err);
		return res.sendStatus(500);
	});
}

function ensureCompany (req, companyInfo, userInfo) {
    return userModel.getCompany(companyInfo)
        .then(({company, created}) => {
            userInfo.company = {"_col": "Companies", "_docId": company["_id"].toString()};
            return {userInfo: userInfo, created: created};
        });
}

function createCompanyCollections(data) {
    let companyId = data.userInfo.company._docId
    let promiseArr = [];
    promiseArr.push(userModel.createCollection(companyId+"Tasks"));
    promiseArr.push(userModel.createCollection(companyId+"Users"));
    promiseArr.push(userModel.createCollection(companyId+"UserTaskCategories"));
    promiseArr.push(userModel.createCollection(companyId+"TaskDiscussions"));  
    return Promise.all(promiseArr).then(() => { return data; })
}

function ensureUser(req, companyCreated, userInfo) {
    return userModel.ensureUser(userInfo, companyCreated)
        .then(({user, created}) => {
            req.session.user.company = userInfo.company;
            req.session.user.userId = user["_id"];
            req.session.user.admin = user.Admin;
            return {ensuredUser: user, wasCreated: created};
        });
}

exports.current = (req, res) => {
    userModel.current(req.session.user)
        .then(user => {//([company,user]
            res.send(user);
        })
        .catch(err => {
            loggerHelper.logger.log('error', 'Query error: %s', err);
            res.sendStatus(500);
        });
};