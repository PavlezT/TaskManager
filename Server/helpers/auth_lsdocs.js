const request = require('superagent');
const generalModel = require('../models/general');
const configHelper = require('../helpers/config.js');

const config = {
    redirectURI: 'https://lsdocs.azurewebsites.net',
    // clientId: '042a3cb4-c140-4455-ab2f-e46f149311dc',  // old LSDocs 
	// clientSecret: 'uHR0hglMdSGYWhkr1UlykNf0BOzmHIeGa6+7vIrlPTI=', 
	clientId: configHelper.config.auth_LSDocs_ClientID,//  new LSDocs 
	clientSecret: configHelper.config.auth_LSDocs_ClientSecret,
    resource: '00000003-0000-0ff1-ce00-000000000000'  
}

function init(site){
    return getSiteRealm(site)
        .then((site_realm)=>{
            return getAccessToken(site,site_realm)
        })
        .then((data)=>{
            return getDigest(site,data);
        })
        .catch((err)=>{
            // console.error('<Auth_LSDocs>',err);
            return {err : err};
        })
}

function getAccessToken(site,site_realm) {
	return request
		.post(`https://accounts.accesscontrol.windows.net/${site_realm}/tokens/OAuth/2`)
		.send({
			'grant_type': 'client_credentials',
			'client_id': config.clientId + '@' + site_realm,
            'resource' : config.resource + '/' + site.substring('https://'.length, site.indexOf('/sites')) +'@' + site_realm,
			'client_secret': config.clientSecret//encodeURIComponent(
		})
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.then((res, err) => {
            if(err)
                throw err;

            return {
                site_realm : site_realm,
                access_token : res.body.access_token,
                access_expiry : (new Date(Date.now() + res.body.expires_in*1000)).toJSON()
            }
		});
}

function getDigest(site,access){
    return request
        .post(`${site}/_api/contextinfo`)
        .send({})
        .set({
            'Accept': 'application/json; odata=verbose',
            'Authorization': `Bearer ${access.access_token}`
        })
        .then((res, err) => {
            let digest_res = {};
            if(res && res.body && !err){
                try {
                    digest_res = res.body.d.GetContextWebInformation;//(JSON.parse(res.body))
                }
                catch(e) {
                    console.error('<Auth>getDigest error in site:'+site,e);
                    digest_res = {};
                    err = e;
                }
            }
            if(err)
                throw err;

            return {
                site_realm : access.site_realm,
                access_token : access.access_token,
                access_expiry : access.access_expiry,
                digest : digest_res.FormDigestValue,
                digest_expiry : (new Date(Date.now() + digest_res.FormDigestTimeoutSeconds)).toJSON()
            }
        });
}

function getSiteRealm(site) {
    let domen = site.substring('https://'.length,site.indexOf('.sharepoint.'));
    let urlAuth = `https://login.microsoftonline.com/${domen}.onmicrosoft.com/.well-known/openid-configuration`;
    
    return request
        .get(urlAuth)
        .set('Accept', 'application/json;odata=verbose')
        .then((res,err) => {
            let site_realm = "";
            if(res && res.body && !err){
                let text = "";
                try{
                    text = res.body.issuer;
                    site_realm = text.substring("https://sts.windows.net/".length,text.length-1);
                }
                catch(e){
                    err = "Incorrect site_realm parse";
                }
            } 
            if(err)
                throw err;

            return site_realm;
        });
}

function getSiteUrl(user){
    if(user){
        return generalModel.all(`Subscriptions`,{filter : {
            "Company._docId" : user.company._docId,
            "Source" : 'lsdocs'
        }})
        .then(subscription =>{
            return (subscription[0] ? subscription[0].siteUrl : null);
        })
        .catch(error => { 
            console.error('<Auth_LSDocs> get Subscritpion error:',error) 
        });
    } else {
        return Promise.resolve();
    }
}

function checkAuth(req, res, next) {        
    (req.body.siteUrl? Promise.resolve(req.body.siteUrl) : getSiteUrl(req.session.user)).then(site=>{

        if(!site || !(site.length > 1))
            return res.status(500).json({error:'There is no siteUrl'});

        if(req.session.authLSDocs){
            ((new Date(Date.now()) > (new Date(req.session.authLSDocs.access_expiry))) ?
                getAccessToken(site,req.session.authLSDocs.site_realm) : Promise.resolve(req.session.authLSDocs))            
            .then( (access) => {
                return ((new Date(Date.now()) > (new Date(access.digest_expiry))) ? 
                    getDigest(site,access) : Promise.resolve(access) );
            })
            .then( (access) => {
                access.siteUrl = site;
                req.session.authLSDocs = access;
                next();
            })
            .catch( err =>{
                return res.status(500).json({error:'getDigest or getAccess in authLSDocs error', message : err });
            })
        } else {
            init(site).then((authLSDocs)=>{
                if(authLSDocs.err)
                    return res.status(500).json({error:"Error while authorization"});
                authLSDocs.siteUrl = site;
                req.session.authLSDocs = authLSDocs;
                next();
            })
        }
    })
}

exports.getAccessToken = getAccessToken;
exports.getDigest = getDigest;
exports.checkAuth = checkAuth;