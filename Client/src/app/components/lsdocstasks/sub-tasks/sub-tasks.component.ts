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
    userRole: string;
    comment : string;

    SubTasks : Array<any>;
    preloaderVisible : string;
    
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
        // this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe((task) => {
        //     if(task.Source != this.config.sources.lsdocs || !task.ExternalDoc.props)
        //         return this.ngOnDestroy();
        //     this.task = task.ExternalDoc.props;
        //     this.updateView();
        // }));
        this.updateView();  
    }

    public updateView() : Promise<any> { 
        this.preloaderVisible = 'active';
        
        return this.getSubTasks().then(() => { 
            this.preloaderVisible = 'inactive';
        })
    }

    public getSubTasks() : Promise<any> { 
        return this.generalService.httpPost(`${this.config.serverAPIUrl}/_api/lsdocs/subtasks/${this.contentType}`,this.task)
            .then(items => {
                this.SubTasks = items;
            })
            .catch(error => {
                console.error('<Get Subtasks> error:',error);
            })
    }


    ngOnDestroy () {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}