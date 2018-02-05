const request = require('superagent');
const fs = require('fs');
const configHelper = require('../helpers/config.js');
const userController = require('../controllers/user');

const authConfig = {
	redirectURI: configHelper.config.origin + '/token',
	responseType: 'code',
	responseMode: 'query',
	clientId: configHelper.config.authClientId,
		//'8c1d5379-eef4-40c4-9cfa-2dc18f809a16' - prod
		//'1f96ada1-a967-4717-a7b7-da10f6a0d9c4' - test
	clientSecret: configHelper.config.authClientSecret,
		//'Ut07VG/v128P5K2hX75dalo3b4+YaLtOWVbSPNe7los=' - prod
		//'jyoPLXhuK/U+I6VTtGo6dn7OVmNcAaHQdgAjMVtLT4M=' - test
}

function getAuthUrl(resource) {
	return `https://login.microsoftonline.com/common/oauth2/authorize?redirect_uri=${encodeURIComponent(authConfig.redirectURI)}&response_type=${encodeURIComponent(authConfig.responseType)}&responseMode=${encodeURIComponent(authConfig.responseMode)}&client_id=${encodeURIComponent(authConfig.clientId)}&resource=${encodeURIComponent(resource)}`;
}

function processToken(req, res) {
    if (req.query.code) {
        getAccessToken(req.query.code).then((accessTokenInfo) => {
			req.session.authInfo[accessTokenInfo.resource] = accessTokenInfo;
			req.session.authInfo[accessTokenInfo.resource].created = new Date(Date.now());
			if (accessTokenInfo.resource == 'https://graph.microsoft.com/') {
				checkUser(req, res);
			} else {
				res.redirect('/');	
			}
		});
    } else {
        res.redirect('/');
    }
}

function getAccessToken(authCode) {
	return request
		.post('https://login.microsoftonline.com/common/oauth2/token')
		.send({
			'grant_type': 'authorization_code',
			'client_id': authConfig.clientId,
			'code': authCode,
			'redirect_uri' : authConfig.redirectURI,
			'client_secret': authConfig.clientSecret
		})
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.then((res,err) => {
			if(err)
				throw err;
			return res.body;
		});
}

function checkUser(req, res) {
	Promise.all([ 
		getUserData(req.session.authInfo['https://graph.microsoft.com/'].access_token),
		getUserCompany(req.session.authInfo['https://graph.microsoft.com/'].access_token)
	]).then(([user,company]) => {
		req.session.user = {};//userId : string, company : { _col : string, _docId : string }, admin : boolean
		req.session.user.displayName = user.body.displayName;
		req.session.user.email = user.body.userPrincipalName || user.body.mail;
		return userController.ensureCompany(req,company.value[0],user.body);
	}).then(transitData => {
		return (transitData.created ? userController.createCompanyCollections(transitData) : Promise.resolve(transitData));
	}).then(({userInfo,created}) => {
		return userController.ensureUser(req, created, userInfo);             
	}).then(({ensuredUser, wasCreated}) => {
		return (wasCreated == true ?
			getProfilePhoto(req.session.authInfo['https://graph.microsoft.com/'].access_token)
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

function checkAuth(req, res, next) {
	var resource = null;
	if (req.path.indexOf('/_api/dynamics365/') != -1) {
		var resource;
		Object.keys(req.session.authInfo).forEach(authResource => {
			if (authResource.indexOf('crm') != -1) resource = authResource;
		});
	} else if (req.path.indexOf('/_api/') != -1) {
		resource = 'https://graph.microsoft.com/';
	}
	if ((req.session.authInfo && req.session.authInfo[resource] != null) && (req.session.user != null)) {
		var expirationTime = new Date(req.session.authInfo[resource].created);
		expirationTime.setSeconds(expirationTime.getSeconds() + parseInt(req.session.authInfo[resource].expires_in));
		if (new Date(Date.now()) > expirationTime) {
			request
				.post('https://login.microsoftonline.com/common/oauth2/token')
				.send({
					'grant_type': 'refresh_token',
					'client_id': authConfig.clientId,
					'refresh_token': req.session.authInfo[resource].refresh_token,
					'client_secret': authConfig.clientSecret
				})
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.end((err, res) => {
					req.session.authInfo[resource] = res.body;
					req.session.authInfo[resource].created = new Date(Date.now());
					next();
				});
		} else {
			next();
		}
	} else {
		return res.sendStatus(403);
	}
}

function getUserData(accessToken) {
	return request
	  .get('https://graph.microsoft.com/beta/me')
	  .set('Authorization', 'Bearer ' + accessToken)
	  .then((res,err) =>{
		  if(err)
			  throw err;
		  return res;
	  });
}

function getUserCompany(accessToken) {
  return request
	  .get('https://graph.microsoft.com/beta/organization?$select=id,displayName,country,city,postalCode')
	  .set('Authorization', 'Bearer ' + accessToken)
	  .then( (res,err)=>{
		  if(err)
			  throw err;
		  return res.body;
	  })
}

function getProfilePhoto(accessToken) {
  return request
	  .get('https://graph.microsoft.com/beta/me/photo/$value')
	  .set('Authorization', 'Bearer ' + accessToken)
	  .set('Content-Type', 'image/jpg')
	  .then( (res,err) => {
		  if(err)
			  throw err;
		  return res.body;
	  })
}

exports.getUserData = getUserData;
exports.getProfilePhoto = getProfilePhoto;
exports.getAuthUrl = getAuthUrl;
exports.getAccessToken = getAccessToken;
exports.getUserCompany = getUserCompany;
exports.checkAuth = checkAuth;
exports.processToken = processToken;
