import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { Subscription } from 'rxjs/Subscription';

@Component ({
    selector: 'profile-info',
    templateUrl: 'profile-info.component.html',
    styleUrls: ['profile-info.component.css']
}) 

export class ProfileAppInfoComponent implements OnInit {

    avatarUrl: string;
    eventEmitter: any;
    profileId: string;
    subscriptions: Array<Subscription>;
    user: any;
    currentUser: any;
    isCurrentUserProfile: boolean;

    constructor (
        private generalService: GeneralService,
        private _eventEmitter: EventEmitterService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.avatarUrl = '#';
        this.eventEmitter = this._eventEmitter;
        this.profileId = null;
        this.user = null;
        this.currentUser = null;
        this.subscriptions = [];
        this.isCurrentUserProfile = null;
    }

    ngOnInit () {
        this.subscriptions.push(this.route.params.subscribe((params) => {
            //Mode is for parametr in url (my, today, new, create)
            this.profileId = params["id"];
            let promiseArr = [];
            promiseArr.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users/${this.profileId}`).then((user) => {
                this.user = user;
                this.avatarUrl = `/src/img/avatars/${this.user["Company"]["_docId"]}/${this.user["_id"]}.jpeg`;
            }));
            promiseArr.push(this.generalService.getCurrentUser().then((user) => {
                this.currentUser = user;
            }));
            Promise.all(promiseArr).then(() => {
                this.isCurrentUserProfile = this.user["_id"] == this.currentUser["_id"];
            });
        }));   
    }
}