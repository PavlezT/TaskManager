import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../shared/general.service';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../shared/event-emitter.service';
import { Subscription } from 'rxjs/Subscription';
import { APP_CONFIG } from '../../app.config';
import { IAppConfig } from '../../iapp.config.interface';
import { TranslateService } from 'ng2-translate';
import 'rxjs/add/operator/toPromise';

import { LSDocsTasksComponent } from '../lsdocstasks/lsdocstasks.component';

@Component ({
    selector: 'tasks',
    templateUrl: "tasks.component.html",
    styleUrls: ["tasks.component.css"]
}) 

export class TasksComponent implements OnInit, OnDestroy {

    mode: string;
    userTaskCategoryId: string;
    items: Array<any>;
    user: any;
    tasksSidebarOpened: boolean;
    tasksSidebarType: string;
    Title: string;
    eventEmitter: any;
    taskInfoViewed: any;
    subscriptions: Array<Subscription>;

    doneLSDocsTask : Function;

    constructor (
        private generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(APP_CONFIG) public config: IAppConfig,
        private translate: TranslateService
    ) {
        this.mode = null;
        this.userTaskCategoryId = null;
        this.items = new Array<any>();
        this.user = null;
        this.tasksSidebarOpened = false;
        this.tasksSidebarType = null;
        this.eventEmitter = this._eventEmitter;
        this.taskInfoViewed = null;
        this.subscriptions = [];

        this.doneLSDocsTask = LSDocsTasksComponent.prototype.toDoneTask;
    }

    ngOnInit () {
        this.subscriptions.push(this.route.params.subscribe((params) => {
            //Mode is for parametr in url (my, today, new, create)
            this.mode = params["mode"];
            this.userTaskCategoryId = params["id"];
            this.generalService.getCurrentUser().then((user) => {
                this.user = user;
                this.updateView();
            });
        }));
        this.subscriptions.push(this.eventEmitter.updateTasks.subscribe(() => {
            this.updateView();
            this.tasksSidebarOpened = false;
        }));
        this.subscriptions.push(this.eventEmitter.onNewTaskBtnClicked.subscribe(() => {
            this.tasksSidebarOpened = true;
            this.tasksSidebarType = null;
            setTimeout(() => { this.tasksSidebarType = "create"}, 300);
        }));
    }

    updateView () {
        this.items = [];
        let requestUrl: string;
        if (this.mode != null) {
            if (this.mode == 'my') { 
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"}}&top=1000&orderby=Created desc`;//&expand=ExternalDoc
                this.tasksSidebarOpened = false;
            } else if (this.mode == 'important') {
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"IsImportant":true}&top=1000&orderby=Created desc`;
                this.tasksSidebarOpened = false;
            } else if (this.mode == 'today') {
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"DueDate":{"$regex":"${(new Date()).toISOString().split('T')[0]}"}}&orderby=Created desc`;
                this.tasksSidebarOpened = false;
            } else if (this.mode == 'new') {
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"Created":{"$regex":"${(new Date()).toISOString().split('T')[0]}"}}&orderby=Created desc`;
                this.tasksSidebarOpened = false;
            } else if (this.mode == 'outgoing') {
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"Author._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"}}&top=1000&orderby=Created desc`;
                this.tasksSidebarOpened = false;
            } else if (this.mode == 'create') {
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"}}&orderby=Created desc`;
                this.tasksSidebarOpened = true;
                this.tasksSidebarType = 'create';
            } else {
                requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"Author._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"Category": "${this.mode}"}&orderby=Created desc`;
                this.tasksSidebarOpened = false;
            }
        } else if (this.userTaskCategoryId != null) {
            requestUrl = `${this.generalService.serverAPIUrl}/_api/Tasks?filter={"UserCategories":{"$elemMatch":{"_docId":"${this.userTaskCategoryId}"}},"Status":{"$ne":"${this.config.tasksStatuses.done}"}}&top=1000&orderby=Created desc`;
            this.tasksSidebarOpened = false;
        }
        if ((requestUrl != null)&&(requestUrl.length > 0)) {
            this.generalService.httpGet(requestUrl).then(docs => {
                this.items = docs;
            })
        }
    }

    public async completeTask(event, task) {
        let status = false;
        switch (task.Source) {
            case this.config.sources.lsdocs : 
                status = await this.doneLSDocsTask(task.ExternalDoc.props,'Done','');//return done status: 'true' or 'false'
                break;
            case this.config.sources.dynamics365 :
                status = await this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/dynamics365/tasks/${task.ExternalId}/update`, {"statecode": "1"});
                break;
            default :
                status = true;
                break;
        }
        
        let tempEditableItem = {};
        Object.keys(task).forEach((objKey) => tempEditableItem[objKey] = task[objKey]);
        tempEditableItem["Status"] = this.config.tasksStatuses.done;
        delete tempEditableItem["_id"];
        delete tempEditableItem["Company"];
        delete tempEditableItem["ExternalDoc"];
        status && this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Tasks/${task["_id"]}`, tempEditableItem).then((response) => {
            this.updateView();
            this.eventEmitter.updateTasks.emit();
        });
    }

    toggleTaskImportance(event, task) {
        switch (task.Source) {
            case this.config.sources.dynamics365 :
                this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/dynamics365/tasks/${task.ExternalId}/update`, {"prioritycode": ((task["IsImportant"] == true) ? "1" : "2")});
                break;
            default :
                break;
        }

        let tempEditableItem = {};
        Object.keys(task).forEach((objKey) => tempEditableItem[objKey] = task[objKey]);
        tempEditableItem["IsImportant"] = !task["IsImportant"];
        delete tempEditableItem["_id"];
        delete tempEditableItem["Company"];
        delete tempEditableItem["ExternalDoc"];
        this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Tasks/${task["_id"]}`, tempEditableItem).then((response) => {
            this.updateView();
            this.eventEmitter.updateTasks.emit();
        });
    }

    openTaskInfo(event, task, type ? : string) {
        this.tasksSidebarType = type ? type : 'info';
        this.tasksSidebarOpened = true;
        this.eventEmitter.onTaskInfoOpen.emit(task);
        this.taskInfoViewed = task;
    }

    onTaskSidenavClose () {
        this.tasksSidebarOpened = false;
        if (this.router.url.indexOf('/tasks/create') != -1) {
            this.router.navigate(['/tasks/my']);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}