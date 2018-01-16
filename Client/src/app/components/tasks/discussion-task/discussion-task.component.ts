import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GeneralService } from '../../../shared/general.service';

@Component ({
    selector: 'discussion-task',
    templateUrl: 'discussion-task.component.html',
    styleUrls: ['discussion-task.component.css']
})

export class DiscussionTaskComponent implements OnInit { 
    @Input() taskId: string;
    
    user: any;
    task: any;
    model: any;
    messages: Array<any>;

    constructor(public generalService: GeneralService) {
        this.user = {};
        this.task = {};
        this.model = {};
        this.messages = [];
    }

    ngOnInit() {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
        });
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks/${this.taskId}`).then(task => {
            this.task = task;
        });
        this.getMessages();
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/TaskDiscussions?filter={"Task._docId":"${this.taskId}"}&expand=Author&orderby=Created asc`).then(messages => {
            this.messages = messages;
        });
    }

    getMessages () {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/TaskDiscussions?filter={"Task._docId":"${this.taskId}"}&expand=Author&orderby=Created asc`).then(messages => {
            this.messages = messages;
        });
    }

    onNewTaskMessageFormSubmit(event, newTaskMessageForm) {
        if ((this.model["Body"] != null)&&(this.model["Body"].trim().length > 0)) {
            this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/TaskDiscussions`, {'Body': this.model["Body"], 'Task': {'_docId':this.taskId, '_col': this.user.Company._docId+'Tasks'}}).then(response => {
                this.getMessages();
            });
        }
        newTaskMessageForm.resetForm();
    }
}