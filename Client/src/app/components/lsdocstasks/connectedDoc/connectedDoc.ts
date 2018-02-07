import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { GeneralService } from '../../../shared/general.service';
import { EventEmitterService } from '../../../shared/event-emitter.service';
import { APP_CONFIG } from '../../../app.config';
import { IAppConfig } from '../../../iapp.config.interface';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

@Component({
    selector: 'connectedDoc',
    templateUrl: "connectedDoc.html",
    styleUrls: ["connectedDoc.css"],
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

export class ConnectedDoc implements OnInit, OnDestroy {

    @Input() task: any;

    eventEmitter: any;
    subscriptions: Array<Subscription>;
    Fields : any;
    doc : any;
    Except : Object;
    preloaderVisible : string;

    constructor(
        private generalService: GeneralService, 
        private _eventEmitter: EventEmitterService,
        @Inject(APP_CONFIG) private config: IAppConfig,
        private translate: TranslateService
    ){
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
        this.doc = {};
        this.preloaderVisible = "inactive";
        this.Except = {
            'FileLeafRef' : true,
            'Title' : true,
            'FolderChildCount' : true,
            'ItemChildCount' : true,
            'TaxCatchAll' : true,
            'TaxCatchAllLabel' : true,
            '_dlc_DocIdPersistId' : true,
            '_dlc_DocIdUrl' : true,
            '_dlc_DocId' : true,
            'LSiIdeaMetaCategory_0' : true,
            'OrderType_0': true ,
            'IntDocType_0' : true,
            'Source_0' : true,
            'RequestType_0' : true,
            'ContractType_0' : true,
            'Status' : true,
            'OData_Status' : true,
        }
    }

    ngOnInit(){
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe((task) => {
            if(task.Source != this.config.sources.lsdocs || !task.ExternalDoc.props)
                return this.ngOnDestroy();
            this.task = task.ExternalDoc.props;
            this.updateView();
        }));
        this.updateView();
    }

    public updateView() : Promise<any> {
        this.Fields = [];
        this.doc = {};
        this.preloaderVisible = 'active';
        return this.getDoc()
            .then(res=>{
                this.doc = res;
                return this.getFields(res);
            })
            .then( ItemFields =>{
                let itemProps = this.doc;
                this.Fields = ItemFields.filter( (key, i ,arr) => {
                    if( itemProps[key.StaticName] && !key.StaticName.includes('_') && !key.Group.toLowerCase().includes('hidden') && !this.Except[key.StaticName] && !this.Except[key.Title])
                        return key;
                })
                this.preloaderVisible = "inactive";
            })
            .catch(err=>{
                this.preloaderVisible = "inactive";
                console.log('<ConnectedDoc> updateView error:',err);
            })
    }

    public getDoc() : Promise<any> {
        return this.generalService.httpGet(`${this.config.serverAPIUrl}/_api/lsdocs/doc/props?itemId=${this.task.sysIDItem}&listId=${this.task.sysIDList}`)
            .then( res => {
                if(res.ok == false)
                    return {}
                return res;
            })
    }

    public getFields(doc) : Promise<any> {
        return this.generalService.httpGet(`${this.config.serverAPIUrl}/_api/lsdocs/doc/fields?listId=${this.task.sysIDList}&contentTypeId=${this.doc.ContentTypeId}`)
            .then( res => {
                if(res.ok == false)
                    return []
                return res;
            })
    }

    ngOnDestroy(){
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}