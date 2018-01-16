import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'work-task',
    templateUrl: 'work-task.component.html',
    styleUrls: ['work-task.component.css']
})

export class WorkLSDocsComponent implements OnInit {

    @Input() task: any;
    @Input() toDoneTask : Function;

    authorAvatarUrl : string;
    assignedToAvatarUrl : string;
    subscriptions: Array<Subscription>;
    eventEmitter: any;
    user: any;
    userRole: string;
    comment : string;
    
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
        this.comment = "";
    }

    ngOnInit () {
        this.generalService.getCurrentUser().then(user => {
            this.user = user;
        })
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe((task) => {
            this.comment = '';
        
            if(task.Source != this.config.sources.lsdocs || !task.ExternalDoc.props){
              return this.ngOnDestroy();
            } 
            this.task = task.ExternalDoc.props;
            this.getAvatars(this.task.TaskAuthore.EMail,this.task.AssignedTo.EMail);
        }));
        this.getAvatars(this.task.TaskAuthore.EMail,this.task.AssignedTo.EMail);
    }

    private getAvatars(authoreEmail : string, assignedToEmail : string) : Promise<any> {
        this.authorAvatarUrl = "/src/img/logo.png";
        this.assignedToAvatarUrl = "/src/img/logo.png";
        return Promise.all([
                this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=Email,_id,Company&filter={"Email" :"${assignedToEmail}"}`),
                this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?select=Email,_id,Company&filter={"Email" : "${authoreEmail}"}`)
            ])
            .then((res) => {
                res[0][0] && res[0][0]._id && ( this.assignedToAvatarUrl = `/src/img/avatars/${ res[0][0].Company._docId }/${ res[0][0]._id }.jpeg` );
                res[1][0] && res[1][0]._id && ( this.authorAvatarUrl = `/src/img/avatars/${ res[1][0].Company._docId }/${ res[1][0]._id }.jpeg` );
            })
    }

    public DoneTask(task,taskResult) : void {
        let comment = this.comment || '';
        this.toDoneTask(task,taskResult,comment).then(()=>{
            this.eventEmitter.updateTasks.emit();
        })
    }

    public ProgressTask(task) : void {
        let comment = this.comment || '';
        this.toWorkTask(task,comment).then(()=>{
            this.eventEmitter.updateTasks.emit();
        })
    }

    //#region toWorkTask
    public toWorkTask(
        task : {
            Title : string,
            ID : any,
            StartDate : string,
            TaskDueDate : string,
            sysIDList  : any,
            sysIDItem  :any,
            AssignedToId : any,
            TaskAuthore : {
                Title : string,
                EMail : string
            }
        },
        comment : string
    ) : Promise<any> {
        let updateTaskData = {
            "__metadata": {
                "type": "SP.Data.LSTasksListItem"
            },
            OData__Status : 'In Progress',
            AssignetToEmail : this.user.Email,
            AssignetToTitle : this.user.Name,
            AssignedToId : task.AssignedToId // this.userAAAA._id 
        }

        let datePipe = new DatePipe('ru');

        let EvanteDate = datePipe.transform(Date.now(),'y-MM-dd HH:mm:ss');//moment.utc().format("YYYY-MM-DD HH:mm:ss");//2017-06-01 04:32:35
        let StartDate = datePipe.transform(task.StartDate,'dd.MM.y HH:mm:ss');//moment.utc(task.StartDate).format("DD.MM.YYYY HH:mm:ss");
        let DueDate = datePipe.transform(task.TaskDueDate,'dd.MM.y');//moment.utc(task.TaskDueDate).format("DD.MM.YYYY");
    
        return this.translate.getTranslation(this.translate.currentLang).toPromise().then((loc: { LSDocs : any }) => { 
            let toHistory = {
                sysIDList : task.sysIDList,
                sysIDItem : task.sysIDItem,
                EventTypeUser : 'TaskInWork',
                itemData : {
                    ItemId: task.sysIDItem,
                    ListID: task.sysIDList,
                    ItemTitle: "-",
                    ListTitle: "-",
                    EventType: 'Task'
                },
                HistoryArray : [{
                    EventType: 'EventInWorkTask',
                    Event: loc.LSDocs.Alert59,//"Task in progress",
                    NameExecutor: this.user.Name,
                    NameAuthore: task.TaskAuthore.Title,
                    TaskTitle: task.Title,
                    StartDate: StartDate,
                    DueDate: DueDate,
                    EvanteDate: EvanteDate,//2017-06-01 04:32:35
                    Comments: comment || '',
                    ExecutorEmail: this.user.Email,
                    AthoreEmail: task.TaskAuthore.EMail,
                    TaskID: task.ID
                }],
                HistoryType : 'HistoryDataForUser'
            }

            let data = {
                updateTaskData : updateTaskData,
                toHistory : toHistory
            }

            return this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/lsdocs/${task.ID}`, data).then((response) => {
                console.log('lsdocstasks task InProgress:',response);
            });
        });
    }
    //#endregion

    ngOnDestroy () {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}