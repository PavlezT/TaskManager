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
        this.getUsers().then(users => {
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

    private getAvatar(email : string, dest_img : any, key : string ) : Promise<any> {
        dest_img[key] = "/src/img/logo.png";
        return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=Email,_id,Company&filter={"Email" :"${email}"}`)
            .then((res) => {
                res[0] && res[0]._id && ( dest_img[key] = `/src/img/avatars/${ res[0].Company._docId }/${ res[0]._id }.jpeg` );
            })
    }

    private getUsers() : Promise<any> {
        return this.generalService.httpGet(`${this.config.serverAPIUrl}/_api/lsdocs/users`)
            .then(items => {
                return items;
            })
            .catch(error => {
                console.error('<Get Users> error:',error);
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
                    this.getAvatar(item.AssignedTo.EMail,item,'assignedToAvatarUrl');
                    this.getAvatar(item.TaskAuthore.EMail,item,'authorAvatarUrl');
                    return item;
                });
            })
            .catch(error => {
                console.error('<Get Subtasks> error:',error);
            })
    }

    public addNewSubTask($event) : any {
        let user;
        if( !(this.newTaskAssignedTo && this.newTaskAssignedTo.trim().length > 0 ) )
            return false;
        if( !(this.newTaskTitle && this.newTaskTitle.trim().length > 0) )
            return false;
        if( !(this.newTaskDueDate && this.newTaskDueDate >= this.minDate ) )
            return false;

        this.users.map(item=>{
            if(item.User1.Title == this.newTaskAssignedTo)
                user = item;
        })

        if( !user )
            return false;

        user.assignTo = {
            Title : user.User1.Title,
            EMail : user.User1.EMail,
            Id : user.User1.Id
        }

        if ((user.AbsenceStart) || (user.AbsenceEnd)){
            var isDeputyUse = ( ( (new Date(Date.now())) >= (new Date(user.AbsenceStart.split('.').reverse().join('.'))) ) && ( (new Date(Date.now())) <= (new Date(user.AbsenceEnd.split('.').reverse().join('.'))) ) ) ? true : false; 
            if(isDeputyUse && user.Deputy && user.Deputy.EMail) {
                user.assignTo.Title = user.Deputy.Title;
                user.assignTo.EMail = user.Deputy.EMail;
                user.assignTo.Id = user.Deputy.Id;
            }
        }

        let TaskData = {
            task : {
              '__metadata':{
                type : "SP.Data.LSTasksListItem"
              },
              sysIDItem: this.task.sysIDItem,
              sysIDList: this.task.sysIDList,
              sysIDMainTask : (this.contentType == 'LSTaskResolution' ? 0 : (this.task.sysIDMainTask == 0 ? this.task.Id : this.task.sysIDMainTask)).toString(),
              sysIDParentMainTask: (this.contentType == 'LSTaskResolution' ? '0' : (this.task.Id).toString() ),
              Title: this.newTaskTitle.trim().replace(':', ' '),      
              StateID: this.task.StateID,
              sysTaskLevel: (parseInt(this.task.sysTaskLevel || '0') +1 ).toString(),
              TaskDescription: null,
              TaskDueDate: this.datePipe.transform(this.newTaskDueDate,'yyyy-MM-ddTHH:mm:ss').toString() +'Z',
              EstimatePlan: null,
              TaskAuthoreId: this.task.AssignedToId,
              TaskAuthorEmail: this.user.Email,
              AssignetToTitle: user.assignTo.Title,
              AssignetToEmail: user.assignTo.EMail,
              AssignedToId : user.assignTo.Id,
              AssignedManagerId : user.UserManager.Id,
              DepartmentOfUser : user.ol_Department,
              OData__Status : 'Not Started',
            },
            
            itemData : {
              ItemId: this.task.sysIDItem,
              ListID: this.task.sysIDList,
              ItemTitle: "-", 
              ListTitle: "-", 
              EventType: 'Task'
            },
            
            HistoryArray : [{
              EventType :  (this.contentType != 'LSTaskResolution' ? 'EventCreateTask EventAddTask' : 'EventCreateTask'),
              Event: this.loc.LSDocs.Alert68,
              NameExecutor : user.assignTo.Title,
              NameAuthore : this.task.AssignedTo.Title,
              TaskTitle : this.newTaskTitle.trim(),
              StartDate :  this.datePipe.transform(Date.now(),'dd.MM.yyyy HH:mm:ss'),
              DueDate: this.newTaskDueDate.toLocaleDateString(),
              EvanteDate: this.datePipe.transform(Date.now(),'yyyy-MM-dd HH:mm:ss'),
              Comments: '',
              ExecutorEmail: user.assignTo.EMail,
              AthoreEmail: this.user.Email,
              ItemId: this.task.sysIDItem,
              ListID: this.task.sysIDList
            }]
        }
        $event.target.parentNode.disabled = true;
        this.createSubTask(TaskData)
            .then(()=>{
                this.revealedForm = false;
                let newTask = {
                    Title : this.newTaskTitle,
                    AssignedTo :  {
                        EMail : user.assignTo.EMail,
                        Title : user.assignTo.Title
                    },
                    TaskAuthore : {
                        EMail : this.user.Email,
                        Title : this.user.Name
                    },
                    assignedToAvatarUrl : '',
                    authorAvatarUrl : '',
                    DueDate_view : this.datePipe.transform(this.newTaskDueDate,"EE, dd MMMM")
                }

                this.getAvatar(newTask.AssignedTo.EMail,newTask,'assignedToAvatarUrl');
                this.getAvatar(newTask.TaskAuthore.EMail,newTask,'authorAvatarUrl');
                
                this.SubTasks.push(newTask);

                this.newTaskTitle = '';
                this.newTaskDueDate = null;
                this.newTaskAssignedTo = '';
                $event.target.parentNode.disabled = false;
                this.generalService.showNotification(`<p>${this.loc.Tasks[this.contentType == "LSTaskResolution" ? 'NewResolution' : 'NewTask']} ${this.loc.Tasks.successAdded}</p>`, 3000);
            })
            .catch(error => {
                console.error('<Set Subtasks> error:',error);
                $event.target.parentNode.disabled = false;
                this.generalService.showNotification(`<p>${this.loc.Error} => "${this.loc.Tasks[this.contentType == "LSTaskResolution" ? 'NewResolution' : 'NewTask']}"</p>`, 6000);
            })
    }

    private createSubTask( newTask : any ) : Promise<any> {
        return this.generalService.httpUpdate(`${this.config.serverAPIUrl}/_api/lsdocs/subtasks/${this.contentType}`,newTask)
            .then(items => {
                console.log('resp:',items);
                if(items && items.hasOwnProperty('ok') && items.ok == false)
                    throw new Error('Subtask not added')
            })
    }
    
    onPeoplepickerValueChange() {
        if ((this.newTaskAssignedTo != null)&&(this.newTaskAssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(user => user.User1.Title.toLowerCase().indexOf(this.newTaskAssignedTo.toLowerCase()) === 0);
        } else {
            this.filteredUsers = [];
        }
    }

    validatePeoplepicker (event, editTaskForm) {
        if ((this.newTaskAssignedTo != null)&&(this.newTaskAssignedTo.length > 0)) {
            if (this.users.filter(user => user.User1.Title == this.newTaskAssignedTo).length != 1) {
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