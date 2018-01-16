import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';

@Component ({
    selector: 'quick-create-task',
    templateUrl: 'quick-create-task.component.html',
    styleUrls: ['quick-create-task.component.css']
}) 

export class QuickCreateTaskComponent implements OnInit {

    model: any;
    user: any;
    eventEmitter: any;

    constructor (
        private generalService: GeneralService,
        private _eventEmitter: EventEmitterService,
        private router: Router,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {
        this.model = {};
        this.eventEmitter = this._eventEmitter;
    }

    ngOnInit () {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
        });
    }

    toggleTaskImportance (event) {
        if (this.model["IsImportant"] == null)
            this.model["IsImportant"] = true;
        else 
            this.model["IsImportant"] = !this.model["IsImportant"]; 
    }

    onNewTaskFormSubmit (event, newTaskForm) {
        event.preventDefault();
        if(!(this.model["Title"] && this.model["Title"].length > 0) )
            return;
        let tempCreatableItem = {};
        Object.keys(this.model).forEach((objKey) => tempCreatableItem[objKey] = this.model[objKey]);
        tempCreatableItem["AssignedTo"] = {"_col": this.user.Company._docId+"Users", "_docId": this.user["_id"]};
        tempCreatableItem["Status"] = this.config.tasksStatuses.new;
        tempCreatableItem["IsImportant"] = this.model["IsImportant"];
        if (this.model["DueDate"] != null) {
            this.model["DueDate"].setTime(this.model["DueDate"].getTime() + (12*60*60*1000))
            tempCreatableItem["DueDate"] = this.model["DueDate"].toISOString();
        }
        newTaskForm.resetForm();
        this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/Tasks`, tempCreatableItem).then(response => {
            this.eventEmitter.updateTasks.emit();
            this.model["IsImportant"] = null;
        });
    }
}