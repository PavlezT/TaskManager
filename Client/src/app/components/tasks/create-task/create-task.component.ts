import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { Subscription } from 'rxjs/Subscription';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';

@Component ({
    selector: 'create-task',
    templateUrl: 'create-task.component.html',
    styleUrls: ['create-task.component.css']
}) 

export class CreateTaskComponent implements OnInit, OnDestroy {

    user: any;
    users: Array<any>;
    filteredUsers: Array<any>;
    model: any;
    eventEmitter: any;
    subscriptions: Array<Subscription>;

    constructor (
        private generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {
        this.user = null;
        this.users = new Array<any>();
        this.model = {};
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
    }

    ngOnInit () {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=_id,Name`).then(users => {
            this.users = users;
        });
        this.generalService.getCurrentUser().then(user => {
            this.user = user;
            this.model.AssignedTo = this.user["Name"];
        });
        this.subscriptions.push(this.eventEmitter.onNewTaskBtnClicked.subscribe(() => {
            this.model.AssignedTo = this.user["Name"];
        }));
    }

    onNewTaskFormSubmit (event, newTaskForm) {
        event.preventDefault();
        if(!(this.model["Title"] && this.model["Title"].length > 0) )
            return;
        let tempCreatableItem = {};
        Object.keys(this.model).forEach((objKey) => tempCreatableItem[objKey] = this.model[objKey]);
        tempCreatableItem["AssignedTo"] = {"_col": this.user.Company._docId+"Users", "_docId": this.users.find(user => user.Name == this.model["AssignedTo"])["_id"]};
        tempCreatableItem["Status"] = this.config.tasksStatuses.new;
        tempCreatableItem["IsImportant"] = (this.model["IsImportant"] == "true");
        if (this.model["DueDate"] != null) {
            this.model["DueDate"].setTime(this.model["DueDate"].getTime() + (12*60*60*1000))
            tempCreatableItem["DueDate"] = this.model["DueDate"].toISOString();
        }
        this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/Tasks`, tempCreatableItem).then(response => {
            this.eventEmitter.updateTasks.emit();
        });
        newTaskForm.resetForm();
    }

    onPeoplepickerValueChange(event) {
        if ((this.model.AssignedTo != null)&&(this.model.AssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(user => user.Name.toLowerCase().indexOf(this.model.AssignedTo.toLowerCase()) === 0);
        } else {
            this.filteredUsers = [];
        }
    }

    validatePeoplepicker (event, newTaskForm) {
        if ((this.model.AssignedTo != null)&&(this.model.AssignedTo.length > 0)) {
            if (this.users.filter(user => user.Name == this.model.AssignedTo).length != 1) {
                newTaskForm.form.controls.AssignedTo.setErrors({'incorrect': true});
            }
        } else {
            newTaskForm.form.controls.AssignedTo.setErrors({'incorrect': true});
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}