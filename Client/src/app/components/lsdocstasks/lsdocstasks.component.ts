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
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

@Component ({
    selector: 'lsdocstasks',
    templateUrl: "lsdocstasks.component.html",
    styleUrls: ["lsdocstasks.component.css"],
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
          transition('* => *', animate('500ms ease-out')),
        ])
      ]
}) 

export class LSDocsTasksComponent implements OnInit, OnDestroy {

    items: Array<{
        Title : string,
        TaskDescription : string,
        StartDate : string,
        TaskDueDate : string,
        ContentType : {
            Name : string,  // LSTaskAppruve
            Id : {
                StringValue : string
             }
        } 
        sysIDList : any,
        sysIDItem : any,
        sysIDMainTask : any,
        sysIDParentMainTask : any,
        sysTaskLevel : any,
        Created : string,
        AssignedToId : any,
        AssignetTo : {
            EMail : string,
            Title : string
        },
        TaskAuthoreId : string,
        TaskAuthore : {
            Title : string,
            EMail : string
        },
        ID : any,
        StateID : any,
        TaskResults : string, //null for all tasks, except 'Done'
        OData__Status : string,
        OData__Comments : string
    }>;
    user: any;
    tasksSidebarOpened: boolean;
    tasksSidebarType: string;
    Title: string;
    eventEmitter: any;
    taskInfoViewed: any;
    subscriptions: Array<Subscription>;
    preloaderVisible : string;

    constructor (
        public generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(APP_CONFIG) public config: IAppConfig,
        private translate: TranslateService
    ) {
        this.items = new Array<any>();
        this.user = null;
        this.tasksSidebarOpened = false;
        this.tasksSidebarType = null;
        this.eventEmitter = this._eventEmitter;
        this.taskInfoViewed = null;
        this.subscriptions = [];
        this.preloaderVisible = "active";
    }

    ngOnInit () {
        this.subscriptions.push(this.route.params.subscribe((params) => {
            this.generalService.getCurrentUser().then((user) => {
                this.user = user;
                this.updateView();
            });
        }));
        this.subscriptions.push(this.eventEmitter.updateTasks.subscribe(() => {
            this.updateView();
            this.tasksSidebarOpened = false;
        }));
    }

    updateView (status? : string) {
        this.items = [];
        this.preloaderVisible = 'active';
        // return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/lsdocs?status=${status?status : this.config.lsdocsStatuses.new}`).then(data=>{
        return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/LSDocsTasksTest?filter={"AssignetToEmail":"${this.user.Email}","OData__Status":{"$eq":"${status?status : this.config.lsdocsStatuses.new}"}}&orderby=Created desc`).then(data=>{
            this.preloaderVisible = 'inactive';
            if (data.ok == false) 
                console.log('getLSDocsTasks error:',data.json());
            else {
                this.items = data.map(task=>{
                    task.AssignedTo = {
                        Title : task.AssignetToTitle,
                        EMail : task.AssignetToEmail
                    }
                    return task;
                })
            }
        })
    }

    public ProgressTask(task : any)  {
        return this.toDoneTask(task,'Done','').then(()=>{
            this.eventEmitter.updateTasks.emit();
        })
    }
    
    //#region toDoneTask
    public toDoneTask(
        task : { 
            Title : string,
            StartDate : string,
            TaskDueDate : string,
            ContentType : {
                Name : string,  // LSTaskAppruve
                Id : {
                    StringValue : string
                 }
            },
            sysIDList : any,
            sysIDItem : any,
            TaskAuthore : {
                Title : string,
                EMail : string
            },
            ID : any,
            StateID : any
        }, 
        taskResult : string,
        comment : string
    ) : Promise<any> {
        let datePipe = new DatePipe('ru');
        taskResult = taskResult || 'Done';

        let EvanteDate = datePipe.transform(Date.now(),"y-MM-dd HH:mm:ss");// moment.utc().format("YYYY-MM-DD HH:mm:ss");
        let StartDate = datePipe.transform(task.StartDate,'dd.MM.y HH:mm:ss');//moment.utc(task.startDate).format("DD.MM.YYYY HH:mm:ss");
        let DueDate =  datePipe.transform(task.TaskDueDate,'dd.MM.y');//moment.utc(task.TaskDueDate).format("DD.MM.YYYY");

        return ( task.ContentType.Name == 'LSTaskResolution' ? 
            this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/lsdocs/checkResolution`,{
                sysIDItem : task.sysIDItem,
                sysIDList : task.sysIDList,
                ContentType : 'LSResolutionTaskToDo',
                CurentUserEmail : this.user.Email
            })
            .then(response => {
                if (response.ok == false) 
                    return Promise.reject('get Resolution error');
                if(response.length == 0){
                    alert('You have not done any reassignmen!');
                    return Promise.reject('there is no one resolution')
                }
            })
            : Promise.resolve()
        )
        .then((response)=>{
            return this.translate.getTranslation(this.translate.currentLang).toPromise();
        })
        .then((loc: { LSDocs : any }) => { 
            let taskEvent = loc.LSDocs.Alert60;
            let EventType = 'EventDoneTask';

            if (task.ContentType.Name == 'LSTaskAppruve') {
                if (taskResult == 'Back') {
                    taskEvent = loc.LSDocs.Alert66;
                    EventType = 'EventBackTask';
                } else {
                    taskEvent = loc.LSDocs.Alert62;
                }
            }
            if (task.ContentType.Name == 'LSSTaskAdd') {
                EventType = 'EventDoneTask EventAddTask';
            }
            if (taskResult == 'Delegate') {
                taskEvent = this.user.Name+" "+loc.LSDocs.Alert67;
                EventType = 'EventDelegateTask';
            }

            let toHistory = {
                sysIDList : task.sysIDList,
                sysIDItem : task.sysIDItem,
                EventTypeUser : EventType,
                itemData : {
                    ItemId: task.sysIDItem,
                    ListID: task.sysIDList,
                    ItemTitle: "-",
                    ListTitle: "-",
                    EventType: 'Task'
                },
                HistoryArray : [{
                    EventType: EventType,
                    Event: taskEvent,
                    NameExecutor: this.user.Name,
                    NameAuthore: task.TaskAuthore.Title,
                    TaskTitle: task.Title,
                    StartDate: StartDate,
                    DueDate: DueDate,
                    StartDateSort: datePipe.transform(task.StartDate,'yMMdd'),//moment.utc(task.StartDate).format("YYYYMMDD"),
                    DueDateSort: datePipe.transform(task.TaskDueDate,'yMMdd'),//moment.utc(task.TaskDueDate).format("YYYYMMDD"),
                    EvanteDate: EvanteDate,
                    Comments: comment || '',
                    TaskType: task.ContentType.Name,
                    TaskResult: taskResult,
                    EndTask: '',
                    ExecutorEmail: this.user.Email,
                    AthoreEmail: task.TaskAuthore.EMail,
                    ItemId: task.sysIDItem,
                    ListID: task.sysIDList,
                    TaskID: task.ID
                }],
                HistoryType : 'HistoryDataForUser'
            }

            let transitTaskData = {
                Action: 'TaskDone',
                ListID: task.sysIDList,
                ItemID: task.sysIDItem,
                Type: 'Task',
                DataSource: {
                    TaskResults: taskResult,
                    CurentTaskID: task.ID,
                    RelateListId: task.sysIDList,
                    RelateItem: task.sysIDItem,
                    StateID: task.StateID,
                    UserLang : 'LS'+ (this.translate.currentLang == "en" ? "us" : this.translate.currentLang).toUpperCase(),
                    Alert57 : loc.LSDocs.Alert57,
                    Alert58 : loc.LSDocs.Alert58,
                    Alert60 : loc.LSDocs.Alert60,
                    Alert62 : loc.LSDocs.Alert62,
                    Alert66 : loc.LSDocs.Alert66
                }
            }

            let updateTaskData = {
                "__metadata": {
                    "type": "SP.Data.LSTasksListItem"
                },
                OData__Status : 'Done',
                OData__Comments : comment || '',
                TaskResults : taskResult // 'RefuseTask' || 'Done'
            }

            let data = {
                updateTaskData : updateTaskData,
                toHistory : toHistory,
                transitTaskData : transitTaskData
            }

            return this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/lsdocs/${task.ID}/done`, data).then((response) => {
                if (response.ok == false) 
                    throw response.json();
                return true;
            });
        })
        .catch(error=>{
            console.log('<toDoneLSDocsTasks> error:',error);
            return false;
        })
    }
    //#endregion

    openSideBar(task,sideBarType) : void {
        this.tasksSidebarType = sideBarType;
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