const request = require('superagent');

function getCurrentUserData(accessToken) {
	return request
	  .get('https://graph.microsoft.com/beta/me')
	  .set('Authorization', 'Bearer ' + accessToken)
	  .then((res,err) =>{
		  if (err)
			  throw err;
		  return res;
	  });
}

function getCurrentUserCompany(accessToken) {
  return request
	  .get('https://graph.microsoft.com/beta/organization?$select=id,displayName,country,city,postalCode')
	  .set('Authorization', 'Bearer ' + accessToken)
	  .then((res,err)=>{
		  if (err)
			  throw err;
		  return res.body;
	  })
}

function getCurrentUserAvatar(accessToken) {
  return request
	  .get('https://graph.microsoft.com/beta/me/photo/$value')
	  .set('Authorization', 'Bearer ' + accessToken)
	  .set('Content-Type', 'image/jpg')
	  .then((res,err) => {
		  if (err)
			  throw err;
		  return res.body;
	  })
}

exports.getCurrentUserData = getCurrentUserData;
exports.getCurrentUserCompany = getCurrentUserCompany;
exports.getCurrentUserAvatar = getCurrentUserAvatar;