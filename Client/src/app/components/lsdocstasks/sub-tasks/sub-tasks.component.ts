import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';
import { Subscription } from 'rxjs/Subscription';

import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

@Component({
    selector: 'lsdocs-subtasks',
    templateUrl: 'sub-tasks.component.html',
    styleUrls: ['sub-tasks.component.scss'],
    animations : [
        trigger('preloaderState', [
          state('inactive', style({
            opacity: '0',
            visibility: 'hidden'
          })),
          state('active',   style({
            opacity: '1',
            visibility: 'visible'
          })),
          transition('* => *', animate('0ms ease-out')),
        ])
      ]
})

export class LSDocsSubTasks implements OnInit {

    @Input() task: any;
    @Input() contentType: any;

    subscriptions: Array<Subscription>;
    eventEmitter: any;
    user: any;
    users: Array<any>;
    filteredUsers : Array<any>;
    userRole: string;
    datePipe : DatePipe;

    revealedForm : boolean;
    minDate : Date;

    loc : any;
    SubTasks : Array<any>;
    preloaderVisible : string;
    newTaskTitle : string;
    newTaskDueDate : Date;
    newTaskAssignedTo : string;
    
    constructor (
        public generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        @Inject(APP_CONFIG) public config: IAppConfig,
        private translate: TranslateService
    ) {
        this.subscriptions = [];
        this.eventEmitter = this._eventEmitter;
        this.user = null;        
        this.userRole = null; //assignedTo';
        this.revealedForm = false;
        this.minDate = new Date(Date.now());
        this.minDate.setHours(0);
        this.minDate.setMinutes(0);
        this.minDate.setSeconds(0);
        this.minDate.setMilliseconds(0);
        this.datePipe = new DatePipe(this.translate.currentLang);
    }

    ngOnInit () {
        this.generalService.getCurrentUser().then(user => {
            this.user = user;
        })
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=_id,Name`).then(users => {
            this.users = users;
        });
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe((task) => {
            if(task.Source != this.config.sources.lsdocs || !task.ExternalDoc.props){
              return this.ngOnDestroy();
            } 
            this.revealedForm = false;
            this.newTaskTitle = '';
            this.newTaskDueDate = null;
            this.newTaskAssignedTo = '';
            this.updateView();
        }));
        this.translate.getTranslation(this.translate.currentLang).toPromise().then(loc => this.loc = loc);
        this.updateView();  
    }

    public updateView() : Promise<any> { 
        this.preloaderVisible = 'active';
        
        return this.getSubTasks().then(() => { 
            this.preloaderVisible = 'inactive';
        })
    }

    private getAvatar(email : string, dest_img : string ) : Promise<any> {
        dest_img = "/src/img/logo.png";
        return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=Email,_id,Company&filter={"Email" :"${email}"}`)
            .then((res) => {
                res[0] && res[0]._id && ( dest_img = `/src/img/avatars/${ res[0].Company._docId }/${ res[0]._id }.jpeg` );
            })
    }

    public getSubTasks() : Promise<any> { 
        return this.generalService.httpPost(`${this.config.serverAPIUrl}/_api/lsdocs/subtasks/${this.contentType}`,this.task)
            .then(items => {
                this.SubTasks = items.filter(item => {
                    if(this.task.Id != item.sysIDParentMainTask && (this.contentType != "LSTaskResolution") )
                        return false;
                    
                    item.DueDate_view = this.datePipe.transform(item.TaskDueDate,"EE, dd MMMM");
                    item.assignedToAvatarUrl = '';
                    item.authorAvatarUrl = '';
                    this.getAvatar(item.AssignedTo.EMail,item.assignedToAvatarUrl)
                    this.getAvatar(item.TaskAuthore.EMail,item.authorAvatarUrl)
                    return item;
                });
            })
            .catch(error => {
                console.error('<Get Subtasks> error:',error);
            })
    }

    public addNewSubTask() : any {
        let user;
        if( !(this.newTaskAssignedTo && this.newTaskAssignedTo.trim().length > 0 ) )
            return false;
        if( !(this.newTaskTitle && this.newTaskTitle.trim().length > 0) )
            return false;
        if( !(this.newTaskDueDate && this.newTaskDueDate >= this.minDate ) )
            return false;

        this.users.map(item=>{
            if(item.Name == this.newTaskAssignedTo)
                user = item;
        })

        if( !user )
            return false;

        this.createSubTask()
            .then(()=>{
                this.revealedForm = false;
                this.SubTasks.push({
                    Title : this.newTaskTitle,
                    AssignedTo :  {
                        EMail : user.Name,
                        Title : user.Name
                    },
                    TaskAuthore : {
                        EMail : this.user.Email,
                        Title : this.user.Name
                    },
                    assignedToAvatarUrl : '/src/img/avatars/5a3bb56815434f13388f5f43/5a3bb5c015434f13388f5f55.jpeg',
                    authorAvatarUrl : '/src/img/avatars/5a3bb56815434f13388f5f43/5a3bb5c015434f13388f5f55.jpeg',
                    DueDate_view : this.datePipe.transform(this.newTaskDueDate,"EE, dd MMMM")
                });
                
                this.newTaskTitle = '';
                this.newTaskDueDate = null;
                this.newTaskAssignedTo = '';
                
                this.generalService.showNotification(`<p>${this.loc.Tasks[this.contentType == "LSTaskResolution" ? 'NewResolution' : 'NewTask']} ${this.loc.Tasks.successAdded}</p>`, 3000);
            })
    }

    private createSubTask() : Promise<any> {
        return Promise.resolve();
    }
    
    onPeoplepickerValueChange() {
        if ((this.newTaskAssignedTo != null)&&(this.newTaskAssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(user => user.Name.toLowerCase().indexOf(this.newTaskAssignedTo.toLowerCase()) === 0);
        } else {
            this.filteredUsers = [];
        }
    }

    validatePeoplepicker (event, editTaskForm) {
        if ((this.newTaskAssignedTo != null)&&(this.newTaskAssignedTo.length > 0)) {
            if (this.users.filter(user => user.Name == this.newTaskAssignedTo).length != 1) {
                editTaskForm.form.controls.AssignedTo.setErrors({'incorrect': true});
            }
        } else {
            editTaskForm.form.controls.AssignedTo.setErrors({'incorrect': true});
        }
    }

    ngOnDestroy () {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}