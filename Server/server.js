'use strict';
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const generalController = require('./controllers/general');
const lsdocsTasks = require('./controllers/lsdocstasks');
const userController = require('./controllers/user');
const configHelper = require('./helpers/config.js');
const loggerHelper = require('./helpers/logger.js');
const authHelper = require('./helpers/auth.js');
const authLSDocs = require('./helpers/auth_lsdocs.js');
const spHandler = require('./handlers/SpWebhookHandler.js');
const dynamics365Handler = require('./handlers/dynamics365.js');
const dynamics365Helper = require('./helpers/dynamics365.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/src', express.static(__dirname + '/src/'));
app.use(session({
    secret: 'taskmanager-s3cr3t',
    name: 'taskmanagerCookie',
    resave: false,
    saveUninitialized: false
}));

// Add headers for dev 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    req.session.cookie.maxAge = 1000*60*60*24*14; //milliseconds*seconds*minutes*hours*days
    req.session.authInfo = req.session.authInfo || {};
    if (req.session.authInfo['https://graph.microsoft.com/'] != null) {
        dynamics365Helper.getResource(req.session.user.company["_docId"]).then(subscription => {
            if ((subscription == null)||(req.session.authInfo[subscription.DynamicsInstanceUrl] != null)) {
                res.sendFile(__dirname + '/src/index.html');
            } else {
                res.redirect(authHelper.getAuthUrl(subscription.DynamicsInstanceUrl));
            }
        });
    } else {
        res.redirect(authHelper.getAuthUrl('https://graph.microsoft.com/'));
    }
});

//auth endpoints
app.get('/token', [authHelper.processToken]);
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('https://login.microsoftonline.com/common/oauth2/logout');
});
app.get('/relogin', function (req, res) {
    req.session.destroy();
    if (req.params.returnUrl)
        res.redirect(returnUrl);
    else 
        res.redirect('/');
});
// end auth endpoints

//transfered to another Node
app.post('/_api/sharepoint/webhook',[spHandler.post]);
// app.get('/_api/lsdocs', [authLSDocs.checkAuth, lsdocsTasks.all]);// disabled view in Angular Project with request on this endpoint
// end of transfered to another Node

//Dynamics365 integration endpoints
app.get(`/_api/dynamics365/subscriptions`, [dynamics365Handler.getSubscriptionsList]);
app.post(`/_api/dynamics365/tasks/oncreate`, [dynamics365Handler.taskOnCreate]);
app.post(`/_api/dynamics365/tasks/onupdate`, [dynamics365Handler.taskOnUpdate]);
app.post(`/_api/dynamics365/tasks/:id/update`, [authHelper.checkAuth, dynamics365Handler.taskUpdate]);
app.get(`/_api/dynamics365/users`, [authHelper.checkAuth, dynamics365Handler.getUsers]);
// end Dynamics365 integration endpoints

app.get('/_api/lsdocs/webUrl',[authHelper.checkAuth,lsdocsTasks.getWebUrl]); //get sitecollections for subscribing on LSDocs
app.get('/_api/lsdocs/users',[authLSDocs.checkAuth,lsdocsTasks.getUsers]); //get all LSDocs users
app.get('/_api/lsdocs/doc/props', [authLSDocs.checkAuth, lsdocsTasks.docProps]); // connected document properties
app.get('/_api/lsdocs/doc/fields', [authLSDocs.checkAuth, lsdocsTasks.docFields]); // connected document contentType fields
app.post('/_api/lsdocs/checkResolution',[authLSDocs.checkAuth, lsdocsTasks.checkResolution]);// check reassignmen Resolutions for this document
app.post('/_api/lsdocs/subtasks/:contentType',[authLSDocs.checkAuth, lsdocsTasks.getSubTasks]);// get all subtasks for this Task
app.put('/_api/lsdocs/subtasks/:contentType',[authLSDocs.checkAuth, lsdocsTasks.setSubTasks]);// add new subtask to Main task
app.post('/_api/lsdocs/subscribe',[authLSDocs.checkAuth,lsdocsTasks.subscription]);// set subscription on LSTasks list for WebHooks
app.post('/_api/lsdocs/:id', [authLSDocs.checkAuth, lsdocsTasks.update]);//endpoint for New -> InProgress
app.post('/_api/lsdocs/:id/:status', [authLSDocs.checkAuth, lsdocsTasks.update]); // endpoint for New/InProgress -> Done

app.get('/_api/currentUser', [authHelper.checkAuth, userController.current]);
app.get('/_api/collections', [authHelper.checkAuth, generalController.collections]);
app.get('/_api/:collection', [authHelper.checkAuth, generalController.all]);
app.get('/_api/:collection/keys', [authHelper.checkAuth, generalController.allKeys]);
app.get('/_api/:collection/:id', [authHelper.checkAuth, generalController.findById]);
app.post('/_api/:collection', [authHelper.checkAuth, generalController.create]);
app.put('/_api/:collection/:id', [authHelper.checkAuth, generalController.update]);
app.delete('/_api/:collection/:id', [authHelper.checkAuth, generalController.delete]);

app.set('port', process.env.PORT || 3000);

// mongodb://dbUser:qwer1234@ds145379.mlab.com:45379/tasksdb - dev  
// mongodb://dbuser:Ljrevtyn0@ds046037.mlab.com:46037/taskmanagertest - test
// mongodb://dbuser:Ljrevtyn0@ds046067.mlab.com:46067/taskmanager - prod
db.connect(configHelper.config.dbConnectionString).then(() => {
    app.listen(app.get('port'), () => {
        loggerHelper.logger.log('info', 'Application start');
    });
}).catch(err => {
    loggerHelper.logger.log('error', 'Application start error: %s', err);
});