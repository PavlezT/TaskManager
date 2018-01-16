import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from '../../shared/general.service';
import { EventEmitterService } from '../../shared/event-emitter.service';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'profile-settings',
    styleUrls: ['./profile-settings.component.css'],
    templateUrl: './profile-settings.component.html',
  })
  export class ProfileSettingsComponent implements OnInit{

    availablePatterns: Array<string>;
    user: any;
    userTaskCategories: any;
    newTaskCategory: string;
    eventEmitter: any;
    loc: any;
    
    constructor (
        private generalService: GeneralService,
        private _eventEmitter: EventEmitterService,
        private translate: TranslateService
    ) {
        this.availablePatterns = [
            "/src/img/bg_patterns/vintage-concrete.png",
            "/src/img/bg_patterns/concrete-texture.png",
            "/src/img/bg_patterns/hip-square.png",
            "/src/img/bg_patterns/sayagata-400px.png",
            "/src/img/bg_patterns/cheap_diagonal_fabric.png",
            "/src/img/bg_patterns/swirl_pattern.png",
            "/src/img/bg_patterns/congruent_pentagon.png",
            "/src/img/bg_patterns/green_cup.png",
            "/src/img/bg_patterns/noisy_grid.png"
        ];
        this.user = null;
        this.userTaskCategories = null;
        this.newTaskCategory = null;
        this.eventEmitter = this._eventEmitter;
        this.loc = null;
    }
    
    ngOnInit () {
        this.generalService.getCurrentUser().then((user) => {
            this.user = user;
            this.getCategories();
        });
        this.translate.getTranslation(this.translate.currentLang).toPromise().then(loc => this.loc = loc);
    }

    getCategories () {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/UserTaskCategories?filter={"Author._docId":"${this.user["_id"]}"}&orderby=Created asc`).then((userTaskCategories) => {
            this.userTaskCategories = userTaskCategories;
        });
    }

    setPreviewPattern (e, url) { //Company becomes to string instead of ObjectID
        if (url != null) {
            this.generalService.user["SiteBg"] = ((url != null)&&(url.length > 0)) ? `url('${url}')` : '#ececec';
            let tempEditableItem = {
                SiteBg : this.user["SiteBg"]
            };
            this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/Users/${this.user["_id"]}`, tempEditableItem).then(() => {
                this.generalService.showNotification(`<p>${this.loc.Profile.Settings.SelectBackImageSuccess}</p>`, 3000);
            });
        }
    }

    onNewTaskCategoryAdd () {     
        if ((this.newTaskCategory != null)&&(this.newTaskCategory.length > 0)) {
            this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/UserTaskCategories`, {Title: this.newTaskCategory}).then(response => {
                this.newTaskCategory = '';
                this.getCategories();
                this.eventEmitter.updateTasks.emit();
                this.generalService.showNotification(`<p>${this.loc.Profile.Settings.CategoriesChangeSuccess}</p>`);
            });
        }
    }

    deleteTaskCategory(event, userTaskCategory) {
        this.generalService.httpDelete(`${this.generalService.serverAPIUrl}/_api/UserTaskCategories/${userTaskCategory["_id"]}`).then(response => {
            this.getCategories();
            this.eventEmitter.updateTasks.emit();
            this.generalService.showNotification(`<p>${this.loc.Profile.Settings.CategoriesChangeSuccess}</p>`);
        });
    }
}