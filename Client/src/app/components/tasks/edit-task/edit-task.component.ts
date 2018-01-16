import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';

@Component ({
    selector: 'edit-task',
    templateUrl: 'edit-task.component.html',
    styleUrls: ['edit-task.component.css']
}) 

export class EditTaskComponent implements OnInit {

    @Input() taskId: string;

    taskBeforeEdit: any;
    user: any;
    users: Array<any>;
    filteredUsers: Array<any>;
    model: any;
    eventEmitter: any;
    userRole: string;

    constructor (
        private generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {
        this.taskBeforeEdit = null;
        this.user = null;
        this.users = new Array<any>();
        this.model = {};
        this.eventEmitter = this._eventEmitter;
        this.userRole = null;
    }

    ngOnInit () {
        let promiseArr = [];
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=_id,Name`).then(users => {
            this.users = users;
        });
        promiseArr.push(this.generalService.getCurrentUser().then(user => {
            this.user = user;
        }));
        promiseArr.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks/${this.taskId}?expand=AssignedTo`).then(task => {//,UserCategories
            this.model = task;
            this.taskBeforeEdit = {};
            Object.keys(this.model).forEach((objKey) => this.taskBeforeEdit[objKey] = this.model[objKey]);

            if (task.AssignedTo != null) this.model.AssignedTo = task.AssignedTo.props.Name;
            else this.model.AssignedTo = null;

            if (task.DueDate != null) this.model.DueDate = new Date(task.DueDate);
            else this.model.DueDate = null;

            if (task.IsImportant != null) this.model.IsImportant = task.IsImportant.toString();
            else this.model.IsImportant = null;
        }));
        Promise.all(promiseArr).then(result => {
            if (this.user["_id"] == this.taskBeforeEdit.Author['_docId']) {
                this.userRole = 'author';
            } else if (this.user["_id"] == this.taskBeforeEdit.AssignedTo['_docId']) {
                this.userRole = 'assignedTo';
            }
        });
    }

    onEditTaskFormSubmit (event, editTaskForm) {
        event.preventDefault();
        if(!(this.model["Title"] && this.model["Title"].length > 0) )
            return;
        let tempEditableItem = {};
        Object.keys(this.model).forEach((objKey) => tempEditableItem[objKey] = this.model[objKey]);
        tempEditableItem["AssignedTo"] = {"_col": this.user.Company._docId+"Users", "_docId": this.users.find(user => user.Name == this.model["AssignedTo"])["_id"]};
        tempEditableItem["IsImportant"] = (this.model["IsImportant"] == "true");
        if (this.model["DueDate"] != null) {
            this.model["DueDate"].setTime(this.model["DueDate"].getTime() + (12*60*60*1000))
            tempEditableItem["DueDate"] = this.model["DueDate"].toISOString();
        }
        // Not sure if will be needed
        if (this.taskBeforeEdit['Title'] != tempEditableItem['Title']) {
            tempEditableItem['Status'] = this.config.tasksStatuses.new; 
        } else if (this.taskBeforeEdit['Description'] != tempEditableItem['Description']) {
            tempEditableItem['Status'] = this.config.tasksStatuses.new; 
        } else if (this.taskBeforeEdit['AssignedTo']['_docId'] != tempEditableItem['AssignedTo']['_docId']) {
            tempEditableItem['Status'] = this.config.tasksStatuses.new; 
        } 
        delete tempEditableItem["_id"];
        delete tempEditableItem["Company"];
        delete tempEditableItem["ExternalDoc"];
        switch (tempEditableItem["Source"]) {
            case this.config.sources.dynamics365 :
                this.updateDynamics365Task(tempEditableItem);
                break;
            default :
                break;
        }
        this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Tasks/${this.taskId}`, tempEditableItem).then(response => {
            this.eventEmitter.updateTasks.emit();
        });
        editTaskForm.resetForm();
    }

    onPeoplepickerValueChange() {
        if ((this.model.AssignedTo != null)&&(this.model.AssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(user => user.Name.toLowerCase().indexOf(this.model.AssignedTo.toLowerCase()) === 0);
        } else {
            this.filteredUsers = [];
        }
    }

    validatePeoplepicker (event, editTaskForm) {
        if ((this.model.AssignedTo != null)&&(this.model.AssignedTo.length > 0)) {
            if (this.users.filter(user => user.Name == this.model.AssignedTo).length != 1) {
                editTaskForm.form.controls.AssignedTo.setErrors({'incorrect': true});
            }
        } else {
            editTaskForm.form.controls.AssignedTo.setErrors({'incorrect': true});
        }
    }

    updateDynamics365Task(task) {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users/${task.AssignedTo["_docId"]}`).then(user => {
            this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/dynamics365/users`).then(response => {
                var userExternalId;
                response.value.forEach(dynamics365User => {
                    if ((dynamics365User["internalemailaddress"] != null)&&(dynamics365User["internalemailaddress"].toLowerCase() == user.Email.toLowerCase())) {
                        userExternalId = dynamics365User["systemuserid"];
                        return false;
                    }    
                });
                if (userExternalId) {
                    let dynamics365TaskProps = {};
                    dynamics365TaskProps["subject"] = task.Title
                    dynamics365TaskProps["description"] = task.Description;
                    dynamics365TaskProps["scheduledstart"] = task.DueDate;
                    dynamics365TaskProps["prioritycode"] = (task.IsImportant == true) ? "2" : "1";
                    dynamics365TaskProps["statecode"] = (task.Status == "Done") ? "1" : "0";
                    dynamics365TaskProps["ownerid@odata.bind"] = `/systemusers(${userExternalId.toUpperCase()})`;
                    this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/dynamics365/tasks/${task.ExternalId}/update`, dynamics365TaskProps);
                }
            });
        });
    }
}