To start app on https://localhost:3000:

`node Server/app` or `nodemon Server/app.js`

then
`cd Client` and `ng build --watch`

then
`gulp watch`

##User photos
* Load user photo every time he logins. It will help to save actual avatar.

## Hooks
* user **default** localization gets from browser `navigator.localization`  
user **custom** language gets from `window.localStorage.getItem('userCustomLanguage')`