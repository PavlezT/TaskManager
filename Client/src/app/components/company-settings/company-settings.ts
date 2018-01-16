import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../shared/general.service';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'company-settings',
    styleUrls: ['./company-settings.css'],
    templateUrl: './company-settings.html'
  })
  export class CompanySettings implements OnInit{

    user: any;

    usersValid: FormControl;
    allUsers: Array<any>;
    selectedUser: { Admin: boolean, _id: string, Name: string, Email: string };

    docsValid: FormControl;
    lsDocsSubscription: any;
    availableSites: any;

    dynamics365Subscription: any;
    
    constructor (
        private generalService: GeneralService,
        private translate: TranslateService
    ) {
        this.user = null;

        this.docsValid = new FormControl('valid', [
            Validators.required,
            Validators.pattern(/https:\/\//)
          ]);
        this.lsDocsSubscription = { siteUrl: null };
        this.availableSites;

        this.usersValid = new FormControl('valid', [
            Validators.required
        ])
        this.allUsers = null;
        this.selectedUser = null;

        this.dynamics365Subscription = { _id: null, DynamicsInstanceUrl: null, DynamicsOrgName: null };
    }
    
    ngOnInit () {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
        }).then(() => {
            this.getDynamics365Subscription();
        });
        this.loadLSDocsSubscriptions();
        this.getAllUsers();
        if (window.location.href.indexOf('syncDynamicsUsers=true') != -1) {
            this.syncDynamics365Users();
        }
    }

    public loadLSDocsSubscriptions() : Promise<any> {
        return Promise.all([
            this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Subscriptions?filter={"Source" : "lsdocs"}`),
            this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/lsdocs/webUrl`)
        ])
        .then( ([response,sites]) => {
            response[0] && (this.lsDocsSubscription = response[0]) ;
            this.availableSites = sites;
        })
        .catch(error=>{ console.log('<Load Subscriptions error:',error) })
    }

    public getAllUsers() : Promise<any> {
        return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=_id,Name,Admin,Email`)
            .then( res =>{
                if ( res.ok == false )
                    return this.allUsers = [];
                this.allUsers = res;
            })
            .catch(error=>{
                console.log('<Get All Users> error:',error);
            })
    }

    public deleteAdminUser(event,user) : Promise<any> {
        if(user["_id"] == this.user["_id"])
            return Promise.resolve();

        user.deleting = true;
        return this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Users/${user["_id"]}`,{Admin : false})
        //this.generalService.httpDelete(`${this.generalService.serverAPIUrl}/_api/admins/${user["_id"]}`)
            .then( res =>{
                if (res.ok == false) 
                    return Promise.reject(res.json() || 'Error in subscribe');
                user.Admin = false;
                user.deleting = false;
            })
            .catch(error=>{
                console.log('<DeleteUserAsAdmin> error:',error);
                user.deleting = false;
            })
    }

    public addCompanyAdmin(event) : Promise<any> {
        event.srcElement["0"].disabled = true;
        return (this.usersValid.valid ? 
            //this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/admins/${this.selectedUser["_id"]}`,{})
            this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Users/${this.selectedUser["_id"]}`,{Admin : true})
                 : Promise.reject('Form invalid'))
            .then( (res : any) =>{
                if (res.ok == false) 
                    return Promise.reject(res.json() || 'Error in subscribe');
                event.srcElement["0"].disabled = false;
                this.selectedUser.Admin = true;
            })
            .catch(error =>{
                event.srcElement["0"].disabled = false;
                this.usersValid.setErrors(new Validators());
                console.log('<Add Company Admin> error:',error);
            })
    }

    public subscribeLSDocs(event) : Promise<any> {
        event.srcElement["0"].disabled = true;
        return (this.docsValid.valid ? this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/lsdocs/subscribe`, {siteUrl: this.lsDocsSubscription.siteUrl})
                 : Promise.reject('Form invalid'))
            .then( (res : any) =>{
                if (res.ok == false) 
                    return Promise.reject(res.json() || 'Error in subscribe');
                this.lsDocsSubscription = res;
                event.srcElement["0"].disabled = false;
            })
            .catch(error =>{
                event.srcElement["0"].disabled = false;
                this.docsValid.setErrors(new Validators());
                console.log('<LSDocsConnect> resp for LSDocs:',error);
            })
    }

    public getDynamics365Subscription () {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Subscriptions?filter={"Company._docId": "${this.user.Company._docId}", "Source": "dynamics365"}`).then(dynamics365Subscriptions => {
            let subscription = dynamics365Subscriptions[0];
            if (dynamics365Subscriptions.length > 0) {
                this.dynamics365Subscription = { _id: subscription._id, DynamicsInstanceUrl: subscription.DynamicsInstanceUrl, DynamicsOrgName: subscription.DynamicsOrgName };
            }
        });
    }

    public onDynamics365ConnectionFormSubmit (event, dynamics365ConnectionForm) {
        event.preventDefault();
        let promise: Promise<any>;
        if (this.dynamics365Subscription._id == null) {
            promise = this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/Subscriptions`, {
                "Source": "dynamics365",
                "DynamicsInstanceUrl": this.dynamics365Subscription.DynamicsInstanceUrl,
                "DynamicsOrgName": this.dynamics365Subscription.DynamicsOrgName,
                "Company": {
                    "_col": "Companies",
                    "_docId": this.user.Company._docId
                }
            });
        } else {
            promise = this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Subscriptions/${this.dynamics365Subscription._id}`, {
                "DynamicsInstanceUrl": this.dynamics365Subscription.DynamicsInstanceUrl,
                "DynamicsOrgName": this.dynamics365Subscription.DynamicsOrgName
            });
        }

        promise.then(response => {
            window.location.href = "/relogin?returnUrl=/#/company-settings?syncDynamicsUsers=true";
        });
    }

    public syncDynamics365Users() {
        this.generalService.preloaderStart();
        //TaskManager and Dynamics 365 users synchronization
        let getPromiseArr = [];
        getPromiseArr.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/dynamics365/users`));
        getPromiseArr.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users`));
        Promise.all(getPromiseArr).then(response => {
            let dynamics365Users: Array<any> = response[0].value;
            let users: Array<any> = response[1];
            let postPromiseArr = [];
            dynamics365Users.forEach(dynamics365User => {
                let userFound: boolean = false;
                users.forEach(user => {
                    if (dynamics365User.internalemailaddress == user.Email) {
                        userFound = true;
                        postPromiseArr.push(this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Users/${user._id}`, {
                            "Dynamics365Id": dynamics365User.systemuserid
                        }));
                    }
                });
                if (userFound == false) {
                    postPromiseArr.push(this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/Users`, {
                        "Email": dynamics365User.internalemailaddress,
                        "Name": dynamics365User.fullname,
                        "Department": null,
                        "JobTitle": null,
                        "Phone": dynamics365User.mobilephone,
                        "Company": {
                            "_col": "Companies",
                            "_docId": this.user.Company._id
                        },
                        "Dynamics365Id": dynamics365User.systemuserid
                    }));
                }
            });
            Promise.all(postPromiseArr).then(response => {
                this.generalService.preloaderStop();
                this.translate.getTranslation(this.translate.currentLang).toPromise().then(loc => {
                    this.generalService.showNotification(`<p>${loc.Company.Settings.Dynamics365ConnectionSuccess}</p>`);
                });
            });
        });
    }
}