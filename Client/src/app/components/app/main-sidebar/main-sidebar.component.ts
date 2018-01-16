import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { Subscription } from 'rxjs/Subscription';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';

@Component ({
    selector: 'main-sidebar',
    templateUrl: 'main-sidebar.component.html',
    styleUrls: ['main-sidebar.component.css']
}) 

export class MainSidebarComponent implements OnInit, OnDestroy {

    importantTasksCount: number;
    newTasksCount: number;
    todayTasksCount: number;
    myTasksCount: number;
    outgoingTasksCount: number;
    user: any;
    userTaskCategories: any;
    userId: string;
    avatarUrl: string;
    eventEmitter: any;
    subscriptions: Array<Subscription>;

    constructor (
        public generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        private router: Router,
        private dragulaService: DragulaService,
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {
        this.importantTasksCount = null;
        this.newTasksCount = null;
        this.todayTasksCount = null;
        this.myTasksCount = null;
        this.outgoingTasksCount = null;
        this.user = null;
        this.userTaskCategories = null;
        this.userId = '';
        this.avatarUrl = '#';
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
        dragulaService.setOptions('categories-bag', {
            moves: function (el, container, handle) { 
                return container.className.indexOf("mat-toolbar-row") == -1 && window.outerWidth > 768
            },
            accepts: function (el, target, source, sibling) {
                return target.className != "tasks-list-wrapper";
            },
        });
        this.subscriptions.push(dragulaService.drop.subscribe(value => {
            let taskId: string = value[1].getAttribute('data-id');
            let categoryId: string = value[2].getAttribute('data-id');
            this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks/${taskId}`).then(task => {
                let categoryIsAlreadyAdded = false;
                if (task.UserCategories != null) {
                    task.UserCategories.forEach(userCategory => {
                        if (userCategory["_id"] == categoryId) {
                            categoryIsAlreadyAdded = true;
                        }
                    });
                } else {
                    task.UserCategories = [];
                }
                if (!categoryIsAlreadyAdded) {
                    task.UserCategories.push({'_col': task.Company._docId+'UserTaskCategories', '_docId': categoryId});
                }
                delete task["_id"];
                delete task["Company"];
                delete task["ExternalDoc"];
                this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Tasks/${taskId}`, task).then(response => {
                    this.eventEmitter.updateTasks.emit();
                });
            });
        }));
    }

    ngOnInit () {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
            this.userId = user["_id"];
            this.avatarUrl = `/src/img/avatars/${user["Company"]["_docId"]}/${user["_id"]}.jpeg`;
            this.updateView();
        });
        this.subscriptions.push(this.eventEmitter.updateTasks.subscribe(() => {
            this.updateView();
        }));
    }

    updateView () {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"IsImportant":true}`).then(docs => {
            this.importantTasksCount = docs.length;
        });
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"}}`).then(docs => {
            this.myTasksCount = docs.length;
        });
        // this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"DueDate":{"$regex":"${(new Date()).toISOString().split('T')[0]}"}}`).then(docs => {
        //     this.todayTasksCount = docs.length;
        // });
        // this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"Created":{"$regex":"${(new Date()).toISOString().split('T')[0]}"}}`).then(docs => {
        //     this.newTasksCount = docs.length;
        // });
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"Author._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"}}`).then(docs => {
            this.outgoingTasksCount = docs.length;
        });
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/UserTaskCategories?filter={"Author._docId":"${this.user["_id"]}"}&orderby=Created asc`).then((userTaskCategories) => {
            this.userTaskCategories = userTaskCategories;
            let promiseArr = [];
            this.userTaskCategories.forEach(userTaskCatergory => {
                promiseArr.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"UserCategories":{"$elemMatch":{"_docId":"${userTaskCatergory["_id"]}"}},"Status":{"$ne":"${this.config.tasksStatuses.done}"}}`));
            });
            Promise.all(promiseArr).then(response => {
                response.forEach((responsePart, i) => {
                    this.userTaskCategories[i]["Count"] = responsePart.length;
                });
            });
        });
    }

    createTaskClick() {
        if (this.router.url.indexOf('/tasks/') != -1) {
            this.eventEmitter.onNewTaskBtnClicked.emit();
        } else {
            this.router.navigate(['/tasks/create']);
        }
        this.hideMainSidebar();
    }

    hideMainSidebar() {
        this.eventEmitter.onMainSidebarToggle.emit(false);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}