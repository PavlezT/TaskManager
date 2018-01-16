import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { Subscription } from 'rxjs/Subscription';

@Component ({
    selector: 'info-task',
    templateUrl: 'info-task.component.html',
    styleUrls: ['info-task.component.css']
})

export class InfoTaskComponent implements OnInit, OnDestroy { 
    
    @Input() taskId: string;

    user: any;
    task: any;
    eventEmitter: any;
    authorId: string;
    authorAvatarUrl: string;
    assignedToAvatarUrl: string;
    userRole: string;
    subscriptions: Array<Subscription>;

    constructor(public generalService: GeneralService, public _eventEmitter: EventEmitterService) {
        this.taskId = null;
        this.user = null;
        this.task = null;
        this.authorAvatarUrl = null;
        this.authorId = '';
        this.assignedToAvatarUrl = null;
        this.userRole = null;
        this.eventEmitter = _eventEmitter;
        this.subscriptions = [];
    }
    
    ngOnInit() {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
        });
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe((task) => {
            this.taskId = task._id;
            this.getTask(this.taskId);
        }));
        this.getTask(this.taskId);
    }

    getTask(taskId: string) {
        this.task = null;
        return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks/${this.taskId}?expand=Author,Editor,AssignedTo`).then((task) => {
            this.task = task;
            this.authorAvatarUrl = `/src/img/avatars/${task["Author"].props["Company"]["_docId"]}/${task["Author"].props["_id"]}.jpeg`;
            this.authorId = task["Author"].props["_id"];
            this.assignedToAvatarUrl = `/src/img/avatars/${task["AssignedTo"].props["Company"]["_docId"]}/${task["AssignedTo"].props["_id"]}.jpeg`;
                       
            if (this.user["_id"] == this.task.Author['_docId']) {
                this.userRole = 'author';
            } else if (this.user["_id"] == this.task.AssignedTo['_docId']) {
                this.userRole = 'assignedTo';
            }
        });
    }

    ngOnDestroy () {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}