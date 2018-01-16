import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { APP_CONFIG } from '../app.config';
import { IAppConfig } from '../iapp.config.interface';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GeneralService {
    serverAPIUrl: string;
    user: {
        _id: Object,
        Email: string,
        Name: string,
        Department: string,
        JobTitle: string,
        Phone: string,
        Created: string,
        Modified: string,
        SiteBg: string,
        Admin: boolean,
        Company: Object
    };

    preloadersCount: number;
    notificationsArr: Array<string>;
    notificationIsShowing: boolean;
    
    constructor (private  http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
        this.serverAPIUrl = config.serverAPIUrl;
        this.user = null;
        this.preloadersCount = 0;
        this.notificationsArr = [];
        this.notificationIsShowing = false;
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            if ((this.user != null)&&(Object.keys(this.user).length > 0)) {
                resolve(this.user);
            } else {
                this.httpGet(`${this.serverAPIUrl}/_api/currentUser`).then((user) => {
                    this.user = user;
                    resolve(this.user);
                });
            }
        });
    }
    
    httpGet (queryUrl: string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        let options = new RequestOptions({headers: headers})
        return this.http.get(queryUrl, options)
            .toPromise()
            .then((response: Response) => { 
                return response.json();
            })
            .then((response: Object) => {
                return response;
            }).catch((response) => {
                if(response.status == '403')
                    window.location.reload(true);
                return response;
            });
    }

    httpPost (queryUrl: string, object?: Object) {
        let headers = new Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        let options = new RequestOptions({headers: headers});
        if (object == null) object = {};
        return this.http.post(queryUrl, JSON.stringify(object), options)
            .toPromise()
            .then((response: Response) => { 
                return response.json();
            })
            .then((response: Object) => {
                return response;
            }).catch((response) => {
                if(response.status == '403')
                    window.location.reload(true);
                return response;
            });
    }

    httpDelete (queryUrl: string) {
        let headers = new Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        let options = new RequestOptions({headers: headers})
        return this.http.delete(queryUrl, options)
            .toPromise()
            .then((response: Response) => { 
                return response;
            }).catch((response) => {
                if(response.status == '403')
                    window.location.reload(true);
                return response;
            });
    }

    httpUpdate (queryUrl: string, object: Object) {
        let headers = new Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        let options = new RequestOptions({headers: headers})
        return this.http.put(queryUrl, JSON.stringify(object), options)
            .toPromise()
            .then((response: Object) => {
                return response;
            }).catch((response) => {
                if(response.status == '403')
                    window.location.reload(true);
                return response;
            });
    }

    isLargeScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width > 768) {
            return true;
        } else {
            return false;
        }
    }

    preloaderStart() {
        ++this.preloadersCount;
		document.getElementById('preloader-bg').classList.remove('hidden');
  	}
	
	preloaderStop() {
        --this.preloadersCount;
        if (this.preloadersCount == 0) {
            document.getElementById('preloader-bg').classList.add('hidden');
        }
    }
    
    showNotification(message: string, ttl?: number) {
        if (!this.notificationIsShowing) {
            this.notificationIsShowing = true;
            let NotificationFx: any = window["NotificationFx"];
            new NotificationFx({
                message : message,
                layout : 'growl',
                effect : 'slide',
                ttl: (ttl != null) ? ttl : 5000,
                onClose : () => {
                    this.notificationIsShowing = false;
                    if (this.notificationsArr.length > 0) {
                        this.showNotification(this.notificationsArr[0]);
                        this.notificationsArr.splice(0, 1);
                    }
                    return false;
                }
            }).show();
        } else {
            this.notificationsArr.push(message);
        }
    }
}
