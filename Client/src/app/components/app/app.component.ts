import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { GeneralService } from '../../shared/general.service';
import { EventEmitterService } from '../../shared/event-emitter.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from 'ng2-translate';
import { APP_CONFIG } from '../../app.config';
import { IAppConfig } from '../../iapp.config.interface';

@Component ({
    selector: 'app-root',
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
}) 

export class AppComponent implements OnInit, OnDestroy {
    user: any;
    masterpageIsLoaded: boolean;
    mainSidebarOpened: boolean;
    eventEmitter: any;
    subscriptions: Array<Subscription>;

    constructor (
        public generalService: GeneralService,
        private _eventEmitter: EventEmitterService,
        public translate: TranslateService, 
        @Inject(APP_CONFIG) private config: IAppConfig
    ) {
        this.masterpageIsLoaded = false;
        this.mainSidebarOpened = true;
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
        translate.setDefaultLang('ru');
        translate.use(config.locale);
    }

    ngOnInit() {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
            this.masterpageIsLoaded = true;
        });
        this.subscriptions.push(this.eventEmitter.onMainSidebarToggle.subscribe((value) => {
            if (value == null)
                this.mainSidebarOpened = !this.mainSidebarOpened;
            else 
                this.mainSidebarOpened = value;
        }));
    }

    toggleMainSidebar() {
        this.eventEmitter.onMainSidebarToggle.emit();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}