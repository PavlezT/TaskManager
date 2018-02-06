webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
exports.APP_CONFIG = new core_1.InjectionToken('app.config');
exports.AppConfig = {
    serverAPIUrl: window.location.origin,
    tasksStatuses: {
        done: 'Done',
        inprogress: "In Progress",
        new: "Not Started"
    },
    lsdocsStatuses: {
        done: 'Done',
        inprogress: "In Progress",
        new: 'Not Started'
    },
    sources: {
        lsdocs: 'lsdocs',
        dynamics365: 'dynamics365'
    },
    locale: getLocale(window.localStorage.getItem('userCustomLocale') || navigator.language || navigator['userLanguage'] || 'ru')
};
function getLocale(localization) {
    switch (localization.split('-')[0].toLowerCase()) {
        case 'ru':
            localization = 'ru';
            break;
        case 'en':
            localization = 'en';
            break;
        default:
            localization = 'ru';
    }
    return localization;
}


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var ng2_dragula_1 = __webpack_require__("../../../../ng2-dragula/index.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var ru_1 = __webpack_require__("../../../common/locales/ru.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var app_component_1 = __webpack_require__("../../../../../src/app/components/app/app.component.ts");
var main_sidebar_component_1 = __webpack_require__("../../../../../src/app/components/app/main-sidebar/main-sidebar.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/components/home/home.component.ts");
var collections_component_1 = __webpack_require__("../../../../../src/app/components/collections/collections.component.ts");
var collection_view_component_1 = __webpack_require__("../../../../../src/app/components/collection-view/collection-view.component.ts");
var search_dlg_component_1 = __webpack_require__("../../../../../src/app/shared/search-dlg.component.ts");
var tasks_component_1 = __webpack_require__("../../../../../src/app/components/tasks/tasks.component.ts");
var create_task_component_1 = __webpack_require__("../../../../../src/app/components/tasks/create-task/create-task.component.ts");
var quick_create_task_component_1 = __webpack_require__("../../../../../src/app/components/tasks/quick-create-task/quick-create-task.component.ts");
var info_task_component_1 = __webpack_require__("../../../../../src/app/components/tasks/info-task/info-task.component.ts");
var discussion_task_component_1 = __webpack_require__("../../../../../src/app/components/tasks/discussion-task/discussion-task.component.ts");
var edit_task_component_1 = __webpack_require__("../../../../../src/app/components/tasks/edit-task/edit-task.component.ts");
var profile_info_component_1 = __webpack_require__("../../../../../src/app/components/profile/profile-info/profile-info.component.ts");
var profile_settings_component_1 = __webpack_require__("../../../../../src/app/components/profile/profile-settings.component.ts");
var employees_component_1 = __webpack_require__("../../../../../src/app/components/employees/employees.component.ts");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var lsdocstasks_component_1 = __webpack_require__("../../../../../src/app/components/lsdocstasks/lsdocstasks.component.ts");
var work_task_component_1 = __webpack_require__("../../../../../src/app/components/lsdocstasks/work-task/work-task.component.ts");
var connectedDoc_1 = __webpack_require__("../../../../../src/app/components/lsdocstasks/connectedDoc/connectedDoc.ts");
var sub_tasks_component_1 = __webpack_require__("../../../../../src/app/components/lsdocstasks/sub-tasks/sub-tasks.component.ts");
var company_settings_1 = __webpack_require__("../../../../../src/app/components/company-settings/company-settings.ts");
function createTranslateLoader(http) {
    return new ng2_translate_1.TranslateStaticLoader(http, './src/assets/i18n', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
function getLocale(config) {
    return config.locale;
}
exports.getLocale = getLocale;
common_1.registerLocaleData(ru_1.default);
var MaterialDesign = /** @class */ (function () {
    function MaterialDesign() {
    }
    MaterialDesign = __decorate([
        core_1.NgModule({
            exports: [
                material_1.MatSidenavModule,
                material_1.MatMenuModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatDialogModule,
                material_1.MatInputModule,
                material_1.MatIconModule,
                material_1.MatCardModule,
                material_1.MatButtonModule,
                material_1.MatGridListModule,
                material_1.MatToolbarModule,
                material_1.MatDatepickerModule,
                material_1.MatAutocompleteModule,
                material_1.MatSelectModule,
                material_1.MatFormFieldModule,
                material_1.MatTooltipModule,
                material_1.MatTabsModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressSpinnerModule
            ]
        })
    ], MaterialDesign);
    return MaterialDesign;
}());
exports.MaterialDesign = MaterialDesign;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                main_sidebar_component_1.MainSidebarComponent,
                home_component_1.HomeComponent,
                collections_component_1.CollectionsComponent,
                collection_view_component_1.CollectionViewComponent,
                search_dlg_component_1.ListSearchDlgComponent,
                tasks_component_1.TasksComponent,
                create_task_component_1.CreateTaskComponent,
                quick_create_task_component_1.QuickCreateTaskComponent,
                info_task_component_1.InfoTaskComponent,
                discussion_task_component_1.DiscussionTaskComponent,
                edit_task_component_1.EditTaskComponent,
                lsdocstasks_component_1.LSDocsTasksComponent,
                work_task_component_1.WorkLSDocsComponent,
                connectedDoc_1.ConnectedDoc,
                sub_tasks_component_1.LSDocsSubTasks,
                employees_component_1.EmployeesListView,
                profile_settings_component_1.ProfileSettingsComponent,
                profile_info_component_1.ProfileAppInfoComponent,
                company_settings_1.CompanySettings
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                material_1.MatNativeDateModule,
                animations_1.BrowserAnimationsModule,
                ng2_dragula_1.DragulaModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                MaterialDesign,
                ng2_translate_1.TranslateModule.forRoot({
                    provide: ng2_translate_1.TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [http_1.Http]
                }),
                router_1.RouterModule.forRoot([
                    {
                        path: 'home',
                        component: home_component_1.HomeComponent,
                    },
                    {
                        path: 'collections',
                        component: collections_component_1.CollectionsComponent,
                    },
                    {
                        path: 'collection/:name',
                        component: collection_view_component_1.CollectionViewComponent,
                    },
                    // {
                    //   path: 'tasks/lsdocs',
                    //   component: LSDocsTasksComponent,
                    // },
                    {
                        path: 'tasks/category/:id',
                        component: tasks_component_1.TasksComponent,
                    },
                    {
                        path: 'tasks/:mode',
                        component: tasks_component_1.TasksComponent,
                    },
                    {
                        path: 'profile/:id',
                        component: profile_info_component_1.ProfileAppInfoComponent,
                    },
                    {
                        path: 'profile-settings',
                        component: profile_settings_component_1.ProfileSettingsComponent,
                    },
                    {
                        path: 'company-settings',
                        component: company_settings_1.CompanySettings,
                    },
                    {
                        path: 'employees',
                        component: employees_component_1.EmployeesListView
                    },
                    {
                        path: '',
                        redirectTo: '/tasks/my',
                        pathMatch: 'full'
                    }
                ], { useHash: true })
            ],
            providers: [
                general_service_1.GeneralService,
                event_emitter_service_1.EventEmitterService,
                {
                    provide: app_config_1.APP_CONFIG,
                    useValue: app_config_1.AppConfig
                },
                {
                    provide: core_1.LOCALE_ID,
                    deps: [app_config_1.APP_CONFIG],
                    useFactory: getLocale
                }
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [
                search_dlg_component_1.ListSearchDlgComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/components/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#app-inner-wrapper{\r\n    opacity: 0;\r\n    transition: opacity 0.3s ease;\r\n    height: 100%;    \r\n}\r\nmat-sidenav-container{\r\n    height: 100%;\r\n    background-color: #ececec;\r\n}\r\n.main-sidebar{\r\n    width: 300px;\r\n    background-color: white;\r\n    box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.2);\r\n    overflow: visible;\r\n    visibility: visible!important;\r\n}\r\n.main-sidebar-inner-wrapper{\r\n    position: relative;\r\n    height: 100%;\r\n}\r\n.main-sidebar main-sidebar{\r\n    position: relative;\r\n    overflow-x: auto;\r\n    overflow-y: visible;\r\n    height: 100%;\r\n    display: block;\r\n}\r\n.main-sidebar-btn{\r\n    position: absolute;\r\n    right: 0;\r\n    top: 10px;\r\n    margin-right: -44px;\r\n    background-color: #f5f5f5;\r\n    border-radius: 0 6px 6px 0;\r\n    cursor: pointer;\r\n    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\r\n}\r\n.main-sidebar-btn mat-icon{\r\n    margin: 10px;\r\n}\r\n.page-content{\r\n    width: 80%;\r\n    margin: 50px auto;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"app-inner-wrapper\" [ngStyle]=\"{'opacity':''+((masterpageIsLoaded) ? 1 : 0)+''}\">\r\n    <mat-sidenav-container [ngStyle]=\"{'background':'' + ((generalService.user) ? generalService.user.SiteBg : '') + ''}\">\r\n        <mat-sidenav class=\"main-sidebar\" [mode]=\"generalService.isLargeScreen() ? 'side' : 'over'\" [opened]=\"generalService.isLargeScreen() ? 'true' : mainSidebarOpened\" (close)=\"mainSidebarOpened = false\">\r\n            <div class=\"main-sidebar-inner-wrapper\">\r\n                <div class=\"main-sidebar-btn\" *ngIf=\"!generalService.isLargeScreen()\" (click)=\"toggleMainSidebar()\">\r\n                    <mat-icon>dehaze</mat-icon>\r\n                </div>\r\n                <main-sidebar></main-sidebar>\r\n            </div>\r\n        </mat-sidenav>\r\n        <router-outlet></router-outlet>\r\n    </mat-sidenav-container>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(generalService, _eventEmitter, translate, config) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.translate = translate;
        this.config = config;
        this.masterpageIsLoaded = false;
        this.mainSidebarOpened = true;
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
        translate.setDefaultLang('ru');
        translate.use(config.locale);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
            _this.masterpageIsLoaded = true;
        });
        this.subscriptions.push(this.eventEmitter.onMainSidebarToggle.subscribe(function (value) {
            if (value == null)
                _this.mainSidebarOpened = !_this.mainSidebarOpened;
            else
                _this.mainSidebarOpened = value;
        }));
    };
    AppComponent.prototype.toggleMainSidebar = function () {
        this.eventEmitter.onMainSidebarToggle.emit();
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/components/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/app/app.component.css")]
        }),
        __param(3, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            ng2_translate_1.TranslateService, Object])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/components/app/main-sidebar/main-sidebar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-toolbar{\r\n    padding: 0;\r\n}\r\nmat-toolbar >>> mat-toolbar-row:first-child{\r\n    display: none;\r\n}\r\nmat-toolbar .current-user-avatar{\r\n    border-radius: 50%;\r\n    width: 40px;\r\n    height: 40px;\r\n    margin: 8px 16px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-color: grey;\r\n    cursor: pointer;\r\n    outline: none!important;\r\n}\r\nmat-toolbar .current-user-name{\r\n    color: #444;\r\n    text-decoration: none;\r\n    margin-top: 5px;\r\n    font-size: 16px;\r\n    outline: none!important;\r\n}\r\nmat-toolbar .current-user-name:hover{\r\n    color: black;\r\n}\r\nmat-toolbar .site-actions-btn{\r\n    margin-top: 5px;\r\n    -webkit-transform: rotateZ(90deg);\r\n            transform: rotateZ(90deg);\r\n    color: #737373;\r\n}\r\nmat-toolbar button{\r\n    width: 100%;\r\n    height: 100%;\r\n    text-align: left;\r\n    font-size: 16px;\r\n    color: #565656;\r\n}\r\nmat-toolbar button mat-icon{\r\n    color: #565656;\r\n    vertical-align: middle;\r\n    margin-top: -5px;\r\n    margin-right: 10px;\r\n}\r\nmat-toolbar button .button-text{\r\n    line-height: 24px;\r\n    height: 24px;\r\n    display: inline-block;\r\n}\r\nmat-toolbar button .tasks-counter{\r\n    float: right;\r\n    display: inline-block;\r\n    margin-top: 1px;\r\n    color: #a6a6a6;\r\n    margin-right: 7px;\r\n}\r\n.tasks-active-link >>> .mat-button-focus-overlay {\r\n    opacity: 1;\r\n}\r\nmat-toolbar .mat-toolbar-row >>> .gu-transit,\r\nmat-toolbar .mat-toolbar-row >>> .task{\r\n    display: none;\r\n}\r\nmat-toolbar .mat-toolbar-row{\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/app/main-sidebar/main-sidebar.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n    <span></span>\r\n    <mat-toolbar-row style=\"background-color: white;\">\r\n        <div class=\"current-user-avatar\" [ngStyle]=\"{'background-image': 'url(' + avatarUrl + ')'}\" routerLink=\"/profile/{{userId}}\" (click)=\"hideMainSidebar()\"></div>\r\n        <a class=\"current-user-name\" *ngIf=\"user && generalService.isLargeScreen()\" routerLink=\"/profile/{{userId}}\" (click)=\"hideMainSidebar()\">{{user.Name.split(' ')[0]}}</a>\r\n        <a class=\"site-actions-btn\" mat-icon-button [matMenuTriggerFor]=\"menu\">\r\n            <mat-icon>chevron_right</mat-icon>\r\n        </a>\r\n        <mat-menu #menu=\"matMenu\">\r\n            <!-- <button mat-menu-item [disabled]=\"true\">\r\n                <mat-icon>notifications</mat-icon>\r\n                <span>{{'SideBar.Notifications' | translate}}</span>\r\n            </button> -->\r\n            <a *ngIf=\"user && user.Admin\" mat-menu-item routerLink=\"/collections\" (click)=\"hideMainSidebar()\">\r\n                <mat-icon>list</mat-icon>\r\n                <span>{{ 'SideBar.SiteContent'| translate}}</span>\r\n            </a>\r\n            <a mat-menu-item routerLink=\"/employees\" (click)=\"hideMainSidebar()\">\r\n                <mat-icon>people</mat-icon>\r\n                <span>{{ 'SideBar.Employees' | translate}}</span>\r\n            </a>\r\n            <a mat-menu-item routerLink=\"/profile-settings\" (click)=\"hideMainSidebar()\">\r\n                <mat-icon>build</mat-icon>\r\n                <span>{{'SideBar.MySettings'| translate}}</span>\r\n            </a>\r\n            <a *ngIf=\"user && user.Admin\" mat-menu-item routerLink=\"/company-settings\" (click)=\"hideMainSidebar()\">\r\n                <mat-icon>settings</mat-icon>\r\n                <span>{{'SideBar.CompanySettings'| translate}}</span>\r\n            </a>\r\n            <!-- <button mat-menu-item [disabled]=\"true\">\r\n                <mat-icon>info_outline</mat-icon>\r\n                <span>{{'SideBar.Information'| translate}}</span>\r\n            </button> -->\r\n            <a mat-menu-item href=\"/logout\">\r\n                <mat-icon>exit_to_app</mat-icon>\r\n                <span>{{'Exit' | translate}} {{'SideBar.fromTheAccount' | translate}}</span>\r\n            </a>\r\n        </mat-menu>\r\n    </mat-toolbar-row>\r\n    <mat-toolbar-row>\r\n        <button mat-button (click)=\"createTaskClick()\">\r\n            <span>\r\n                <mat-icon>add</mat-icon>\r\n                <span class=\"button-text\">{{'Create'| translate}} {{'Tasks.task'| translate}}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row>\r\n    <mat-toolbar-row>\r\n        <button mat-button routerLink=\"/tasks/important\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon>info_outline</mat-icon>\r\n                <span class=\"button-text\">{{'SideBar.Important'| translate}}</span>\r\n                <span class=\"tasks-counter\">{{ importantTasksCount }}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row>\r\n    <!-- <mat-toolbar-row>\r\n        <button mat-button routerLink=\"/tasks/new\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon>move_to_inbox</mat-icon>\r\n                <span class=\"button-text\">{{'SideBar.Newest'| translate}}</span>\r\n                <span class=\"tasks-counter\">{{ newTasksCount }}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row>\r\n    <mat-toolbar-row>\r\n        <button mat-button routerLink=\"/tasks/today\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon>date_range</mat-icon>\r\n                <span class=\"button-text\">{{'SideBar.Today'| translate}}</span>\r\n                <span class=\"tasks-counter\">{{ todayTasksCount }}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row> -->\r\n    <mat-toolbar-row>\r\n        <button mat-button routerLink=\"/tasks/my\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon>search</mat-icon>\r\n                <span class=\"button-text\">{{'SideBar.Incoming'| translate}}</span>\r\n                <span class=\"tasks-counter\">{{ myTasksCount }}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row>\r\n    <mat-toolbar-row>\r\n        <button mat-button routerLink=\"/tasks/outgoing\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon>zoom_out_map</mat-icon>\r\n                <span class=\"button-text\">{{'SideBar.DeliveredByMe'| translate}}</span>\r\n                <span class=\"tasks-counter\">{{ outgoingTasksCount }}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row>\r\n    <!-- <mat-toolbar-row>\r\n        <button mat-button routerLink=\"/tasks/lsdocs\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon>cloud_queue</mat-icon>\r\n                <span class=\"button-text\">{{'LSDocs.AppName'| translate}}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row> -->\r\n    <mat-toolbar-row *ngFor=\"let userTaskCategory of userTaskCategories\" [dragula]='\"categories-bag\"' [attr.data-id]=\"userTaskCategory._id\">\r\n        <button mat-button routerLink=\"/tasks/category/{{ userTaskCategory._id }}\" routerLinkActive=\"tasks-active-link\" (click)=\"hideMainSidebar()\">\r\n            <span>\r\n                <mat-icon></mat-icon>\r\n                <span class=\"button-text\">{{ userTaskCategory.Title }}</span>\r\n                <span class=\"tasks-counter\">{{ userTaskCategory.Count }}</span>\r\n            </span>\r\n        </button>\r\n    </mat-toolbar-row>\r\n</mat-toolbar>"

/***/ }),

/***/ "../../../../../src/app/components/app/main-sidebar/main-sidebar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var ng2_dragula_1 = __webpack_require__("../../../../ng2-dragula/ng2-dragula.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var MainSidebarComponent = /** @class */ (function () {
    function MainSidebarComponent(generalService, _eventEmitter, router, dragulaService, config) {
        var _this = this;
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.router = router;
        this.dragulaService = dragulaService;
        this.config = config;
        this.importantTasksCount = null;
        this.newTasksCount = null;
        this.todayTasksCount = null;
        this.myTasksCount = null;
        this.outgoingTasksCount = null;
        this.user = null;
        this.userTaskCategories = null;
        this.userId = '';
        this.avatarUrl = '#';
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
        dragulaService.setOptions('categories-bag', {
            moves: function (el, container, handle) {
                return container.className.indexOf("mat-toolbar-row") == -1 && window.outerWidth > 768;
            },
            accepts: function (el, target, source, sibling) {
                return target.className != "tasks-list-wrapper";
            },
        });
        this.subscriptions.push(dragulaService.drop.subscribe(function (value) {
            var taskId = value[1].getAttribute('data-id');
            var categoryId = value[2].getAttribute('data-id');
            _this.generalService.httpGet(_this.generalService.serverAPIUrl + "/_api/Tasks/" + taskId).then(function (task) {
                var categoryIsAlreadyAdded = false;
                if (task.UserCategories != null) {
                    task.UserCategories.forEach(function (userCategory) {
                        if (userCategory["_id"] == categoryId) {
                            categoryIsAlreadyAdded = true;
                        }
                    });
                }
                else {
                    task.UserCategories = [];
                }
                if (!categoryIsAlreadyAdded) {
                    task.UserCategories.push({ '_col': task.Company._docId + 'UserTaskCategories', '_docId': categoryId });
                }
                delete task["_id"];
                delete task["Company"];
                delete task["ExternalDoc"];
                _this.generalService.httpUpdate(_this.generalService.serverAPIUrl + "/_api/Tasks/" + taskId, task).then(function (response) {
                    _this.eventEmitter.updateTasks.emit();
                });
            });
        }));
    }
    MainSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
            _this.userId = user["_id"];
            _this.avatarUrl = "/src/img/avatars/" + user["Company"]["_docId"] + "/" + user["_id"] + ".jpeg";
            _this.updateView();
        });
        this.subscriptions.push(this.eventEmitter.updateTasks.subscribe(function () {
            _this.updateView();
        }));
    };
    MainSidebarComponent.prototype.updateView = function () {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Tasks?select=_id&filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"},\"IsImportant\":true}").then(function (docs) {
            _this.importantTasksCount = docs.length;
        });
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Tasks?select=_id&filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"}}").then(function (docs) {
            _this.myTasksCount = docs.length;
        });
        // this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"DueDate":{"$regex":"${(new Date()).toISOString().split('T')[0]}"}}`).then(docs => {
        //     this.todayTasksCount = docs.length;
        // });
        // this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Tasks?select=_id&filter={"AssignedTo._docId":"${this.user["_id"]}","Status":{"$ne":"${this.config.tasksStatuses.done}"},"Created":{"$regex":"${(new Date()).toISOString().split('T')[0]}"}}`).then(docs => {
        //     this.newTasksCount = docs.length;
        // });
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Tasks?select=_id&filter={\"Author._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"}}").then(function (docs) {
            _this.outgoingTasksCount = docs.length;
        });
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/UserTaskCategories?filter={\"Author._docId\":\"" + this.user["_id"] + "\"}&orderby=Created asc").then(function (userTaskCategories) {
            _this.userTaskCategories = userTaskCategories;
            var promiseArr = [];
            _this.userTaskCategories.forEach(function (userTaskCatergory) {
                promiseArr.push(_this.generalService.httpGet(_this.generalService.serverAPIUrl + "/_api/Tasks?select=_id&filter={\"UserCategories\":{\"$elemMatch\":{\"_docId\":\"" + userTaskCatergory["_id"] + "\"}},\"Status\":{\"$ne\":\"" + _this.config.tasksStatuses.done + "\"}}"));
            });
            Promise.all(promiseArr).then(function (response) {
                response.forEach(function (responsePart, i) {
                    _this.userTaskCategories[i]["Count"] = responsePart.length;
                });
            });
        });
    };
    MainSidebarComponent.prototype.createTaskClick = function () {
        if (this.router.url.indexOf('/tasks/') != -1) {
            this.eventEmitter.onNewTaskBtnClicked.emit();
        }
        else {
            this.router.navigate(['/tasks/create']);
        }
        this.hideMainSidebar();
    };
    MainSidebarComponent.prototype.hideMainSidebar = function () {
        this.eventEmitter.onMainSidebarToggle.emit(false);
    };
    MainSidebarComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    MainSidebarComponent = __decorate([
        core_1.Component({
            selector: 'main-sidebar',
            template: __webpack_require__("../../../../../src/app/components/app/main-sidebar/main-sidebar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/app/main-sidebar/main-sidebar.component.css")]
        }),
        __param(4, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            router_1.Router,
            ng2_dragula_1.DragulaService, Object])
    ], MainSidebarComponent);
    return MainSidebarComponent;
}());
exports.MainSidebarComponent = MainSidebarComponent;


/***/ }),

/***/ "../../../../../src/app/components/collection-view/collection-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ls-list{\r\n  position: relative;\r\n}\r\n.ls-list-table {\r\n  /* position: relative; */\r\n  /* position: absolute; */\r\n  /* width: 100%; */\r\n  width: -webkit-max-content;\r\n  width: -moz-max-content;\r\n  width: max-content;\r\n  /* max-width: 100%; */\r\n  background-color: #fff;\r\n  font-size: 13px;\r\n  padding: 1px;\r\n  padding-right: 70px;\r\n  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\r\n}\r\n.ls-list-table > thead > tr,\r\n.ls-list-table > tbody > tr{\r\n  transition: all 0.3s ease;\r\n}\r\n.ls-list-table > thead > tr > th,\r\n.ls-list-table > tbody > tr > th,\r\n.ls-list-table > thead > tr > td,\r\n.ls-list-table > tbody > tr > td{\r\n  text-align: left;\r\n  word-break: break-word;\r\n  padding: 6px 10px;\r\n  vertical-align: top;\r\n  border-top: 0;\r\n  transition: all 0.3s ease;\r\n  vertical-align: middle;\r\n}\r\n.ls-list-table > thead > tr > th {\r\n  vertical-align: bottom;\r\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\r\n  color: black;\r\n  font-weight: 600;\r\n  padding: 14px 10px;\r\n}\r\n.ls-list-table > thead:first-child > tr:first-child > th,\r\n.ls-list-table > thead:first-child > tr:first-child > td {\r\n  border-top: 0;\r\n}\r\n.ls-list-table > tbody > tr:hover > td,\r\n.ls-list-table > tbody > tr:hover > th,\r\n.ls-list-table > tbody > tr.selected > td,\r\n.ls-list-table > tbody > tr.selected > th,\r\n.ls-list-table > tbody > tr.editable > td,\r\n.ls-list-table > tbody > tr.editable > th,\r\n.ls-list-table > tbody > tr.new > td,\r\n.ls-list-table > tbody > tr.new > th{\r\n  background-color: #b3e5fc;\r\n}\r\n.ls-list-header-info{\r\n  font-size: 14px;\r\n  margin-bottom: 7px;\r\n  font-weight: 600;\r\n  color: black;\r\n}\r\n.dropdown-link{\r\n  max-width: 50px;\r\n  margin: 0 auto;\r\n  letter-spacing: 3px;\r\n  cursor: pointer;\r\n  color: transparent;\r\n  text-align: center;\r\n  transition: all 0.3s ease;\r\n}\r\n.ls-list-table > tbody > tr:hover > td .dropdown-link,\r\n.ls-list-table > tbody > tr.editable > td .dropdown-link,\r\n.ls-list-table > tbody > tr.new > td .dropdown-link{\r\n  color: #444;\r\n}\r\n.dropdown-link:hover{\r\n  color: black;\r\n}\r\n.sort-icon{\r\n  position: absolute;\r\n  right:0;\r\n  top: 9px;\r\n}\r\n.ls-list-table > thead > tr > th{\r\n  position: relative;\r\n  cursor: pointer;\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n.ls-list-preloader{\r\n  /*position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: rgba(255,255,255,0.7);\r\n  -webkit-transition: all 0.3s ease;\r\n  -o-transition: all 0.3s ease;\r\n  transition: all 0.3s ease;*/\r\n}\r\n.ls-list-preloader.hidden{\r\n  opacity: 0;\r\n}\r\n.mat-spinner{\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  margin-left: -50px;\r\n  margin-top: -50px;\r\n}\r\n.ls-list-actions{\r\n  position: absolute;\r\n  top: 0;\r\n  /* left: 100%; */\r\n  /* margin-right: -40px; */\r\n  left: -45px;\r\n  -webkit-transform: scale(-1,1);\r\n          transform: scale(-1,1);\r\n  width: 46px;\r\n  height: 140px;\r\n}\r\n.ls-list-action{\r\n  display: block;\r\n  width: 46px;\r\n  height: 46px;\r\n  text-align: center;\r\n  color: white;  \r\n  background-color: rgba(0,0,0,.2);\r\n  transition: all 0.2s ease;\r\n  cursor: pointer;\r\n}\r\n.ls-list-action:not(:last-child) {\r\n  margin-bottom: 1px;\r\n}\r\n.ls-list-action:hover{\r\n  background-color: rgba(0,0,0,.7)\r\n}\r\n.ls-list-action > .mat-icon{\r\n  height: 46px;\r\n  width: 46px;\r\n  line-height: 46px;\r\n  vertical-align: middle;\r\n}\r\n.ls-list-action:first-child{\r\n  border-radius: 0 11px 0 0;\r\n}\r\n.ls-list-action:last-child{\r\n  border-radius: 0  0 11px 0;\r\n}\r\n.ls-list-pagination{\r\n  text-align: center;\r\n  margin-top: 15px;\r\n  color:#444;\r\n}\r\n.ls-list-pagination > button{\r\n  margin: 0px 3px;\r\n}\r\n.ls-list-no-items{\r\n  min-height: 30px;\r\n  height:30px;\r\n}\r\n.ls-list-no-items>td{\r\n  text-align: center!important;\r\n  font-size: 16px;\r\n}\r\n.ls-list-no-items:hover>td{\r\n  background-color: transparent!important;\r\n}\r\n\r\n.searchText{\r\n  color: green;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/collection-view/collection-view.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component-container\">\r\n  <h2 style=\"color: #444; font-weight: 200;\">\r\n    {{this.collectionName}} \r\n  </h2>\r\n  <div class=\"ls-list\">\r\n    <div class=\"ls-list-wrapper\">\r\n      <div class=\"ls-list-table-header\">\r\n        <div *ngIf=\"selectedItemsCount > 0\" class=\"ls-list-header-info\">{{ 'CollectionView.Selected' | translate}} {{ 'CollectionView.elements' | translate }}: {{ selectedItemsCount }}. <a href=\"javascript:void(0)\" (click)=\"deleteSelectedItems()\">{{ 'Delete' | translate }}</a> {{ 'or' | translate }} <a href=\"javascript:void(0)\" (click)=\"disselectAll()\">{{ 'CollectionView.undoSelected' | translate }}</a> ...</div>\r\n        <div *ngIf=\"itemEditModeActive\" class=\"ls-list-header-info\">{{ 'CollectionView.itemEditModeActive' | translate }}</div>\r\n        <div *ngIf=\"itemAddModeActive\" class=\"ls-list-header-info\">{{ 'CollectionView.itemAddModeActive' | translate }}</div>\r\n        <div *ngIf=\"searchInfo\" class=\"ls-list-header-info\">{{ 'Search' | translate }} {{ 'CollectionView.byValue' | translate }} : <span class=\"searchText\">{{searchInfo}}</span>. <a href=\"javascript:void(0)\" (click)=\"cancelSearch()\">{{ 'Cancel' | translate }} {{ 'CollectionView.search' | translate }}</a></div>\r\n      </div>\r\n      <div>\r\n      <table class=\"ls-list-table\">\r\n        <thead>\r\n          <tr>\r\n            <th></th>\r\n            <th *ngFor=\"let key of collectionKeys\" (click)=\"updateSort($event, key)\">\r\n              {{ key }}\r\n              <span *ngIf=\"checkSort(key)!=null\">\r\n                <mat-icon *ngIf=\"checkSort(key)!='asc'\" class=\"sort-icon\">arrow_upward</mat-icon>\r\n                <mat-icon *ngIf=\"checkSort(key)!='desc'\" class=\"sort-icon\">arrow_downward</mat-icon>\r\n              </span>\r\n            </th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngIf=\"itemAddModeActive\" class=\"new\">\r\n            <td>\r\n              <div class=\"dropdown-link\">\r\n                <button mat-icon-button [matMenuTriggerFor]=\"menu\">\r\n                  <mat-icon>more_horiz</mat-icon>\r\n                </button>\r\n                <mat-menu #menu=\"matMenu\">\r\n                  <button mat-menu-item (click)=\"saveNewItem()\">\r\n                    <mat-icon>save</mat-icon>\r\n                    <span>{{ 'Save' | translate}}</span>\r\n                  </button>\r\n                  <button mat-menu-item (click)=\"itemAddModeActive = false;\">\r\n                    <mat-icon>cancel</mat-icon>\r\n                    <span>{{ 'Cancel' | translate}} {{ 'CollectionView.changes'| translate}}</span>\r\n                  </button>\r\n                </mat-menu>\r\n              </div>\r\n            </td>\r\n            <td *ngFor=\"let key of collectionKeys\" [attr.key]=\"key\"><div [attr.contenteditable]=\"true\"></div></td>\r\n          </tr>\r\n          <tr *ngFor=\"let item of items\" class=\"{{item.ngProps.Selected == true ? 'selected' : ''}} {{item.ngProps.Editable == true ? 'editable' : ''}}\" (click)=\"toggleItemSelection($event, item)\">\r\n            <td>\r\n              <div class=\"dropdown-link\" (click)=\"onDropdownOpen($event, item)\">\r\n                <button mat-icon-button [matMenuTriggerFor]=\"menu\">\r\n                  <mat-icon>more_horiz</mat-icon>\r\n                </button>\r\n                <mat-menu #menu=\"matMenu\">\r\n                  <button *ngIf=\"!itemEditModeActive\" mat-menu-item (click)=\"toggleItemEdit($event, item)\">\r\n                    <mat-icon>edit</mat-icon>\r\n                    <span>{{ 'Edit' | translate }} {{ 'CollectionView.element' | translate }}</span>\r\n                  </button>\r\n                  <button *ngIf=\"itemEditModeActive && item.ngProps.Editable\" mat-menu-item (click)=\"saveEditableItem()\">\r\n                    <mat-icon>save</mat-icon>\r\n                    <span>{{ 'Save' | translate }}</span>\r\n                  </button>\r\n                  <button *ngIf=\"itemEditModeActive && item.ngProps.Editable\" mat-menu-item (click)=\"toggleItemEdit($event, item)\">\r\n                    <mat-icon>cancel</mat-icon>\r\n                    <span>{{ 'Cancel' | translate }} {{ 'CollectionView.changes' | translate }}</span>\r\n                  </button>\r\n                  <button mat-menu-item (click)=\"deleteItem($event, item)\">\r\n                    <mat-icon>delete</mat-icon>\r\n                    <span>{{ 'Delete' | translate }} {{ 'CollectionView.element' | translate }}</span>\r\n                  </button>\r\n                </mat-menu>\r\n              </div>\r\n            </td>\r\n            <td *ngFor=\"let key of collectionKeys\" [attr.key]=\"key\"><div [attr.contenteditable]=\"item.ngProps.Editable\">{{ getItemView(item[key]) }}</div></td>\r\n          </tr>\r\n          <tr class=\"ls-list-no-items\" *ngIf=\"((items != null) && (items.length == 0))\">\r\n            <td style=\"position : absolute;\">\r\n              <div>{{ 'NoElements' | translate }}</div>\r\n            </td>\r\n          </tr>\r\n          <tr *ngIf=\"items == null\">\r\n            <td style=\"background-color:white;\">\r\n              <div style=\"min-height: 140px;\"></div>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n        <div class=\"ls-list-actions\">\r\n          <div class=\"ls-list-action\" (click)=\"toggleItemAdd()\" matTooltip=\"{{ 'Create' | translate }} {{ 'CollectionView.element' | translate }}\" matTooltipPosition=\"left\">\r\n            <mat-icon>add</mat-icon>\r\n          </div>\r\n          <div class=\"ls-list-action\" matTooltip=\"{{ 'Search' | translate }}\" matTooltipPosition=\"left\" (click)=\"openListSearchDlg()\">\r\n            <mat-icon>search</mat-icon>\r\n          </div>\r\n          <div class=\"ls-list-action\" matTooltip=\"{{ 'Settings' | translate }}\" matTooltipPosition=\"left\">\r\n            <mat-icon>settings</mat-icon>\r\n          </div>\r\n        </div>\r\n      </table>\r\n      </div>\r\n      <div class=\"ls-list-pagination\">\r\n        <button mat-icon-button [disabled]=\"pageNumber == 1\" (click)=\"paginationChange('prev')\" matTooltip=\"{{ 'PrevPage' | translate }}\">\r\n          <mat-icon>chevron_left</mat-icon>\r\n        </button>\r\n        <button mat-icon-button [disabled]=\"items == null || items.length < itemsPerPage\" (click)=\"paginationChange('next')\" matTooltip=\"{{ 'NextPage' | translate }}\">\r\n          <mat-icon>chevron_right</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"ls-list-preloader\" [@preloaderState]=\"preloaderVisible\">\r\n      <mat-spinner></mat-spinner>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/collection-view/collection-view.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var search_dlg_component_1 = __webpack_require__("../../../../../src/app/shared/search-dlg.component.ts");
var CollectionViewComponent = /** @class */ (function () {
    function CollectionViewComponent(generalService, dialog, route) {
        this.generalService = generalService;
        this.dialog = dialog;
        this.route = route;
        this.collectionName = "";
        this.collectionKeys = new Array();
        this.selectedItemsCount = 0;
        this.sortingRules = new Array();
        this.searchInfo = null;
        this.preloaderVisible = "active";
        this.itemEditModeActive = false;
        this.editableItem = null;
        this.itemAddModeActive = false;
        this.pageNumber = 1;
        this.itemsPerPage = 15;
    }
    CollectionViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.collectionName = params["name"];
            _this.updateView();
        });
    };
    CollectionViewComponent.prototype.updateView = function () {
        var _this = this;
        this.preloaderVisible = "active";
        //Generating sorting string for URL query
        var sortingStr = '';
        if (this.sortingRules.length > 0) {
            sortingStr += '&orderby=';
        }
        this.sortingRules.forEach(function (sortingRule, i) {
            sortingStr += sortingRule.Key + ' ' + sortingRule.Sorting;
            if (i + 1 != _this.sortingRules.length) {
                sortingStr += ',';
            }
        });
        var skip = (this.pageNumber - 1) * this.itemsPerPage;
        var top = this.itemsPerPage;
        var searchStr = this.searchInfo ? "&filter=" + JSON.stringify({ $text: { $search: "\"" + this.searchInfo + "\"", $caseSensitive: false, $diacriticSensitive: false } }) : "";
        var promiseArray = new Array();
        promiseArray.push(this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/" + this.collectionName + "/keys").then(function (keys) {
            _this.collectionKeys = keys;
        }));
        promiseArray.push(this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/" + this.collectionName + "?skip=" + skip + "&top=" + top + sortingStr + searchStr).then(function (docs) {
            docs.forEach(function (doc) { return doc.ngProps = {}; });
            _this.items = docs;
            _this.preloaderVisible = "inactive";
        }));
        return Promise.all(promiseArray).then(function () {
            _this.preloaderVisible = "inactive";
            _this.selectedItemsCount = 0;
            _this.itemEditModeActive = false;
        });
    };
    CollectionViewComponent.prototype.getItemView = function (item) {
        return item != null ? (typeof item == 'object' ? JSON.stringify(item) : item) : '';
    };
    //   --- Sort functionality --- 
    CollectionViewComponent.prototype.checkSort = function (key) {
        var sortingRule = this.sortingRules.find(function (sortingRule) { return sortingRule.Key == key; });
        return (sortingRule != null) ? sortingRule.Sorting : null;
    };
    CollectionViewComponent.prototype.updateSort = function (e, key) {
        if (e.shiftKey == false) {
            if (!((this.sortingRules.length == 1) && (this.sortingRules[0].Key == key)))
                this.sortingRules = [];
        }
        //Looking for existing sorting rule and creating if no found
        var sortingRuleIndex = null;
        for (var i = 0; i < this.sortingRules.length; ++i) {
            if (this.sortingRules[i].Key == key) {
                sortingRuleIndex = i;
            }
        }
        if (sortingRuleIndex == null) {
            sortingRuleIndex = this.sortingRules.length;
            this.sortingRules.push({ Key: key });
        }
        //Changing the sorting rule for current key
        var sortingRule = this.sortingRules[sortingRuleIndex];
        if (sortingRule.Sorting == null)
            sortingRule.Sorting = 'asc';
        else if (sortingRule.Sorting == 'asc')
            sortingRule.Sorting = 'desc';
        else if (sortingRule.Sorting == 'desc')
            this.sortingRules.splice(sortingRuleIndex, 1);
        this.updateView();
    };
    //   --- Sort functionality END --- 
    //   --- Item select\dropdown --- 
    CollectionViewComponent.prototype.toggleItemSelection = function (e, item) {
        if (!this.itemEditModeActive) {
            if (item.ngProps.Selected == true) {
                item.ngProps.Selected = false;
                --this.selectedItemsCount;
            }
            else {
                item.ngProps.Selected = true;
                ++this.selectedItemsCount;
            }
        }
    };
    CollectionViewComponent.prototype.onDropdownOpen = function (e, selectedItem) {
        this.items.forEach(function (item) {
            item.ngProps.Selected = null;
        });
        this.selectedItemsCount = 0;
        this.toggleItemSelection(e, selectedItem);
    };
    CollectionViewComponent.prototype.disselectAll = function () {
        this.items.forEach(function (item) {
            item.ngProps.Selected = false;
        });
        this.selectedItemsCount = 0;
    };
    //   --- Item select\dropdown END --- 
    //   --- Item delete ---
    CollectionViewComponent.prototype.deleteSelectedItems = function () {
        var _this = this;
        var promiseArray = new Array();
        this.items.forEach(function (item) {
            if (item.ngProps.Selected == true) {
                promiseArray.push(_this.generalService.httpDelete(_this.generalService.serverAPIUrl + "/_api/" + _this.collectionName + "/" + item._id));
            }
        });
        Promise.all(promiseArray).then(function () {
            _this.updateView();
        });
    };
    CollectionViewComponent.prototype.deleteItem = function (e, item) {
        var _this = this;
        this.generalService.httpDelete(this.generalService.serverAPIUrl + "/_api/" + this.collectionName + "/" + item._id).then(function () {
            _this.updateView();
        });
    };
    //   --- Item delete END ---
    //   --- Item quick change ---
    CollectionViewComponent.prototype.toggleItemEdit = function (e, item) {
        if (item.ngProps.Editable == true) {
            item.ngProps.Editable = false;
            this.itemEditModeActive = false;
        }
        else if (!this.itemAddModeActive) {
            item.ngProps.Editable = true;
            this.editableItem = item;
            this.itemEditModeActive = true;
        }
    };
    CollectionViewComponent.prototype.saveEditableItem = function () {
        var _this = this;
        var tempEditableItem = {};
        Object.keys(this.editableItem).forEach(function (objKey) { return tempEditableItem[objKey] = _this.editableItem[objKey]; });
        var editableItemRow = document.querySelectorAll('.ls-list .editable td[key] > div[contenteditable]');
        for (var i = 0; i < editableItemRow.length; ++i) {
            var key = editableItemRow[i].parentNode.attributes.getNamedItem('key').value;
            var value = editableItemRow[i].textContent.trim();
            tempEditableItem[key] = value;
        }
        delete tempEditableItem['_id'];
        delete tempEditableItem['ngProps'];
        delete tempEditableItem['Company'];
        this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/" + this.collectionName + "/" + this.editableItem['_id'], tempEditableItem).then(function () {
            _this.itemEditModeActive = false;
            _this.updateView();
        });
    };
    //   --- Item quick change END ---
    //   --- Item quick add ---
    CollectionViewComponent.prototype.toggleItemAdd = function () {
        if (!this.itemEditModeActive)
            this.itemAddModeActive = true;
    };
    CollectionViewComponent.prototype.saveNewItem = function () {
        var _this = this;
        var tempEditableItem = {};
        var editableItemRow = document.querySelectorAll('.ls-list .new td[key] > div[contenteditable]');
        for (var i = 0; i < editableItemRow.length; ++i) {
            var key = editableItemRow[i].parentNode.attributes.getNamedItem('key').value;
            var value = editableItemRow[i].textContent.trim();
            tempEditableItem[key] = value;
        }
        delete tempEditableItem['_id'];
        delete tempEditableItem['Company'];
        this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/" + this.collectionName, tempEditableItem).then(function () {
            _this.itemAddModeActive = false;
            _this.updateView();
        });
    };
    //   --- Item quick add END ---
    //   --- Pagination ---
    CollectionViewComponent.prototype.paginationChange = function (direction) {
        if (direction == "prev")
            --this.pageNumber;
        else if (direction == "next")
            ++this.pageNumber;
        this.updateView();
    };
    //   --- Pagination END ---
    //   --- Search ---
    CollectionViewComponent.prototype.openListSearchDlg = function () {
        var _this = this;
        var dialogRef = this.dialog.open(search_dlg_component_1.ListSearchDlgComponent);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.searchInfo = result;
                _this.pageNumber = 1;
                _this.updateView();
            }
        });
    };
    CollectionViewComponent.prototype.cancelSearch = function () {
        this.searchInfo = null;
        this.updateView();
    };
    CollectionViewComponent = __decorate([
        core_1.Component({
            selector: 'collection-view',
            template: __webpack_require__("../../../../../src/app/components/collection-view/collection-view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/collection-view/collection-view.component.css")],
            animations: [
                animations_1.trigger('preloaderState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        visibility: 'hidden'
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        visibility: 'visible'
                    })),
                    animations_1.transition('* => *', animations_1.animate('500ms ease-out')),
                ])
            ]
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            material_1.MatDialog,
            router_1.ActivatedRoute])
    ], CollectionViewComponent);
    return CollectionViewComponent;
}());
exports.CollectionViewComponent = CollectionViewComponent;


/***/ }),

/***/ "../../../../../src/app/components/collections/collections.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".collections-list{\r\n    width: 100%;\r\n    font-size: 0;\r\n}\r\n.collections-list .card-wrapper{\r\n    padding: 10px;\r\n}\r\n.collections-list .card-wrapper mat-card{\r\n    cursor: pointer;\r\n    -webkit-transform: scale(0.95);\r\n            transform: scale(0.95);\r\n    transition: all 0.3s;\r\n}\r\n.collections-list .card-wrapper mat-card > span{\r\n    font-size: 18px;\r\n}\r\n.collections-list .card-wrapper mat-card:hover{\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n}\r\n.collections-list .card-wrapper mat-icon{\r\n    font-size: 100px;\r\n    margin-top: 20px;\r\n    color: #bdbdbd;\r\n    height: auto;\r\n    width: auto;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/collections/collections.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component-container\">\r\n    <div class=\"collections-list container-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"card-wrapper col-12 col-sm-6 col-md-4 col-lg-3\" *ngFor=\"let collection of collections\">\r\n                <mat-card routerLink=\"/collection/{{ collection.name }}\" routerLinkActive=\"active\">\r\n                    <span>{{ collection.name }}</span>\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/components/collections/collections.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var CollectionsComponent = /** @class */ (function () {
    function CollectionsComponent(generalService) {
        this.generalService = generalService;
        this.collections = new Array();
    }
    CollectionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/collections").then(function (response) {
            _this.collections = response;
        });
    };
    CollectionsComponent = __decorate([
        core_1.Component({
            selector: 'collections',
            template: __webpack_require__("../../../../../src/app/components/collections/collections.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/collections/collections.component.css")]
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService])
    ], CollectionsComponent);
    return CollectionsComponent;
}());
exports.CollectionsComponent = CollectionsComponent;


/***/ }),

/***/ "../../../../../src/app/components/company-settings/company-settings.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".profile-settings-wrapper{\r\n    background-color: white;\r\n    padding: 20px;\r\n}\r\n.pattern-preview-wrapper{\r\n    max-width: 100%;\r\n    width: 500px;\r\n    font-size: 0;\r\n}\r\n.pattern-preview{\r\n    margin-right: 10px;\r\n    margin-bottom: 10px;\r\n    height: 90px;\r\n    width: 90px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n.pattern-preview:hover{\r\n    outline: 1px solid #444;\r\n}\r\n.task-categories-wrapper mat-chip mat-icon{\r\n    margin-left: 3px;\r\n    width: 20px;\r\n    height: 20px;\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.connection-settings-form{\r\n    margin-top:15px;\r\n    padding:10px;\r\n    background-color: rgba(223,223,223,0.4);\r\n}\r\n\r\n.url-input{\r\n    width: 100%;\r\n    font-size: 0.9rem;\r\n    word-break: break-word;\r\n}\r\n\r\nmat-icon {\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n}\r\n\r\n.dynamics365-form > mat-form-field{\r\n    width: 300px;\r\n    max-width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/company-settings/company-settings.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component-container\">\r\n    <h2 style=\"color: #444; font-weight: 200;\">\r\n       {{ 'Company.Settings.SettingsPage' | translate }}\r\n    </h2>\r\n    <div *ngIf=\"user && user.Admin\" class=\"profile-settings-wrapper\">\r\n        <p>{{ 'Company.Settings.SelectAdmins' | translate }}</p>\r\n        <form (submit)=\"addCompanyAdmin($event)\"  class=\"connection-settings-form\" >\r\n            <mat-chip-list *ngIf=\"allUsers != null && allUsers.length > 0\">\r\n                <ng-container *ngFor=\"let companyUser of allUsers\">\r\n                    <mat-chip *ngIf=\"companyUser.Admin\">\r\n                        {{ companyUser.Name }}\r\n                        <mat-icon *ngIf=\"!companyUser.deleting\" (click)=\"deleteAdminUser($event, companyUser)\">close</mat-icon>\r\n                        <mat-icon *ngIf=\"companyUser.deleting\">cached</mat-icon>\r\n                    </mat-chip>\r\n                </ng-container>\r\n            </mat-chip-list>\r\n            <mat-form-field style=\"margin-top: 10px;\">\r\n                <mat-select [formControl]=\"usersValid\" placeholder=\"{{ 'Company.Settings.SelectAdminsPlaceholder' | translate }}\" [(ngModel)]=\"selectedUser\" name=\"selectedUser\" required>\r\n                    <ng-container *ngFor=\"let companyUser of allUsers\">\r\n                        <mat-option *ngIf=\"!companyUser.Admin\" [value]=\"companyUser\">\r\n                            {{ companyUser.Name }}\r\n                        </mat-option>\r\n                    </ng-container>\r\n                </mat-select>\r\n            </mat-form-field>\r\n            <button mat-button type=\"submit\">{{ 'Add' | translate }}</button>\r\n        </form>\r\n        <p>{{ 'Company.Settings.LSDocsConnection' | translate }}</p>\r\n        <form (submit)=\"subscribeLSDocs($event)\"  class=\"connection-settings-form\" >\r\n            <p *ngIf=\"lsDocsSubscription\" class=\"url-input\">{{lsDocsSubscription.siteUrl}}</p>\r\n            <p *ngIf=\"lsDocsSubscription\" class=\"url-input\">{{ (lsDocsSubscription.expirationDateTime) | date:'medium' }}</p>\r\n            <!-- <mat-form-field class=\"url-input\">  -->\r\n                <!-- <input matInput type=\"text\" disabled placeholder=\"Input your LSDocs connection url\" [(ngModel)]=\"siteUrlDocs\" name=\"siteUrlDocs\" required> -->\r\n            <!-- </mat-form-field> -->\r\n            <mat-form-field>\r\n                <mat-select [formControl]=\"docsValid\" placeholder=\"{{ 'Company.Settings.SelectLSDocsPlaceholder' | translate }}\" [(ngModel)]=\"lsDocsSubscription.siteUrl\" name=\"lsDocsSubscription.siteUrl\" required>\r\n                    <mat-option *ngFor=\"let site of availableSites\" [value]=\"site.webUrl\">\r\n                        {{ site.displayName }}\r\n                    </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n            <button mat-button type=\"submit\">{{ 'Save' | translate }}</button>\r\n        </form>\r\n        <p>{{ 'Company.Settings.Dynamics365Connection' | translate }}</p>\r\n        <form (submit)=\"onDynamics365ConnectionFormSubmit($event, dynamics365ConnectionForm)\" #dynamics365ConnectionForm=\"ngForm\" class=\"connection-settings-form dynamics365-form\" >\r\n            <mat-form-field>\r\n                <input matInput type=\"text\" placeholder=\"{{ 'Company.Settings.Dynamics365Url' | translate }}\" [(ngModel)]=\"dynamics365Subscription.DynamicsInstanceUrl\" name=\"DynamicsInstanceUrl\" #DynamicsInstanceUrl=\"ngModel\" required>\r\n            </mat-form-field>\r\n            <br>\r\n            <mat-form-field>\r\n                <input matInput type=\"text\" placeholder=\"{{ 'Company.Settings.Dynamics365OrgName' | translate }}\" [(ngModel)]=\"dynamics365Subscription.DynamicsOrgName\" name=\"DynamicsOrgName\" #DynamicsOrgName=\"ngModel\" required>\r\n            </mat-form-field>\r\n            <button mat-button type=\"submit\" [disabled]=\"!dynamics365ConnectionForm.valid\">{{ 'Save' | translate }}</button>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/company-settings/company-settings.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var CompanySettings = /** @class */ (function () {
    function CompanySettings(generalService, translate) {
        this.generalService = generalService;
        this.translate = translate;
        this.user = null;
        this.docsValid = new forms_1.FormControl('valid', [
            forms_1.Validators.required,
            forms_1.Validators.pattern(/https:\/\//)
        ]);
        this.lsDocsSubscription = { siteUrl: null };
        this.availableSites;
        this.usersValid = new forms_1.FormControl('valid', [
            forms_1.Validators.required
        ]);
        this.allUsers = null;
        this.selectedUser = null;
        this.dynamics365Subscription = { _id: null, DynamicsInstanceUrl: null, DynamicsOrgName: null };
    }
    CompanySettings.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        }).then(function () {
            _this.getDynamics365Subscription();
        });
        this.loadLSDocsSubscriptions();
        this.getAllUsers();
        if (window.location.href.indexOf('syncDynamicsUsers=true') != -1) {
            this.syncDynamics365Users();
        }
    };
    CompanySettings.prototype.loadLSDocsSubscriptions = function () {
        var _this = this;
        return Promise.all([
            this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Subscriptions?filter={\"Source\" : \"lsdocs\"}"),
            this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/lsdocs/webUrl")
        ])
            .then(function (_a) {
            var response = _a[0], sites = _a[1];
            response[0] && (_this.lsDocsSubscription = response[0]);
            _this.availableSites = sites;
        })
            .catch(function (error) { console.log('<Load Subscriptions error:', error); });
    };
    CompanySettings.prototype.getAllUsers = function () {
        var _this = this;
        return this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=_id,Name,Admin,Email")
            .then(function (res) {
            if (res.ok == false)
                return _this.allUsers = [];
            _this.allUsers = res;
        })
            .catch(function (error) {
            console.log('<Get All Users> error:', error);
        });
    };
    CompanySettings.prototype.deleteAdminUser = function (event, user) {
        if (user["_id"] == this.user["_id"])
            return Promise.resolve();
        user.deleting = true;
        return this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Users/" + user["_id"], { Admin: false })
            .then(function (res) {
            if (res.ok == false)
                return Promise.reject(res.json() || 'Error in subscribe');
            user.Admin = false;
            user.deleting = false;
        })
            .catch(function (error) {
            console.log('<DeleteUserAsAdmin> error:', error);
            user.deleting = false;
        });
    };
    CompanySettings.prototype.addCompanyAdmin = function (event) {
        var _this = this;
        event.srcElement["0"].disabled = true;
        return (this.usersValid.valid ?
            //this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/admins/${this.selectedUser["_id"]}`,{})
            this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Users/" + this.selectedUser["_id"], { Admin: true })
            : Promise.reject('Form invalid'))
            .then(function (res) {
            if (res.ok == false)
                return Promise.reject(res.json() || 'Error in subscribe');
            event.srcElement["0"].disabled = false;
            _this.selectedUser.Admin = true;
        })
            .catch(function (error) {
            event.srcElement["0"].disabled = false;
            _this.usersValid.setErrors(new forms_1.Validators());
            console.log('<Add Company Admin> error:', error);
        });
    };
    CompanySettings.prototype.subscribeLSDocs = function (event) {
        var _this = this;
        event.srcElement["0"].disabled = true;
        return (this.docsValid.valid ? this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/lsdocs/subscribe", { siteUrl: this.lsDocsSubscription.siteUrl })
            : Promise.reject('Form invalid'))
            .then(function (res) {
            if (res.ok == false)
                return Promise.reject(res.json() || 'Error in subscribe');
            _this.lsDocsSubscription = res;
            event.srcElement["0"].disabled = false;
        })
            .catch(function (error) {
            event.srcElement["0"].disabled = false;
            _this.docsValid.setErrors(new forms_1.Validators());
            console.log('<LSDocsConnect> resp for LSDocs:', error);
        });
    };
    CompanySettings.prototype.getDynamics365Subscription = function () {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Subscriptions?filter={\"Company._docId\": \"" + this.user.Company._docId + "\", \"Source\": \"dynamics365\"}").then(function (dynamics365Subscriptions) {
            var subscription = dynamics365Subscriptions[0];
            if (dynamics365Subscriptions.length > 0) {
                _this.dynamics365Subscription = { _id: subscription._id, DynamicsInstanceUrl: subscription.DynamicsInstanceUrl, DynamicsOrgName: subscription.DynamicsOrgName };
            }
        });
    };
    CompanySettings.prototype.onDynamics365ConnectionFormSubmit = function (event, dynamics365ConnectionForm) {
        event.preventDefault();
        var promise;
        if (this.dynamics365Subscription._id == null) {
            promise = this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/Subscriptions", {
                "Source": "dynamics365",
                "DynamicsInstanceUrl": this.dynamics365Subscription.DynamicsInstanceUrl,
                "DynamicsOrgName": this.dynamics365Subscription.DynamicsOrgName,
                "Company": {
                    "_col": "Companies",
                    "_docId": this.user.Company._docId
                }
            });
        }
        else {
            promise = this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Subscriptions/" + this.dynamics365Subscription._id, {
                "DynamicsInstanceUrl": this.dynamics365Subscription.DynamicsInstanceUrl,
                "DynamicsOrgName": this.dynamics365Subscription.DynamicsOrgName
            });
        }
        promise.then(function (response) {
            window.location.href = "/relogin?returnUrl=/#/company-settings?syncDynamicsUsers=true";
        });
    };
    CompanySettings.prototype.syncDynamics365Users = function () {
        var _this = this;
        this.generalService.preloaderStart();
        //TaskManager and Dynamics 365 users synchronization
        var getPromiseArr = [];
        getPromiseArr.push(this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/dynamics365/users"));
        getPromiseArr.push(this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users"));
        Promise.all(getPromiseArr).then(function (response) {
            var dynamics365Users = response[0].value;
            var users = response[1];
            var postPromiseArr = [];
            dynamics365Users.forEach(function (dynamics365User) {
                var userFound = false;
                users.forEach(function (user) {
                    if (dynamics365User.internalemailaddress == user.Email) {
                        userFound = true;
                        postPromiseArr.push(_this.generalService.httpUpdate(_this.generalService.serverAPIUrl + "/_api/Users/" + user._id, {
                            "Dynamics365Id": dynamics365User.systemuserid
                        }));
                    }
                });
                if (userFound == false) {
                    postPromiseArr.push(_this.generalService.httpPost(_this.generalService.serverAPIUrl + "/_api/Users", {
                        "Email": dynamics365User.internalemailaddress,
                        "Name": dynamics365User.fullname,
                        "Department": null,
                        "JobTitle": null,
                        "Phone": dynamics365User.mobilephone,
                        "Company": {
                            "_col": "Companies",
                            "_docId": _this.user.Company._id
                        },
                        "Dynamics365Id": dynamics365User.systemuserid
                    }));
                }
            });
            Promise.all(postPromiseArr).then(function (response) {
                _this.generalService.preloaderStop();
                _this.translate.getTranslation(_this.translate.currentLang).toPromise().then(function (loc) {
                    _this.generalService.showNotification("<p>" + loc.Company.Settings.Dynamics365ConnectionSuccess + "</p>");
                });
            });
        });
    };
    CompanySettings = __decorate([
        core_1.Component({
            selector: 'company-settings',
            styles: [__webpack_require__("../../../../../src/app/components/company-settings/company-settings.css")],
            template: __webpack_require__("../../../../../src/app/components/company-settings/company-settings.html")
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            ng2_translate_1.TranslateService])
    ], CompanySettings);
    return CompanySettings;
}());
exports.CompanySettings = CompanySettings;


/***/ }),

/***/ "../../../../../src/app/components/employees/employees.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-card{\r\n    margin-bottom:15px;\r\n    height: 480px;\r\n}\r\n.current-user-name{\r\n    font-size: 18px;\r\n    color: #1e88e5;\r\n}\r\n.current-user-name,\r\n.current-user-dep,\r\n.current-user-job-title,\r\n.current-user-contacts,\r\n.profile-settings-link{\r\n    padding: 10px 0;\r\n    word-break: break-all;\r\n}\r\n.current-user-dep b,\r\n.current-user-job-title b,\r\n.current-user-contacts b{\r\n    margin-bottom: 5px;\r\n    word-break: break-all;\r\n}\r\n\r\n.ls-list-preloader.hidden{\r\n    opacity: 0;\r\n  }\r\n  .mat-spinner{\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    margin-left: -50px;\r\n    margin-top: -50px;\r\n  }\r\n\r\n  .ls-list-pagination{\r\n    text-align: center;\r\n    margin-top: 15px;\r\n    color:#444;\r\n  }\r\n  .ls-list-pagination > button{\r\n    margin: 0px 3px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/employees/employees.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component-container\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"col-12 col-sm-6 col-lg-4\" *ngFor=\"let user of Users;index as i; last as isLast\">\r\n                <mat-card  *ngIf=\"i != itemsPerPage\">\r\n                    <mat-card-title>{{user.Name}}</mat-card-title>\r\n                    <mat-card-subtitle> {{user.JobTitle}}</mat-card-subtitle>\r\n                    <img mat-card-lg-image src=\"/src/img/avatars/{{user.Company._docId}}/{{user._id}}.jpeg\" />\r\n                    <mat-card-content>\r\n                        <div class=\"current-user-dep\" *ngIf=\"user.Department != null\"><b>{{'Profile.Info.Departament'| translate}}</b><br>{{user.Department}}</div>\r\n                        <div class=\"current-user-job-title\" *ngIf=\"user.JobTitle != null\"><b>{{'Profile.Info.Position'| translate}}</b><br>{{user.JobTitle}}</div>\r\n                        <div class=\"current-user-contacts\" *ngIf=\"user.Phone != null\"><b>{{'Profile.Info.Contacts'| translate}}</b><br>{{user.Phone}}<br>{{user.Email || ''}}</div>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!-- <mat-paginator [length]=\"elementsLength\" [pageSize]=\"itemsPerPage\"></mat-paginator> -->\r\n    <div class=\"ls-list-pagination\">\r\n        <button mat-icon-button [disabled]=\"pageNumber == 1\" (click)=\"paginationChange('prev')\" matTooltip=\"{{ 'PrevPage' | translate }}\">\r\n            <mat-icon>chevron_left</mat-icon>\r\n        </button>\r\n        <button mat-icon-button [disabled]=\"Users == null || (Users.length <= itemsPerPage)\" (click)=\"paginationChange('next')\" matTooltip=\"{{ 'NextPage' | translate }}\">\r\n            <mat-icon>chevron_right</mat-icon>\r\n        </button>\r\n    </div>\r\n    <div class=\"ls-list-preloader\" [@preloaderState]=\"preloaderVisible\">\r\n       <mat-spinner></mat-spinner>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/employees/employees.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var EmployeesListView = /** @class */ (function () {
    function EmployeesListView(generalService) {
        this.generalService = generalService;
        this.Users = [];
        this.pageNumber = 1;
        this.itemsPerPage = 6;
        this.preloaderVisible = 'inactive';
    }
    EmployeesListView.prototype.ngOnInit = function () {
        this.updateView();
    };
    EmployeesListView.prototype.updateView = function () {
        var _this = this;
        this.preloaderVisible = 'active';
        var skip = (this.pageNumber - 1) * this.itemsPerPage;
        var top = this.itemsPerPage + 1;
        return this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?skip=" + skip + "&top=" + top).then(function (users) {
            _this.Users = users;
            _this.preloaderVisible = 'inactive';
        });
    };
    //   --- Pagination ---
    EmployeesListView.prototype.paginationChange = function (direction) {
        if (direction == "prev")
            --this.pageNumber;
        else if (direction == "next")
            ++this.pageNumber;
        this.updateView();
    };
    EmployeesListView = __decorate([
        core_1.Component({
            selector: 'employees',
            styles: [__webpack_require__("../../../../../src/app/components/employees/employees.component.css")],
            template: __webpack_require__("../../../../../src/app/components/employees/employees.component.html"),
            animations: [
                animations_1.trigger('preloaderState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        visibility: 'hidden'
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        visibility: 'visible'
                    })),
                    animations_1.transition('* => *', animations_1.animate('500ms ease-out')),
                ])
            ]
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService])
    ], EmployeesListView);
    return EmployeesListView;
}());
exports.EmployeesListView = EmployeesListView;


/***/ }),

/***/ "../../../../../src/app/components/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".grid-list-wrapper{\r\n    height: 100%;\r\n    width: 100%;\r\n    padding: 15px;\r\n    box-sizing: border-box;\r\n}\r\nmat-grid-list{\r\n    height: 100%;\r\n}\r\nmat-grid-tile .web-part-wrapper{\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 15px;\r\n    box-sizing: border-box;\r\n}\r\nmat-grid-tile .web-part{\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: white;\r\n    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"grid-list-wrapper\">\r\n    <mat-grid-list cols=\"12\" rowHeight=\"fit\" gutterSize=\"0\">\r\n        <mat-grid-tile colspan=\"4\" rowspan=\"1\">\r\n            <div class=\"web-part-wrapper\">\r\n                <div class=\"web-part\">\r\n                    <div style=\"width:100%;text-align:center;padding-top:50px;\">Web part #1</div>\r\n                </div>\r\n            </div>\r\n        </mat-grid-tile>\r\n        <mat-grid-tile colspan=\"8\" rowspan=\"2\">\r\n            <div class=\"web-part-wrapper\">\r\n                <div class=\"web-part\">\r\n                    <div style=\"width:100%;text-align:center;padding-top:50px;\">Web part #2</div>\r\n                </div>\r\n            </div>\r\n        </mat-grid-tile>\r\n        <mat-grid-tile colspan=\"4\" rowspan=\"3\">\r\n            <div class=\"web-part-wrapper\">\r\n                <div class=\"web-part\">\r\n                    <div style=\"width:100%;text-align:center;padding-top:50px;\">Web part #3</div>\r\n                </div>\r\n            </div>\r\n        </mat-grid-tile>\r\n        <mat-grid-tile colspan=\"8\" rowspan=\"2\">\r\n            <div class=\"web-part-wrapper\">\r\n                <div class=\"web-part\">\r\n                    <div style=\"width:100%;text-align:center;padding-top:50px;\">Web part #4</div>\r\n                </div>\r\n            </div>\r\n        </mat-grid-tile>\r\n    </mat-grid-list>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: __webpack_require__("../../../../../src/app/components/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/home/home.component.css")]
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/connectedDoc/connectedDoc.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".work-task-wrapper{\r\n    width: 100%;\r\n    padding: 20px;\r\n}\r\n.work-task-wrapper mat-form-field,\r\n.work-task-wrapper mat-select{\r\n    width: 100%;\r\n}\r\n\r\n.task-info-wrapper{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n.work-task-wrapper .task-header{\r\n    padding: 30px;\r\n    /* height: 120px; */\r\n}\r\n.work-task-wrapper .task-header .author-avatar{\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-color: grey;\r\n    width: 55px;\r\n    height: 55px;\r\n    border-radius: 50%;\r\n    display: inline-block;\r\n    margin-right: 11px;\r\n    outline: none!important;\r\n}\r\n.work-task-wrapper .task-header .author-info{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    margin-bottom: 25px;\r\n}\r\n.work-task-wrapper .task-header .author-info .author-name{\r\n    font-weight: 600;\r\n    margin-top: 4px;\r\n    font-size: 19px;\r\n    color: #444;\r\n    text-decoration: none;\r\n}\r\n.work-task-wrapper .task-header .author-info .author-name:hover{\r\n    color: black;\r\n}\r\n.work-task-wrapper .task-header .author-info .task-created{\r\n    color: #7d7d7d;\r\n    font-size: 14px;\r\n    margin-top: 5px;\r\n}\r\n\r\n.work-task-wrapper .lsdocsButtons{\r\n    margin-top: 15px;\r\n    margin-right: 15px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/connectedDoc/connectedDoc.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"work-task-wrapper\">\r\n    <div class=\"task-header\">\r\n        <div class=\"author-info\">\r\n            <mat-icon style=\"color:cornflowerblue \">assignment</mat-icon>\r\n            <a class=\"author-name\">{{ task.Title }}</a>\r\n            <div class=\"task-created\">{{ 'LSDocs.TaskTitle' | translate  }}</div>  \r\n        </div>\r\n        <div class=\"author-info\">\r\n            <mat-icon style=\"color:cornflowerblue \">assignment</mat-icon>\r\n            <a class=\"author-name\">{{ doc.Title }}</a>\r\n            <div class=\"task-created\">{{ 'LSDocs.DocTitle' | translate  }}</div>\r\n        </div>\r\n    </div>\r\n    <form > \r\n        <mat-form-field *ngFor=\"let field of Fields\" >\r\n            <input matInput readonly type=\"text\" placeholder=\"{{ field.Title }}\" value=\"{{doc[field.StaticName]}}\">\r\n        </mat-form-field>\r\n    </form>\r\n    <div class=\"ls-list-preloader\" [@preloaderState]=\"preloaderVisible\">\r\n        <mat-spinner style=\"margin: auto;\"></mat-spinner>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/connectedDoc/connectedDoc.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var ConnectedDoc = /** @class */ (function () {
    function ConnectedDoc(generalService, _eventEmitter, config, translate) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.config = config;
        this.translate = translate;
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
        this.doc = {};
        this.preloaderVisible = "inactive";
        this.Except = {
            'FileLeafRef': true,
            'Title': true,
            'FolderChildCount': true,
            'ItemChildCount': true,
            'TaxCatchAll': true,
            'TaxCatchAllLabel': true,
            '_dlc_DocIdPersistId': true,
            '_dlc_DocIdUrl': true,
            '_dlc_DocId': true,
            'LSiIdeaMetaCategory_0': true,
            'OrderType_0': true,
            'IntDocType_0': true,
            'Source_0': true,
            'RequestType_0': true,
            'ContractType_0': true,
        };
    }
    ConnectedDoc.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe(function (task) {
            if (task.Source != _this.config.sources.lsdocs || !task.ExternalDoc.props)
                return _this.ngOnDestroy();
            _this.task = task.ExternalDoc.props;
            _this.updateView();
        }));
        this.updateView();
    };
    ConnectedDoc.prototype.updateView = function () {
        var _this = this;
        this.Fields = [];
        this.doc = {};
        this.preloaderVisible = 'active';
        return this.getDoc()
            .then(function (res) {
            _this.doc = res;
            return _this.getFields(res);
        })
            .then(function (ItemFields) {
            var itemProps = _this.doc;
            _this.Fields = ItemFields.filter(function (key, i, arr) {
                if (itemProps[key.StaticName] && !key.StaticName.includes('_') && !key.Group.toLowerCase().includes('hidden') && !_this.Except[key.StaticName] && !_this.Except[key.Title])
                    return key;
            });
            _this.preloaderVisible = "inactive";
        })
            .catch(function (err) {
            _this.preloaderVisible = "inactive";
            console.log('<ConnectedDoc> updateView error:', err);
        });
    };
    ConnectedDoc.prototype.getDoc = function () {
        return this.generalService.httpGet(this.config.serverAPIUrl + "/_api/lsdocs/doc/props?itemId=" + this.task.sysIDItem + "&listId=" + this.task.sysIDList)
            .then(function (res) {
            if (res.ok == false)
                return {};
            return res;
        });
    };
    ConnectedDoc.prototype.getFields = function (doc) {
        return this.generalService.httpGet(this.config.serverAPIUrl + "/_api/lsdocs/doc/fields?listId=" + this.task.sysIDList + "&contentTypeId=" + this.doc.ContentTypeId)
            .then(function (res) {
            if (res.ok == false)
                return [];
            return res;
        });
    };
    ConnectedDoc.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ConnectedDoc.prototype, "task", void 0);
    ConnectedDoc = __decorate([
        core_1.Component({
            selector: 'connectedDoc',
            template: __webpack_require__("../../../../../src/app/components/lsdocstasks/connectedDoc/connectedDoc.html"),
            styles: [__webpack_require__("../../../../../src/app/components/lsdocstasks/connectedDoc/connectedDoc.css")],
            animations: [
                animations_1.trigger('preloaderState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        visibility: 'hidden'
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        visibility: 'visible'
                    })),
                    animations_1.transition('* => *', animations_1.animate('0ms ease-out')),
                ])
            ]
        }),
        __param(2, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService, Object, ng2_translate_1.TranslateService])
    ], ConnectedDoc);
    return ConnectedDoc;
}());
exports.ConnectedDoc = ConnectedDoc;


/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/lsdocstasks.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-sidenav-container{\r\n    height: 100%;\r\n    background-color: transparent;\r\n}\r\nmat-sidenav{\r\n    width: 300px;\r\n    transition: width .3s ease;\r\n}\r\nmat-sidenav.info{\r\n    width: 500px;\r\n    max-width: 88%;\r\n}\r\n.tasks-list-wrapper{\r\n    width: 100%;\r\n    padding: 0;\r\n}\r\n.task{\r\n    height: 55px;\r\n    width: auto;\r\n    /* min-width:100%; */\r\n    background-color: white;\r\n    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\r\n    border-radius: 5px;\r\n    margin-bottom: 3px;\r\n    font-size: 0;\r\n    position: relative;\r\n}\r\n.ls-list-preloader.hidden{\r\n    opacity: 0;\r\n}\r\n.mat-spinner{\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    margin-left: -50px;\r\n    margin-top: -50px;\r\n}\r\n.task-tab {\r\n    width: 25%;\r\n    max-width: 155px;\r\n    border-radius: 10px 10px 0px 0px;\r\n    background-color: white;\r\n    height:55px;\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n.task-tab .task-title{\r\n    width:100%;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n.task:not(:last-child){\r\n    margin-bottom: 3px;\r\n}\r\n.task-checkbox-wrapper{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    height: 55px;\r\n    width: 70px;\r\n    text-align: center;\r\n}\r\n.task-checkbox-wrapper mat-checkbox{\r\n    height: auto;\r\n    width: auto;\r\n    margin: 18px 0px;\r\n    display: block;\r\n}\r\n.task-title{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    width: calc(100% - 225px);\r\n    font-size: 16px;\r\n    color: #444;\r\n    padding: 18px 0;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    cursor: default;\r\n}\r\n.task-importance{\r\n    position: absolute;\r\n    right: 15px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    z-index: 2;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n.task-importance mat-icon{\r\n    height: auto;\r\n    width: auto;\r\n    padding: 16px 0;        \r\n}\r\n.task-importance-bg{\r\n    position: absolute;\r\n    right: 15px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    text-align: center;\r\n}\r\n.task-importance-bg img{\r\n    width: 42px;\r\n    height: auto;\r\n}\r\n.task .task-date{\r\n    position: absolute;\r\n    right: 70px;\r\n    top: 18px;\r\n    font-size: 16px;\r\n    color: #444;\r\n}\r\n.task.gu-mirror{\r\n    width: 300px!important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/lsdocstasks.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container>\r\n    <mat-sidenav mode=\"over\" align=\"end\" (close)=\"onTaskSidenavClose()\" [opened]=\"tasksSidebarOpened\" [ngClass]=\"tasksSidebarType\">\r\n        <connectedDoc *ngIf=\"tasksSidebarType == 'connectedDoc'\" [task]=\"taskInfoViewed\" ></connectedDoc>\r\n        <work-task *ngIf=\"tasksSidebarType == 'info'\" [task]=\"taskInfoViewed\" [toDoneTask]=\"toDoneTask\"></work-task>\r\n    </mat-sidenav>\r\n    <div class=\"component-container\">\r\n        <!-- <quick-create-task></quick-create-task> -->\r\n        <div class=\"tasks-tabs-wrapper\" >\r\n            <div class=\"task-tab\" (click)=\"updateView(config.lsdocsStatuses.new)\" ><div class=\"task-title\">{{ 'LSDocs.NewTasks' | translate }}</div></div>\r\n            <div class=\"task-tab\" (click)=\"updateView(config.lsdocsStatuses.inprogress)\" ><div class=\"task-title\">{{ 'LSDocs.ActiveTasks' | translate }}</div></div>\r\n            <div class=\"task-tab\" (click)=\"updateView(config.lsdocsStatuses.done)\" ><div class=\"task-title\">{{ 'LSDocs.DoneTasks' | translate }}</div></div>\r\n        </div>\r\n        <div class=\"tasks-list-wrapper\" [attr.width]='10' [dragula]='\"categories-bag\"'>\r\n            <div *ngFor=\"let task of items\" class=\"task\" (dblclick)=\"openSideBar(task,'info')\">\r\n                <div class=\"task-checkbox-wrapper\">\r\n                    <mat-checkbox color=\"primary\" matTooltip=\"{{ 'Tasks.Execute' | translate }}\" (change)=\"ProgressTask(task)\"  [checked]=\"task.OData__Status == config.tasksStatuses.done\" ></mat-checkbox>\r\n                </div>\r\n                <div class=\"task-title\">{{ task.Title }}</div>\r\n                <div class=\"task-date\" *ngIf=\"task.TaskDueDate != null\">{{ task.TaskDueDate | date:'shortDate' }}</div>\r\n                <div class=\"task-importance\" *ngIf=\"task.sysIDItem && task.sysIDList\" (click)=\"openSideBar(task,'connectedDoc')\">\r\n                    <mat-icon style=\"color:cornflowerblue \">assignment</mat-icon>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"ls-list-preloader\" [@preloaderState]=\"preloaderVisible\">\r\n            <mat-spinner></mat-spinner>\r\n        </div>\r\n    </div>\r\n</mat-sidenav-container>"

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/lsdocstasks.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var LSDocsTasksComponent = /** @class */ (function () {
    function LSDocsTasksComponent(generalService, _eventEmitter, route, router, config, translate) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.route = route;
        this.router = router;
        this.config = config;
        this.translate = translate;
        this.items = new Array();
        this.user = null;
        this.tasksSidebarOpened = false;
        this.tasksSidebarType = null;
        this.eventEmitter = this._eventEmitter;
        this.taskInfoViewed = null;
        this.subscriptions = [];
        this.preloaderVisible = "active";
    }
    LSDocsTasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.route.params.subscribe(function (params) {
            _this.generalService.getCurrentUser().then(function (user) {
                _this.user = user;
                _this.updateView();
            });
        }));
        this.subscriptions.push(this.eventEmitter.updateTasks.subscribe(function () {
            _this.updateView();
            _this.tasksSidebarOpened = false;
        }));
    };
    LSDocsTasksComponent.prototype.updateView = function (status) {
        var _this = this;
        this.items = [];
        this.preloaderVisible = 'active';
        // return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/lsdocs?status=${status?status : this.config.lsdocsStatuses.new}`).then(data=>{
        return this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/LSDocsTasksTest?filter={\"AssignetToEmail\":\"" + this.user.Email + "\",\"OData__Status\":{\"$eq\":\"" + (status ? status : this.config.lsdocsStatuses.new) + "\"}}&orderby=Created desc").then(function (data) {
            _this.preloaderVisible = 'inactive';
            if (data.ok == false)
                console.log('getLSDocsTasks error:', data.json());
            else {
                _this.items = data.map(function (task) {
                    task.AssignedTo = {
                        Title: task.AssignetToTitle,
                        EMail: task.AssignetToEmail
                    };
                    return task;
                });
            }
        });
    };
    LSDocsTasksComponent.prototype.ProgressTask = function (task) {
        var _this = this;
        return this.toDoneTask(task, 'Done', '').then(function () {
            _this.eventEmitter.updateTasks.emit();
        });
    };
    //#region toDoneTask
    LSDocsTasksComponent.prototype.toDoneTask = function (task, taskResult, comment) {
        var _this = this;
        var datePipe = new common_1.DatePipe('ru');
        taskResult = taskResult || 'Done';
        var EvanteDate = datePipe.transform(Date.now(), "y-MM-dd HH:mm:ss"); // moment.utc().format("YYYY-MM-DD HH:mm:ss");
        var StartDate = datePipe.transform(task.StartDate, 'dd.MM.y HH:mm:ss'); //moment.utc(task.startDate).format("DD.MM.YYYY HH:mm:ss");
        var DueDate = datePipe.transform(task.TaskDueDate, 'dd.MM.y'); //moment.utc(task.TaskDueDate).format("DD.MM.YYYY");
        return (task.ContentType.Name == 'LSTaskResolution' ?
            this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/lsdocs/checkResolution", {
                sysIDItem: task.sysIDItem,
                sysIDList: task.sysIDList,
                ContentType: 'LSResolutionTaskToDo',
                CurentUserEmail: this.user.Email
            })
                .then(function (response) {
                if (response.ok == false)
                    return Promise.reject('get Resolution error');
                if (response.length == 0) {
                    alert('You have not done any reassignmen!');
                    return Promise.reject('there is no one resolution');
                }
            })
            : Promise.resolve())
            .then(function (response) {
            return _this.translate.getTranslation(_this.translate.currentLang).toPromise();
        })
            .then(function (loc) {
            var taskEvent = loc.LSDocs.Alert60;
            var EventType = 'EventDoneTask';
            if (task.ContentType.Name == 'LSTaskAppruve') {
                if (taskResult == 'Back') {
                    taskEvent = loc.LSDocs.Alert66;
                    EventType = 'EventBackTask';
                }
                else {
                    taskEvent = loc.LSDocs.Alert62;
                }
            }
            if (task.ContentType.Name == 'LSSTaskAdd') {
                EventType = 'EventDoneTask EventAddTask';
            }
            if (taskResult == 'Delegate') {
                taskEvent = _this.user.Name + " " + loc.LSDocs.Alert67;
                EventType = 'EventDelegateTask';
            }
            var toHistory = {
                sysIDList: task.sysIDList,
                sysIDItem: task.sysIDItem,
                EventTypeUser: EventType,
                itemData: {
                    ItemId: task.sysIDItem,
                    ListID: task.sysIDList,
                    ItemTitle: "-",
                    ListTitle: "-",
                    EventType: 'Task'
                },
                HistoryArray: [{
                        EventType: EventType,
                        Event: taskEvent,
                        NameExecutor: _this.user.Name,
                        NameAuthore: task.TaskAuthore.Title,
                        TaskTitle: task.Title,
                        StartDate: StartDate,
                        DueDate: DueDate,
                        StartDateSort: datePipe.transform(task.StartDate, 'yMMdd'),
                        DueDateSort: datePipe.transform(task.TaskDueDate, 'yMMdd'),
                        EvanteDate: EvanteDate,
                        Comments: comment || '',
                        TaskType: task.ContentType.Name,
                        TaskResult: taskResult,
                        EndTask: '',
                        ExecutorEmail: _this.user.Email,
                        AthoreEmail: task.TaskAuthore.EMail,
                        ItemId: task.sysIDItem,
                        ListID: task.sysIDList,
                        TaskID: task.ID
                    }],
                HistoryType: 'HistoryDataForUser'
            };
            var transitTaskData = {
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
                    UserLang: 'LS' + (_this.translate.currentLang == "en" ? "us" : _this.translate.currentLang).toUpperCase(),
                    Alert57: loc.LSDocs.Alert57,
                    Alert58: loc.LSDocs.Alert58,
                    Alert60: loc.LSDocs.Alert60,
                    Alert62: loc.LSDocs.Alert62,
                    Alert66: loc.LSDocs.Alert66
                }
            };
            var updateTaskData = {
                "__metadata": {
                    "type": "SP.Data.LSTasksListItem"
                },
                OData__Status: 'Done',
                OData__Comments: comment || '',
                TaskResults: taskResult // 'RefuseTask' || 'Done'
            };
            var data = {
                updateTaskData: updateTaskData,
                toHistory: toHistory,
                transitTaskData: transitTaskData
            };
            return _this.generalService.httpPost(_this.generalService.serverAPIUrl + "/_api/lsdocs/" + task.ID + "/done", data).then(function (response) {
                if (response.ok == false)
                    throw response.json();
                return true;
            });
        })
            .catch(function (error) {
            console.log('<toDoneLSDocsTasks> error:', error);
            return false;
        });
    };
    //#endregion
    LSDocsTasksComponent.prototype.openSideBar = function (task, sideBarType) {
        this.tasksSidebarType = sideBarType;
        this.tasksSidebarOpened = true;
        this.eventEmitter.onTaskInfoOpen.emit(task);
        this.taskInfoViewed = task;
    };
    LSDocsTasksComponent.prototype.onTaskSidenavClose = function () {
        this.tasksSidebarOpened = false;
        if (this.router.url.indexOf('/tasks/create') != -1) {
            this.router.navigate(['/tasks/my']);
        }
    };
    LSDocsTasksComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    LSDocsTasksComponent = __decorate([
        core_1.Component({
            selector: 'lsdocstasks',
            template: __webpack_require__("../../../../../src/app/components/lsdocstasks/lsdocstasks.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/lsdocstasks/lsdocstasks.component.css")],
            animations: [
                animations_1.trigger('preloaderState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        visibility: 'hidden'
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        visibility: 'visible'
                    })),
                    animations_1.transition('* => *', animations_1.animate('500ms ease-out')),
                ])
            ]
        }),
        __param(4, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            router_1.ActivatedRoute,
            router_1.Router, Object, ng2_translate_1.TranslateService])
    ], LSDocsTasksComponent);
    return LSDocsTasksComponent;
}());
exports.LSDocsTasksComponent = LSDocsTasksComponent;


/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/sub-tasks/sub-tasks.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"work-task-wrapper\">\r\n    <button *ngIf=\"!revealedForm\" mat-button color=\"primary\" class=\"openFormButton\" (click)=\"revealedForm = !revealedForm\" >{{ (contentType == \"LSTaskResolution\" ? 'Tasks.NewResolution' : 'Tasks.NewTask' ) | translate }}</button>\r\n    <form *ngIf=\"revealedForm\" class=\"newTaskForm\" #editTaskForm=\"ngForm\">\r\n        <mat-form-field>\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.Name' | translate }}\" [(ngModel)]=\"newTaskTitle\" name=\"Title\" #Title=\"ngModel\"  [disabled]=\"userRole == 'assignedTo'\">\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.EndingDate' | translate }}\" [matDatepicker]=\"dueDatePicker\" [min]=\"minDate\" [(ngModel)]=\"newTaskDueDate\" name=\"DueDate\" #DueDate=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"dueDatePicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dueDatePicker></mat-datepicker>\r\n        </mat-form-field>\r\n        <mat-form-field style=\"padding-top: 16px;\">\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.Executor' | translate }}\" (change)=\"validatePeoplepicker($event, editTaskForm)\" (keyup)=\"onPeoplepickerValueChange($event)\" [matAutocomplete]=\"userAuto\" [(ngModel)]=\"newTaskAssignedTo\" name=\"AssignedTo\" #AssignedTo=\"ngModel\" required>\r\n            <mat-autocomplete #userAuto=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let user of filteredUsers\" [value]=\"user.Name\">\r\n                    {{ user.Name }}\r\n                </mat-option>\r\n            </mat-autocomplete>\r\n        </mat-form-field>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" class=\"lsdocsButtons\" (click)=\"addNewSubTask()\" >{{ 'Save' | translate }}</button>\r\n    </form>\r\n    <div *ngIf=\"revealedForm\" class=\"line\" ></div>\r\n    <div *ngIf=\"preloaderVisible == 'inactive' \" >\r\n        <div *ngFor=\"let subtask of SubTasks\" class='subtasks-container'>\r\n            <label class=\"user_avatar\" >\r\n                <img [src]=\"subtask.authorAvatarUrl\" />\r\n            </label>\r\n            <div class=\"subtask-content\">\r\n                <div>\r\n                    <span class=\"left\">\r\n                        {{subtask.TaskAuthore.Title}}\r\n                    </span>\r\n                    <span class=\"right\">\r\n                        {{subtask.AssignedTo.Title}}\r\n                    </span>\r\n                </div>\r\n                <div>\r\n                    <span class=\"left\"><label>{{subtask.Title}}</label></span>\r\n                    <span class=\"right\">\r\n                        {{subtask.DueDate_view}}\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <label class=\"user_avatar\">\r\n                <img [src]=\"subtask.assignedToAvatarUrl\" />\r\n            </label>\r\n        </div>\r\n    </div>\r\n    <div *ngIf=\"this.preloaderVisible == 'active' \" class=\"ls-list-preloader\" [@preloaderState]=\"preloaderVisible\">\r\n        <mat-spinner style=\"margin: auto;\"></mat-spinner>\r\n    </div>     \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/sub-tasks/sub-tasks.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".work-task-wrapper {\n  width: 100%;\n  padding: 20px;\n  height: 100%;\n  position: relative; }\n  .work-task-wrapper mat-form-field, .work-task-wrapper mat-select {\n    width: 100%; }\n  .work-task-wrapper .task-header {\n    padding: 30px; }\n    .work-task-wrapper .task-header .author-avatar {\n      background-position: center;\n      background-repeat: no-repeat;\n      background-size: cover;\n      background-color: grey;\n      width: 55px;\n      height: 55px;\n      border-radius: 50%;\n      display: inline-block;\n      margin-right: 11px;\n      outline: none !important; }\n    .work-task-wrapper .task-header .author-info {\n      display: inline-block;\n      vertical-align: top;\n      max-width: 70%; }\n      .work-task-wrapper .task-header .author-info .author-name {\n        font-weight: 600;\n        margin-top: 4px;\n        font-size: 19px;\n        color: #444;\n        text-decoration: none; }\n      .work-task-wrapper .task-header .author-info .author-name:hover {\n        color: black; }\n      .work-task-wrapper .task-header .author-info .task-created {\n        color: #7d7d7d;\n        font-size: 14px;\n        margin-top: 5px; }\n  .work-task-wrapper .lsdocsButtons {\n    margin-top: 15px;\n    margin-right: 15px; }\n  .work-task-wrapper .newTaskForm {\n    padding: 0px !important; }\n  .work-task-wrapper .openFormButton {\n    width: 100%; }\n  .work-task-wrapper .subtasks-container {\n    margin-top: 5px;\n    margin-bottom: 10px;\n    font-size: 0.8rem; }\n    .work-task-wrapper .subtasks-container .user_avatar {\n      display: inline-block; }\n      .work-task-wrapper .subtasks-container .user_avatar img {\n        width: 40px;\n        height: 40px;\n        border-radius: 50%; }\n    .work-task-wrapper .subtasks-container div.subtask-content {\n      display: inline-block;\n      vertical-align: top;\n      width: calc(100% - 110px);\n      padding: 5px 0px 5px 0px; }\n      .work-task-wrapper .subtasks-container div.subtask-content div {\n        display: inline-block;\n        width: 100%; }\n        .work-task-wrapper .subtasks-container div.subtask-content div span {\n          color: grey; }\n        .work-task-wrapper .subtasks-container div.subtask-content div .left {\n          width: 45%;\n          text-align: left; }\n        .work-task-wrapper .subtasks-container div.subtask-content div .right {\n          width: 45%;\n          text-align: right;\n          float: right; }\n        .work-task-wrapper .subtasks-container div.subtask-content div label {\n          font-weight: 500;\n          font-size: 1rem;\n          color: black; }\n  .work-task-wrapper .line {\n    width: 100%;\n    height: 5px;\n    border-radius: 100px;\n    margin-top: 15px;\n    margin-bottom: 15px;\n    background-color: darkcyan; }\n\n@media screen and (max-width: 768px) {\n  .work-task-wrapper .task-header {\n    padding: 25px 20px;\n    height: 90px; }\n  .work-task-wrapper .task-header .author-avatar {\n    width: 40px;\n    height: 40px; }\n  .work-task-wrapper .task-header .author-info .author-name {\n    font-size: 15px; }\n  .work-task-wrapper .task-header .author-info .task-created {\n    font-size: 13px; }\n  .work-task-wrapper .task-importance {\n    right: 5px; }\n  .work-task-wrapper .task-body {\n    height: calc(100% - 90px); }\n  .work-task-wrapper .task-body > > > .mat-tab-label {\n    height: 40px; } }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/sub-tasks/sub-tasks.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var animations_1 = __webpack_require__("../../../animations/esm5/animations.js");
var LSDocsSubTasks = /** @class */ (function () {
    function LSDocsSubTasks(generalService, _eventEmitter, config, translate) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.config = config;
        this.translate = translate;
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
        this.datePipe = new common_1.DatePipe(this.translate.currentLang);
    }
    LSDocsSubTasks.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        });
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=_id,Name").then(function (users) {
            _this.users = users;
        });
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe(function (task) {
            if (task.Source != _this.config.sources.lsdocs || !task.ExternalDoc.props) {
                return _this.ngOnDestroy();
            }
            _this.revealedForm = false;
            _this.newTaskTitle = '';
            _this.newTaskDueDate = null;
            _this.newTaskAssignedTo = '';
            _this.updateView();
        }));
        this.translate.getTranslation(this.translate.currentLang).toPromise().then(function (loc) { return _this.loc = loc; });
        this.updateView();
    };
    LSDocsSubTasks.prototype.updateView = function () {
        var _this = this;
        this.preloaderVisible = 'active';
        return this.getSubTasks().then(function () {
            _this.preloaderVisible = 'inactive';
        });
    };
    LSDocsSubTasks.prototype.getAvatar = function (email, dest_img) {
        dest_img = "/src/img/logo.png";
        return this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=Email,_id,Company&filter={\"Email\" :\"" + email + "\"}")
            .then(function (res) {
            res[0] && res[0]._id && (dest_img = "/src/img/avatars/" + res[0].Company._docId + "/" + res[0]._id + ".jpeg");
        });
    };
    LSDocsSubTasks.prototype.getSubTasks = function () {
        var _this = this;
        return this.generalService.httpPost(this.config.serverAPIUrl + "/_api/lsdocs/subtasks/" + this.contentType, this.task)
            .then(function (items) {
            _this.SubTasks = items.filter(function (item) {
                if (_this.task.Id != item.sysIDParentMainTask && (_this.contentType != "LSTaskResolution"))
                    return false;
                item.DueDate_view = _this.datePipe.transform(item.TaskDueDate, "EE, dd MMMM");
                item.assignedToAvatarUrl = '';
                item.authorAvatarUrl = '';
                _this.getAvatar(item.AssignedTo.EMail, item.assignedToAvatarUrl);
                _this.getAvatar(item.TaskAuthore.EMail, item.authorAvatarUrl);
                return item;
            });
        })
            .catch(function (error) {
            console.error('<Get Subtasks> error:', error);
        });
    };
    LSDocsSubTasks.prototype.addNewSubTask = function () {
        var _this = this;
        var user;
        if (!(this.newTaskAssignedTo && this.newTaskAssignedTo.trim().length > 0))
            return false;
        if (!(this.newTaskTitle && this.newTaskTitle.trim().length > 0))
            return false;
        if (!(this.newTaskDueDate && this.newTaskDueDate >= this.minDate))
            return false;
        this.users.map(function (item) {
            if (item.Name == _this.newTaskAssignedTo)
                user = item;
        });
        if (!user)
            return false;
        this.createSubTask()
            .then(function () {
            _this.revealedForm = false;
            _this.SubTasks.push({
                Title: _this.newTaskTitle,
                AssignedTo: {
                    EMail: user.Name,
                    Title: user.Name
                },
                TaskAuthore: {
                    EMail: _this.user.Email,
                    Title: _this.user.Name
                },
                assignedToAvatarUrl: '/src/img/avatars/5a3bb56815434f13388f5f43/5a3bb5c015434f13388f5f55.jpeg',
                authorAvatarUrl: '/src/img/avatars/5a3bb56815434f13388f5f43/5a3bb5c015434f13388f5f55.jpeg',
                DueDate_view: _this.datePipe.transform(_this.newTaskDueDate, "EE, dd MMMM")
            });
            _this.newTaskTitle = '';
            _this.newTaskDueDate = null;
            _this.newTaskAssignedTo = '';
            _this.generalService.showNotification("<p>" + _this.loc.Tasks[_this.contentType == "LSTaskResolution" ? 'NewResolution' : 'NewTask'] + " " + _this.loc.Tasks.successAdded + "</p>", 3000);
        });
    };
    LSDocsSubTasks.prototype.createSubTask = function () {
        return Promise.resolve();
    };
    LSDocsSubTasks.prototype.onPeoplepickerValueChange = function () {
        var _this = this;
        if ((this.newTaskAssignedTo != null) && (this.newTaskAssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(function (user) { return user.Name.toLowerCase().indexOf(_this.newTaskAssignedTo.toLowerCase()) === 0; });
        }
        else {
            this.filteredUsers = [];
        }
    };
    LSDocsSubTasks.prototype.validatePeoplepicker = function (event, editTaskForm) {
        var _this = this;
        if ((this.newTaskAssignedTo != null) && (this.newTaskAssignedTo.length > 0)) {
            if (this.users.filter(function (user) { return user.Name == _this.newTaskAssignedTo; }).length != 1) {
                editTaskForm.form.controls.AssignedTo.setErrors({ 'incorrect': true });
            }
        }
        else {
            editTaskForm.form.controls.AssignedTo.setErrors({ 'incorrect': true });
        }
    };
    LSDocsSubTasks.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LSDocsSubTasks.prototype, "task", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LSDocsSubTasks.prototype, "contentType", void 0);
    LSDocsSubTasks = __decorate([
        core_1.Component({
            selector: 'lsdocs-subtasks',
            template: __webpack_require__("../../../../../src/app/components/lsdocstasks/sub-tasks/sub-tasks.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/lsdocstasks/sub-tasks/sub-tasks.component.scss")],
            animations: [
                animations_1.trigger('preloaderState', [
                    animations_1.state('inactive', animations_1.style({
                        opacity: '0',
                        visibility: 'hidden'
                    })),
                    animations_1.state('active', animations_1.style({
                        opacity: '1',
                        visibility: 'visible'
                    })),
                    animations_1.transition('* => *', animations_1.animate('0ms ease-out')),
                ])
            ]
        }),
        __param(2, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService, Object, ng2_translate_1.TranslateService])
    ], LSDocsSubTasks);
    return LSDocsSubTasks;
}());
exports.LSDocsSubTasks = LSDocsSubTasks;


/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/work-task/work-task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".work-task-wrapper{\r\n    width: 100%;\r\n    /* padding: 20px; */\r\n}\r\n.work-task-wrapper mat-form-field,\r\n.work-task-wrapper mat-select{\r\n    width: 100%;\r\n}\r\n\r\n.work-task-wrapper{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n.work-task-wrapper .task-header{\r\n    padding: 30px;\r\n    /* height: 120px; */\r\n}\r\n.work-task-wrapper .task-header .author-avatar{\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-color: grey;\r\n    width: 55px;\r\n    height: 55px;\r\n    border-radius: 50%;\r\n    display: inline-block;\r\n    margin-right: 11px;\r\n    outline: none!important;\r\n}\r\n.work-task-wrapper .task-header .author-info{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    max-width: 70%;\r\n}\r\n.work-task-wrapper .task-header .author-info .author-name{\r\n    font-weight: 600;\r\n    margin-top: 4px;\r\n    font-size: 19px;\r\n    color: #444;\r\n    text-decoration: none;\r\n}\r\n.work-task-wrapper .task-header .author-info .author-name:hover{\r\n    color: black;\r\n}\r\n.work-task-wrapper .task-header .author-info .task-created{\r\n    color: #7d7d7d;\r\n    font-size: 14px;\r\n    margin-top: 5px;\r\n}\r\n.work-task-wrapper .lsdocsButtons{\r\n    margin-top: 15px;\r\n    margin-right: 15px;\r\n}\r\n\r\n.task-body >>> form{\r\n    padding:20px;\r\n}\r\n\r\n@media screen and (max-width: 768px) {\r\n    .work-task-wrapper .task-header {\r\n        padding: 25px 20px;\r\n        height: 90px;\r\n    }\r\n    .work-task-wrapper .task-header .author-avatar{\r\n        width: 40px;\r\n        height: 40px;\r\n    }\r\n    .work-task-wrapper .task-header .author-info .author-name{\r\n        font-size: 15px;\r\n    }\r\n    .work-task-wrapper .task-header .author-info .task-created{\r\n        font-size: 13px;\r\n    }\r\n    .work-task-wrapper .task-importance{\r\n        right: 5px;\r\n    }\r\n    .work-task-wrapper .task-body{\r\n        height: calc(100% - 90px);\r\n    }\r\n    .work-task-wrapper .task-body >>> .mat-tab-label{\r\n        height: 40px;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/work-task/work-task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"work-task-wrapper\">\r\n    <div class=\"task-header\">\r\n        <a class=\"author-avatar\" [ngStyle]=\"{'background-image': 'url(' + authorAvatarUrl + ')'}\" ></a>\r\n        <div class=\"author-info\">\r\n            <a class=\"author-name\">{{ task.TaskAuthore.Title }}</a>\r\n            <div class=\"task-created\">{{ 'LSDocs.Author' | translate  }}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"task-header\">\r\n        <a class=\"author-avatar\" [ngStyle]=\"{'background-image': 'url(' + assignedToAvatarUrl + ')'}\" ></a>\r\n        <div class=\"author-info\">\r\n            <a class=\"author-name\">{{ task.AssignedTo.Title }}</a>\r\n            <div class=\"task-created\">{{ 'LSDocs.Assigned' | translate }}</div>\r\n        </div>\r\n    </div>\r\n    <mat-tab-group class=\"task-body\">\r\n        <mat-tab label=\"{{ 'Tasks.Details' | translate }}\">\r\n            <form > \r\n                <mat-form-field>\r\n                    <input matInput readonly type=\"text\" placeholder=\"{{ 'Tasks.Name' | translate }}\" [(ngModel)]=\"task.Title\" name=\"Title\" #Title=\"ngModel\"  [disabled]=\"userRole == 'assignedTo'\">\r\n                </mat-form-field>\r\n                <mat-form-field *ngIf=\"task.TaskDescription\" class=\"example-full-width\">\r\n                    <input matInput readonly type=\"text\" placeholder=\"{{ 'Tasks.Description' | translate }}\" [(ngModel)]=\"task.TaskDescription\" name=\"Description\" #Description=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <input matInput readonly type=\"text\" placeholder=\"{{ 'Tasks.StartDate' | translate }}\"  value=\"{{task.StartDate | date:'EEE, dd MMM' }}\"  [disabled]=\"userRole == 'assignedTo'\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                    <input matInput readonly type=\"text\" placeholder=\"{{ 'Tasks.EndingDate' | translate }}\"  value=\"{{task.TaskDueDate | date:'EEE, dd MMM' }}\" [disabled]=\"userRole == 'assignedTo'\">\r\n                </mat-form-field>\r\n                <mat-form-field>\r\n                        <!-- [(ngModel)]=\"task.OData__Status\" name=\"Status\" #Status=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\" -->\r\n                    <input matInput *ngIf=\"task.OData__Status == config.lsdocsStatuses.new\"  readonly type=\"text\" placeholder=\"{{ 'Tasks.Status' | translate }}\" value=\"{{ 'Tasks.New' | translate }}\" >\r\n                    <input matInput *ngIf=\"task.OData__Status == config.lsdocsStatuses.inprogress\"  readonly type=\"text\" placeholder=\"{{ 'Tasks.Status' | translate }}\" value=\"{{ 'Tasks.InProgress' | translate }}\" >\r\n                    <input matInput *ngIf=\"task.OData__Status == config.lsdocsStatuses.done\"  readonly type=\"text\" placeholder=\"{{ 'Tasks.Status' | translate }}\" value=\"{{ 'Tasks.Done' | translate }}\" >\r\n                    <input matInput *ngIf=\"!task.OData__Status\"  readonly type=\"text\" placeholder=\"{{ 'Tasks.Status' | translate }}\" value=\"Unset status\" >\r\n                </mat-form-field>\r\n                <mat-form-field class=\"example-full-width\">\r\n                    <textarea matInput rows=\"5\" placeholder=\"{{ 'LSDocs.Comment' | translate }}\" [(ngModel)]=\"comment\" name=\"Comment\" #Comment=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\"></textarea>\r\n                </mat-form-field>\r\n                <button mat-raised-button color=\"primary\" type=\"submit\" class=\"lsdocsButtons\" *ngIf=\"task.OData__Status == config.lsdocsStatuses.new\" (click)=\"ProgressTask(task)\" >{{ 'LSDocs.ToWork' | translate }}</button>\r\n                <ng-container *ngIf=\"task.OData__Status != config.lsdocsStatuses.done && task.sysTaskLevel == 1\" >\r\n                    <button mat-raised-button color=\"primary\" type=\"submit\" class=\"lsdocsButtons\" *ngIf=\"task.ContentType.Name == 'LSTaskAppruve' || task.ContentType.Name == 'LSTaskAgreement' \" (click)=\"DoneTask(task,'Back')\" >{{ 'LSDocs.Reject' | translate }}</button>\r\n                    <button mat-raised-button color=\"primary\" type=\"submit\" class=\"lsdocsButtons\" *ngIf=\"task.ContentType.Name == 'LSTaskPreparetion' \" (click)=\"DoneTask(task,'RefuseTask')\" >{{ 'LSDocs.Cancel' | translate }}</button>        \r\n                </ng-container>\r\n                <button mat-raised-button color=\"primary\" type=\"submit\" class=\"lsdocsButtons\" *ngIf=\"task.OData__Status != config.lsdocsStatuses.done && task.ContentType.Name == 'LSTaskAppruve'\" (click)=\"DoneTask(task,'Done')\" >{{ 'LSDocs.Approve' | translate }}</button>\r\n                <button mat-raised-button color=\"primary\" type=\"submit\" class=\"lsdocsButtons\" *ngIf=\"task.OData__Status != config.lsdocsStatuses.done && task.ContentType.Name != 'LSTaskAppruve'\" (click)=\"DoneTask(task,'Done')\" >{{ 'LSDocs.Execute' | translate }}</button>\r\n            </form>\r\n        </mat-tab>\r\n        <mat-tab label=\"{{ 'Tasks.SubTasks' | translate }}\">\r\n           <lsdocs-subtasks [task]=\"task\" contentType=\"LSTest\" ></lsdocs-subtasks>\r\n        </mat-tab>\r\n        <mat-tab  label=\"{{ 'Tasks.Reassignment' | translate }}\" *ngIf=\"task.ContentType.Name == 'LSTaskResolution' \" >\r\n            <lsdocs-subtasks [task]=\"task\" contentType=\"LSTaskResolution\" ></lsdocs-subtasks>\r\n        </mat-tab>\r\n    </mat-tab-group>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/lsdocstasks/work-task/work-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var WorkLSDocsComponent = /** @class */ (function () {
    function WorkLSDocsComponent(generalService, _eventEmitter, config, translate) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.config = config;
        this.translate = translate;
        this.subscriptions = [];
        this.eventEmitter = this._eventEmitter;
        this.user = null;
        this.userRole = null; //assignedTo';
        this.comment = "";
    }
    WorkLSDocsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        });
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe(function (task) {
            _this.comment = '';
            if (task.Source != _this.config.sources.lsdocs || !task.ExternalDoc.props) {
                return _this.ngOnDestroy();
            }
            _this.task = task.ExternalDoc.props;
            _this.getAvatars(_this.task.TaskAuthore.EMail, _this.task.AssignedTo.EMail);
        }));
        this.getAvatars(this.task.TaskAuthore.EMail, this.task.AssignedTo.EMail);
    };
    WorkLSDocsComponent.prototype.getAvatars = function (authoreEmail, assignedToEmail) {
        var _this = this;
        this.authorAvatarUrl = "/src/img/logo.png";
        this.assignedToAvatarUrl = "/src/img/logo.png";
        return Promise.all([
            this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=Email,_id,Company&filter={\"Email\" :\"" + assignedToEmail + "\"}"),
            this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=Email,_id,Company&filter={\"Email\" : \"" + authoreEmail + "\"}")
        ])
            .then(function (res) {
            res[0][0] && res[0][0]._id && (_this.assignedToAvatarUrl = "/src/img/avatars/" + res[0][0].Company._docId + "/" + res[0][0]._id + ".jpeg");
            res[1][0] && res[1][0]._id && (_this.authorAvatarUrl = "/src/img/avatars/" + res[1][0].Company._docId + "/" + res[1][0]._id + ".jpeg");
        });
    };
    WorkLSDocsComponent.prototype.DoneTask = function (task, taskResult) {
        var _this = this;
        var comment = this.comment || '';
        this.toDoneTask(task, taskResult, comment).then(function () {
            _this.eventEmitter.updateTasks.emit();
        });
    };
    WorkLSDocsComponent.prototype.ProgressTask = function (task) {
        var _this = this;
        var comment = this.comment || '';
        this.toWorkTask(task, comment).then(function () {
            _this.eventEmitter.updateTasks.emit();
        });
    };
    //#region toWorkTask
    WorkLSDocsComponent.prototype.toWorkTask = function (task, comment) {
        var _this = this;
        var updateTaskData = {
            "__metadata": {
                "type": "SP.Data.LSTasksListItem"
            },
            OData__Status: 'In Progress',
            AssignetToEmail: this.user.Email,
            AssignetToTitle: this.user.Name,
            AssignedToId: task.AssignedToId // this.userAAAA._id 
        };
        var datePipe = new common_1.DatePipe('ru');
        var EvanteDate = datePipe.transform(Date.now(), 'y-MM-dd HH:mm:ss'); //moment.utc().format("YYYY-MM-DD HH:mm:ss");//2017-06-01 04:32:35
        var StartDate = datePipe.transform(task.StartDate, 'dd.MM.y HH:mm:ss'); //moment.utc(task.StartDate).format("DD.MM.YYYY HH:mm:ss");
        var DueDate = datePipe.transform(task.TaskDueDate, 'dd.MM.y'); //moment.utc(task.TaskDueDate).format("DD.MM.YYYY");
        return this.translate.getTranslation(this.translate.currentLang).toPromise().then(function (loc) {
            var toHistory = {
                sysIDList: task.sysIDList,
                sysIDItem: task.sysIDItem,
                EventTypeUser: 'TaskInWork',
                itemData: {
                    ItemId: task.sysIDItem,
                    ListID: task.sysIDList,
                    ItemTitle: "-",
                    ListTitle: "-",
                    EventType: 'Task'
                },
                HistoryArray: [{
                        EventType: 'EventInWorkTask',
                        Event: loc.LSDocs.Alert59,
                        NameExecutor: _this.user.Name,
                        NameAuthore: task.TaskAuthore.Title,
                        TaskTitle: task.Title,
                        StartDate: StartDate,
                        DueDate: DueDate,
                        EvanteDate: EvanteDate,
                        Comments: comment || '',
                        ExecutorEmail: _this.user.Email,
                        AthoreEmail: task.TaskAuthore.EMail,
                        TaskID: task.ID
                    }],
                HistoryType: 'HistoryDataForUser'
            };
            var data = {
                updateTaskData: updateTaskData,
                toHistory: toHistory
            };
            return _this.generalService.httpPost(_this.generalService.serverAPIUrl + "/_api/lsdocs/" + task.ID, data).then(function (response) {
                console.log('lsdocstasks task InProgress:', response);
            });
        });
    };
    //#endregion
    WorkLSDocsComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WorkLSDocsComponent.prototype, "task", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], WorkLSDocsComponent.prototype, "toDoneTask", void 0);
    WorkLSDocsComponent = __decorate([
        core_1.Component({
            selector: 'work-task',
            template: __webpack_require__("../../../../../src/app/components/lsdocstasks/work-task/work-task.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/lsdocstasks/work-task/work-task.component.css")]
        }),
        __param(2, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService, Object, ng2_translate_1.TranslateService])
    ], WorkLSDocsComponent);
    return WorkLSDocsComponent;
}());
exports.WorkLSDocsComponent = WorkLSDocsComponent;


/***/ }),

/***/ "../../../../../src/app/components/profile/profile-info/profile-info.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".component-container{\r\n    background-color: white;\r\n}\r\n.profile-wrapper{\r\n    max-width: 100%;\r\n    width: 300px;\r\n    padding: 20px;\r\n}\r\n.current-user-big-avatar{\r\n    width: 100%;\r\n    height: 250px;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-color: grey;\r\n}\r\n.current-user-name{\r\n    font-size: 18px;\r\n    color: #1e88e5;\r\n}\r\n.current-user-name,\r\n.current-user-dep,\r\n.current-user-job-title,\r\n.current-user-contacts,\r\n.profile-settings-link{\r\n    padding: 10px 0;\r\n}\r\n.current-user-dep b,\r\n.current-user-job-title b,\r\n.current-user-contacts b{\r\n    margin-bottom: 5px;\r\n}\r\n.profile-settings-link a{\r\n    outline: none;\r\n    text-decoration: none;\r\n}\r\n.profile-settings-link mat-icon{\r\n    vertical-align: middle;\r\n    font-size: 20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/profile/profile-info/profile-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component-container\" *ngIf=\"user\">\r\n    <div class=\"profile-wrapper\">\r\n        <div class=\"current-user-big-avatar\" [ngStyle]=\"{'background-image': 'url(' + avatarUrl + ')'}\"></div>\r\n        <div class=\"current-user-name\">{{user.Name}}</div>\r\n        <div class=\"current-user-dep\" *ngIf=\"user.Department != null\"><b>{{'Profile.Info.Departament'| translate}}</b><br>{{user.Department}}</div>\r\n        <div class=\"current-user-job-title\" *ngIf=\"user.JobTitle != null\"><b>{{'Profile.Info.Position'| translate}}</b><br>{{user.JobTitle}}</div>\r\n        <div class=\"current-user-contacts\" *ngIf=\"user.Phone != null\"><b>{{'Profile.Info.Contacts'| translate}}</b><br>{{user.Phone}}</div>\r\n        <div class=\"profile-settings-link\" *ngIf=\"isCurrentUserProfile\">\r\n            <a routerLink=\"/profile-settings\" routerLinkActive=\"active\">{{ 'Profile.Info.ToSettings' | translate }} <mat-icon class=\"mat-18\">arrow_forward</mat-icon></a>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/profile/profile-info/profile-info.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var ProfileAppInfoComponent = /** @class */ (function () {
    function ProfileAppInfoComponent(generalService, _eventEmitter, route, router) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.route = route;
        this.router = router;
        this.avatarUrl = '#';
        this.eventEmitter = this._eventEmitter;
        this.profileId = null;
        this.user = null;
        this.currentUser = null;
        this.subscriptions = [];
        this.isCurrentUserProfile = null;
    }
    ProfileAppInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.route.params.subscribe(function (params) {
            //Mode is for parametr in url (my, today, new, create)
            _this.profileId = params["id"];
            var promiseArr = [];
            promiseArr.push(_this.generalService.httpGet(_this.generalService.serverAPIUrl + "/_api/Users/" + _this.profileId).then(function (user) {
                _this.user = user;
                _this.avatarUrl = "/src/img/avatars/" + _this.user["Company"]["_docId"] + "/" + _this.user["_id"] + ".jpeg";
            }));
            promiseArr.push(_this.generalService.getCurrentUser().then(function (user) {
                _this.currentUser = user;
            }));
            Promise.all(promiseArr).then(function () {
                _this.isCurrentUserProfile = _this.user["_id"] == _this.currentUser["_id"];
            });
        }));
    };
    ProfileAppInfoComponent = __decorate([
        core_1.Component({
            selector: 'profile-info',
            template: __webpack_require__("../../../../../src/app/components/profile/profile-info/profile-info.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/profile/profile-info/profile-info.component.css")]
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ProfileAppInfoComponent);
    return ProfileAppInfoComponent;
}());
exports.ProfileAppInfoComponent = ProfileAppInfoComponent;


/***/ }),

/***/ "../../../../../src/app/components/profile/profile-settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".profile-settings-wrapper{\r\n    background-color: white;\r\n    padding: 20px;\r\n}\r\n.pattern-preview-wrapper{\r\n    max-width: 100%;\r\n    width: 500px;\r\n    font-size: 0;\r\n}\r\n.pattern-preview{\r\n    margin-right: 10px;\r\n    margin-bottom: 10px;\r\n    height: 90px;\r\n    width: 90px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n}\r\n.pattern-preview:hover{\r\n    outline: 1px solid #444;\r\n}\r\n.task-categories-wrapper mat-chip mat-icon{\r\n    margin-left: 3px;\r\n    width: 20px;\r\n    height: 20px;\r\n    font-size: 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.connection-settings-form{\r\n    margin-top:15px;\r\n    padding:10px;\r\n    background-color: rgba(123,123,123,0.2);\r\n}\r\n\r\n.url-input{\r\n    width: 100%;\r\n    font-size: 0.9rem;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/profile/profile-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"component-container\">\r\n    <h2 style=\"color: #444; font-weight: 200;\">\r\n       {{ 'Profile.Settings.SettingsProfile' | translate }}\r\n    </h2>\r\n    <div class=\"profile-settings-wrapper\">\r\n        <p>{{ 'Profile.Settings.SelectBackImage' | translate }}</p>\r\n        <div class=\"pattern-preview-wrapper\">\r\n            <div class=\"pattern-preview\" style=\"background-color:#ececec;\" (click)=\"setPreviewPattern($event, '')\"></div>\r\n            <div class=\"pattern-preview\" *ngFor=\"let patternUrl of availablePatterns\" [ngStyle]=\"{'background-image': 'url(' + patternUrl + ')'}\" (click)=\"setPreviewPattern($event, patternUrl)\"></div>\r\n        </div>\r\n        <p style=\"margin-top:30px;\">{{ 'Profile.Settings.EditPersonalTaskCategory' | translate }}</p>\r\n        <div class=\"task-categories-wrapper\">\r\n            <form (submit)=\"onNewTaskCategoryAdd()\">\r\n                <mat-form-field>\r\n                    <input matInput type=\"text\" placeholder=\"{{ 'Create' | translate }} {{ 'Profile.Settings.category' | translate }}...\" [(ngModel)]=\"newTaskCategory\" name=\"newCategoryTitle\" required>\r\n                </mat-form-field>\r\n                <button mat-icon-button type=\"submit\">\r\n                    <mat-icon>done</mat-icon>\r\n                </button>\r\n            </form>\r\n            <mat-chip-list *ngIf=\"userTaskCategories != null\">\r\n                <mat-chip *ngFor=\"let userTaskCategory of userTaskCategories\">\r\n                    {{ userTaskCategory.Title }}\r\n                    <mat-icon (click)=\"deleteTaskCategory($event, userTaskCategory)\">close</mat-icon>\r\n                </mat-chip>\r\n            </mat-chip-list>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/profile/profile-settings.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
var ProfileSettingsComponent = /** @class */ (function () {
    function ProfileSettingsComponent(generalService, _eventEmitter, translate) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.translate = translate;
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
    ProfileSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
            _this.getCategories();
        });
        this.translate.getTranslation(this.translate.currentLang).toPromise().then(function (loc) { return _this.loc = loc; });
    };
    ProfileSettingsComponent.prototype.getCategories = function () {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/UserTaskCategories?filter={\"Author._docId\":\"" + this.user["_id"] + "\"}&orderby=Created asc").then(function (userTaskCategories) {
            _this.userTaskCategories = userTaskCategories;
        });
    };
    ProfileSettingsComponent.prototype.setPreviewPattern = function (e, url) {
        var _this = this;
        if (url != null) {
            this.generalService.user["SiteBg"] = ((url != null) && (url.length > 0)) ? "url('" + url + "')" : '#ececec';
            var tempEditableItem = {
                SiteBg: this.user["SiteBg"]
            };
            this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Users/" + this.user["_id"], tempEditableItem).then(function () {
                _this.generalService.showNotification("<p>" + _this.loc.Profile.Settings.SelectBackImageSuccess + "</p>", 3000);
            });
        }
    };
    ProfileSettingsComponent.prototype.onNewTaskCategoryAdd = function () {
        var _this = this;
        if ((this.newTaskCategory != null) && (this.newTaskCategory.length > 0)) {
            this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/UserTaskCategories", { Title: this.newTaskCategory }).then(function (response) {
                _this.newTaskCategory = '';
                _this.getCategories();
                _this.eventEmitter.updateTasks.emit();
                _this.generalService.showNotification("<p>" + _this.loc.Profile.Settings.CategoriesChangeSuccess + "</p>");
            });
        }
    };
    ProfileSettingsComponent.prototype.deleteTaskCategory = function (event, userTaskCategory) {
        var _this = this;
        this.generalService.httpDelete(this.generalService.serverAPIUrl + "/_api/UserTaskCategories/" + userTaskCategory["_id"]).then(function (response) {
            _this.getCategories();
            _this.eventEmitter.updateTasks.emit();
            _this.generalService.showNotification("<p>" + _this.loc.Profile.Settings.CategoriesChangeSuccess + "</p>");
        });
    };
    ProfileSettingsComponent = __decorate([
        core_1.Component({
            selector: 'profile-settings',
            styles: [__webpack_require__("../../../../../src/app/components/profile/profile-settings.component.css")],
            template: __webpack_require__("../../../../../src/app/components/profile/profile-settings.component.html"),
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            ng2_translate_1.TranslateService])
    ], ProfileSettingsComponent);
    return ProfileSettingsComponent;
}());
exports.ProfileSettingsComponent = ProfileSettingsComponent;


/***/ }),

/***/ "../../../../../src/app/components/tasks/create-task/create-task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".create-task-wrapper{\r\n    width: 100%;\r\n    padding: 20px;\r\n}\r\n.create-task-wrapper .form-title{\r\n    margin-bottom: 15px;\r\n    font-size: 20px;\r\n    color: #000;\r\n}\r\n.create-task-wrapper mat-form-field,\r\n.create-task-wrapper mat-select{\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/tasks/create-task/create-task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"create-task-wrapper\">\r\n    <div class=\"form-title\">{{ 'Tasks.NewTask' | translate }}</div>\r\n    <form (submit)=\"onNewTaskFormSubmit($event, newTaskForm)\" #newTaskForm=\"ngForm\">\r\n        <mat-form-field>\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.Name' | translate }}\" [(ngModel)]=\"model.Title\" name=\"Title\" #Title=\"ngModel\" required>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <textarea matInput rows=\"5\" placeholder=\"{{ 'Tasks.Description' | translate }}\" [(ngModel)]=\"model.Description\" name=\"Description\" #Description=\"ngModel\"></textarea>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{ 'Tasks.Importance' | translate }}\" [(ngModel)]=\"model.IsImportant\" name=\"IsImportant\" #IsImportant=\"ngModel\">\r\n                <mat-option value=\"true\">{{ 'Tasks.yes' | translate }}</mat-option>\r\n                <mat-option value=\"false\">{{ 'Tasks.no' | translate }}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-form-field style=\"padding-top: 16px;\">\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.Executor' | translate }}\" (change)=\"validatePeoplepicker($event, newTaskForm)\" (keyup)=\"onPeoplepickerValueChange($event)\" [matAutocomplete]=\"userAuto\" [(ngModel)]=\"model.AssignedTo\" name=\"AssignedTo\" #AssignedTo=\"ngModel\" required>\r\n            <mat-autocomplete #userAuto=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let user of filteredUsers\" [value]=\"user.Name\">\r\n                    {{ user.Name }}\r\n                </mat-option>\r\n            </mat-autocomplete>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.EndingDate' | translate }}\" [matDatepicker]=\"dueDatePicker\" [(ngModel)]=\"model.DueDate\" name=\"DueDate\" #DueDate=\"ngModel\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"dueDatePicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dueDatePicker></mat-datepicker>\r\n        </mat-form-field>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!newTaskForm.valid\">{{ 'Create' | translate }}</button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/tasks/create-task/create-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var CreateTaskComponent = /** @class */ (function () {
    function CreateTaskComponent(generalService, _eventEmitter, config) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.config = config;
        this.user = null;
        this.users = new Array();
        this.model = {};
        this.eventEmitter = this._eventEmitter;
        this.subscriptions = [];
    }
    CreateTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=_id,Name").then(function (users) {
            _this.users = users;
        });
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
            _this.model.AssignedTo = _this.user["Name"];
        });
        this.subscriptions.push(this.eventEmitter.onNewTaskBtnClicked.subscribe(function () {
            _this.model.AssignedTo = _this.user["Name"];
        }));
    };
    CreateTaskComponent.prototype.onNewTaskFormSubmit = function (event, newTaskForm) {
        var _this = this;
        event.preventDefault();
        if (!(this.model["Title"] && this.model["Title"].length > 0))
            return;
        var tempCreatableItem = {};
        Object.keys(this.model).forEach(function (objKey) { return tempCreatableItem[objKey] = _this.model[objKey]; });
        tempCreatableItem["AssignedTo"] = { "_col": this.user.Company._docId + "Users", "_docId": this.users.find(function (user) { return user.Name == _this.model["AssignedTo"]; })["_id"] };
        tempCreatableItem["Status"] = this.config.tasksStatuses.new;
        tempCreatableItem["IsImportant"] = (this.model["IsImportant"] == "true");
        if (this.model["DueDate"] != null) {
            this.model["DueDate"].setTime(this.model["DueDate"].getTime() + (12 * 60 * 60 * 1000));
            tempCreatableItem["DueDate"] = this.model["DueDate"].toISOString();
        }
        this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/Tasks", tempCreatableItem).then(function (response) {
            _this.eventEmitter.updateTasks.emit();
        });
        newTaskForm.resetForm();
    };
    CreateTaskComponent.prototype.onPeoplepickerValueChange = function (event) {
        var _this = this;
        if ((this.model.AssignedTo != null) && (this.model.AssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(function (user) { return user.Name.toLowerCase().indexOf(_this.model.AssignedTo.toLowerCase()) === 0; });
        }
        else {
            this.filteredUsers = [];
        }
    };
    CreateTaskComponent.prototype.validatePeoplepicker = function (event, newTaskForm) {
        var _this = this;
        if ((this.model.AssignedTo != null) && (this.model.AssignedTo.length > 0)) {
            if (this.users.filter(function (user) { return user.Name == _this.model.AssignedTo; }).length != 1) {
                newTaskForm.form.controls.AssignedTo.setErrors({ 'incorrect': true });
            }
        }
        else {
            newTaskForm.form.controls.AssignedTo.setErrors({ 'incorrect': true });
        }
    };
    CreateTaskComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    CreateTaskComponent = __decorate([
        core_1.Component({
            selector: 'create-task',
            template: __webpack_require__("../../../../../src/app/components/tasks/create-task/create-task.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/tasks/create-task/create-task.component.css")]
        }),
        __param(2, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService, Object])
    ], CreateTaskComponent);
    return CreateTaskComponent;
}());
exports.CreateTaskComponent = CreateTaskComponent;


/***/ }),

/***/ "../../../../../src/app/components/tasks/discussion-task/discussion-task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".discussion-task-wrapper{\r\n    height: 100%;\r\n}\r\n.task-title{\r\n    border-bottom: 1px solid #e2e2e2;\r\n    padding: 15px 10px;\r\n    font-weight: 600;\r\n}\r\n.messages{\r\n    height: calc( 100% - 135px );\r\n    overflow: auto;\r\n    padding: 20px;\r\n    position: relative;\r\n}\r\n.messages::-webkit-scrollbar\r\n{\r\n    width: 15px;\r\n    background-color: transparent;\r\n}        \r\n.messages::-webkit-scrollbar-thumb\r\n{\r\n    background-color: #a2a2a2;\r\n    border: 5px solid white;\r\n    border-radius: 15px;\r\n}\r\n.messages .message:not(:last-child){\r\n    margin-bottom: 20px;\r\n}\r\n.message.user-author .message-info{\r\n    text-align: right;\r\n}\r\n.message-author{\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    outline: none!important;\r\n    color: #444;\r\n    text-decoration: none;\r\n}\r\n.message-author:hover{\r\n    color: black;\r\n}\r\n.message-date{\r\n    display: inline-block;\r\n    margin-left: 10px;\r\n    color: #7d7d7d;\r\n    font-size: 14px;\r\n}\r\n.message-body{\r\n    margin-top: 12px;\r\n    background-color: #ededed;\r\n    padding: 10px 15px;\r\n    border-radius: 7px;\r\n    position: relative;\r\n    word-break: break-word;\r\n}\r\n.message.user-author .message-body{\r\n    background-color: #6fc8d8;\r\n    color: white;\r\n}\r\n.message-body .message-triangle{\r\n    position: absolute;\r\n    top: -8px;\r\n    left: 40px;\r\n    width: 0;\r\n    height: 0;\r\n    border-left: 10px solid transparent;\r\n    border-right: 10px solid transparent;\r\n    border-bottom: 8px solid #ededed;\r\n}\r\n.message.user-author .message-triangle{\r\n    left: auto;\r\n    right: 40px;\r\n    border-bottom: 8px solid #6fc8d8;\r\n}\r\n.new-task-message-form-wrapper{\r\n    position: absolute;\r\n    bottom: 5px;\r\n    left: 20px;\r\n    right: 20px;\r\n    padding-top: 15px;\r\n    padding-bottom: 15px;\r\n    border-top: 1px solid #e2e2e2;\r\n}\r\n.new-task-message-form{\r\n    padding: 15px;\r\n    padding-bottom: 0;\r\n    border-radius: 7px;\r\n    background-color: #ededed;\r\n    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);\r\n}\r\n.new-task-message-form mat-form-field{\r\n    width: 100%;\r\n}\r\n.new-task-message-form textarea {\r\n    resize: none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/tasks/discussion-task/discussion-task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"discussion-task-wrapper\">\r\n<!--<div class=\"task-title\">{{ task.Title }}</div>-->\r\n<div class=\"messages\">\r\n    <div class=\"message\" *ngFor=\"let message of messages\" [ngClass]=\"(message.Author._docId == user._id) ? 'user-author' : ''\">\r\n        <div class=\"message-info\">\r\n            <a class=\"message-author\" *ngIf=\"message.Author._docId != user._id\" routerLink=\"/profile/{{message.Author._docId}}\">\r\n                {{ message.Author.props.Name }}\r\n            </a>\r\n            <a class=\"message-author\" *ngIf=\"message.Author._docId == user._id\" routerLink=\"/profile/{{message.Author._docId}}\">\r\n                {{ 'You' | translate }}\r\n            </a>\r\n            <div class=\"message-date\">\r\n                {{ message.Created | date: 'short'}}\r\n                <!-- \"dd.MM.yyyy HH:mm\"  -->\r\n            </div>\r\n        </div>\r\n        <div class=\"message-body\">\r\n            <div class=\"message-triangle\"></div>\r\n            {{ message.Body }}\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"new-task-message-form-wrapper\">\r\n    <form class=\"new-task-message-form\" (submit)=\"onNewTaskMessageFormSubmit($event, newTaskMessageForm)\" (keyup.enter)=\"onNewTaskMessageFormSubmit($event, newTaskMessageForm)\" #newTaskMessageForm=\"ngForm\">\r\n        <mat-form-field>\r\n            <textarea matInput rows=\"2\" placeholder=\"{{ 'EnterMessageText' | translate }}...\" [(ngModel)]=\"model.Body\" name=\"Body\" #Body=\"ngModel\"></textarea>\r\n        </mat-form-field>\r\n        <button type=\"submit\" [hidden]=\"true\"></button>\r\n    </form>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/tasks/discussion-task/discussion-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var DiscussionTaskComponent = /** @class */ (function () {
    function DiscussionTaskComponent(generalService) {
        this.generalService = generalService;
        this.user = {};
        this.task = {};
        this.model = {};
        this.messages = [];
    }
    DiscussionTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        });
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Tasks/" + this.taskId).then(function (task) {
            _this.task = task;
        });
        this.getMessages();
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/TaskDiscussions?filter={\"Task._docId\":\"" + this.taskId + "\"}&expand=Author&orderby=Created asc").then(function (messages) {
            _this.messages = messages;
        });
    };
    DiscussionTaskComponent.prototype.getMessages = function () {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/TaskDiscussions?filter={\"Task._docId\":\"" + this.taskId + "\"}&expand=Author&orderby=Created asc").then(function (messages) {
            _this.messages = messages;
        });
    };
    DiscussionTaskComponent.prototype.onNewTaskMessageFormSubmit = function (event, newTaskMessageForm) {
        var _this = this;
        if ((this.model["Body"] != null) && (this.model["Body"].trim().length > 0)) {
            this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/TaskDiscussions", { 'Body': this.model["Body"], 'Task': { '_docId': this.taskId, '_col': this.user.Company._docId + 'Tasks' } }).then(function (response) {
                _this.getMessages();
            });
        }
        newTaskMessageForm.resetForm();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DiscussionTaskComponent.prototype, "taskId", void 0);
    DiscussionTaskComponent = __decorate([
        core_1.Component({
            selector: 'discussion-task',
            template: __webpack_require__("../../../../../src/app/components/tasks/discussion-task/discussion-task.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/tasks/discussion-task/discussion-task.component.css")]
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService])
    ], DiscussionTaskComponent);
    return DiscussionTaskComponent;
}());
exports.DiscussionTaskComponent = DiscussionTaskComponent;


/***/ }),

/***/ "../../../../../src/app/components/tasks/edit-task/edit-task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".edit-task-wrapper{\r\n    width: 100%;\r\n    padding: 20px;\r\n}\r\n.edit-task-wrapper mat-form-field,\r\n.edit-task-wrapper mat-select{\r\n    width: 100%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/tasks/edit-task/edit-task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"edit-task-wrapper\" *ngIf=\"userRole != null\">\r\n    <form (submit)=\"onEditTaskFormSubmit($event, editTaskForm)\" #editTaskForm=\"ngForm\">\r\n        <mat-form-field>\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.Name' | translate }}\" [(ngModel)]=\"model.Title\" name=\"Title\" #Title=\"ngModel\" required [disabled]=\"userRole == 'assignedTo'\">\r\n        </mat-form-field>\r\n        <mat-form-field class=\"example-full-width\">\r\n            <textarea matInput rows=\"5\" placeholder=\"{{ 'Tasks.Description' | translate }}\" [(ngModel)]=\"model.Description\" name=\"Description\" #Description=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\"></textarea>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{ 'Tasks.Importance' | translate }}\" [(ngModel)]=\"model.IsImportant\" name=\"IsImportant\" #IsImportant=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\">\r\n                <mat-option value=\"true\">{{ 'Tasks.yes' | translate }}</mat-option>\r\n                <mat-option value=\"false\">{{ 'Tasks.no' | translate }}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-form-field style=\"padding-top: 16px;\">\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.Executor' | translate }}\" (change)=\"validatePeoplepicker($event, editTaskForm)\" (keyup)=\"onPeoplepickerValueChange($event)\" [matAutocomplete]=\"userAuto\" [(ngModel)]=\"model.AssignedTo\" name=\"AssignedTo\" #AssignedTo=\"ngModel\" required>\r\n            <mat-autocomplete #userAuto=\"matAutocomplete\">\r\n                <mat-option *ngFor=\"let user of filteredUsers\" [value]=\"user.Name\">\r\n                    {{ user.Name }}\r\n                </mat-option>\r\n            </mat-autocomplete>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <input matInput type=\"text\" placeholder=\"{{ 'Tasks.EndingDate' | translate }}\" [matDatepicker]=\"dueDatePicker\" [(ngModel)]=\"model.DueDate\" name=\"DueDate\" #DueDate=\"ngModel\" [disabled]=\"userRole == 'assignedTo'\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"dueDatePicker\"></mat-datepicker-toggle>\r\n            <mat-datepicker #dueDatePicker></mat-datepicker>\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n            <mat-select placeholder=\"{{ 'Tasks.Status' | translate }}\" [(ngModel)]=\"model.Status\" name=\"Status\" #Status=\"ngModel\" [disabled]=\"(userRole == 'author')&&(user._id != taskBeforeEdit.AssignedTo._docId)\">\r\n                <mat-option value=\"{{config.tasksStatuses.new}}\">{{ 'Tasks.New' | translate }}</mat-option>\r\n                <mat-option value=\"{{config.tasksStatuses.inprogress}}\">{{ 'Tasks.InProgress' | translate }}</mat-option>\r\n                <mat-option value=\"{{config.tasksStatuses.done}}\">{{ 'Tasks.Done' | translate }}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!editTaskForm.valid\" style=\"margin-top: 15px;\">{{ 'Save' | translate }}</button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/tasks/edit-task/edit-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var EditTaskComponent = /** @class */ (function () {
    function EditTaskComponent(generalService, _eventEmitter, config) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.config = config;
        this.taskBeforeEdit = null;
        this.user = null;
        this.users = new Array();
        this.model = {};
        this.eventEmitter = this._eventEmitter;
        this.userRole = null;
    }
    EditTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        var promiseArr = [];
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users?select=_id,Name").then(function (users) {
            _this.users = users;
        });
        promiseArr.push(this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        }));
        promiseArr.push(this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Tasks/" + this.taskId + "?expand=AssignedTo").then(function (task) {
            _this.model = task;
            _this.taskBeforeEdit = {};
            Object.keys(_this.model).forEach(function (objKey) { return _this.taskBeforeEdit[objKey] = _this.model[objKey]; });
            if (task.AssignedTo != null)
                _this.model.AssignedTo = task.AssignedTo.props.Name;
            else
                _this.model.AssignedTo = null;
            if (task.DueDate != null)
                _this.model.DueDate = new Date(task.DueDate);
            else
                _this.model.DueDate = null;
            if (task.IsImportant != null)
                _this.model.IsImportant = task.IsImportant.toString();
            else
                _this.model.IsImportant = null;
        }));
        Promise.all(promiseArr).then(function (result) {
            if (_this.user["_id"] == _this.taskBeforeEdit.Author['_docId']) {
                _this.userRole = 'author';
            }
            else if (_this.user["_id"] == _this.taskBeforeEdit.AssignedTo['_docId']) {
                _this.userRole = 'assignedTo';
            }
        });
    };
    EditTaskComponent.prototype.onEditTaskFormSubmit = function (event, editTaskForm) {
        var _this = this;
        event.preventDefault();
        if (!(this.model["Title"] && this.model["Title"].length > 0))
            return;
        var tempEditableItem = {};
        Object.keys(this.model).forEach(function (objKey) { return tempEditableItem[objKey] = _this.model[objKey]; });
        tempEditableItem["AssignedTo"] = { "_col": this.user.Company._docId + "Users", "_docId": this.users.find(function (user) { return user.Name == _this.model["AssignedTo"]; })["_id"] };
        tempEditableItem["IsImportant"] = (this.model["IsImportant"] == "true");
        if (this.model["DueDate"] != null) {
            this.model["DueDate"].setTime(this.model["DueDate"].getTime() + (12 * 60 * 60 * 1000));
            tempEditableItem["DueDate"] = this.model["DueDate"].toISOString();
        }
        // Not sure if will be needed
        if (this.taskBeforeEdit['Title'] != tempEditableItem['Title']) {
            tempEditableItem['Status'] = this.config.tasksStatuses.new;
        }
        else if (this.taskBeforeEdit['Description'] != tempEditableItem['Description']) {
            tempEditableItem['Status'] = this.config.tasksStatuses.new;
        }
        else if (this.taskBeforeEdit['AssignedTo']['_docId'] != tempEditableItem['AssignedTo']['_docId']) {
            tempEditableItem['Status'] = this.config.tasksStatuses.new;
        }
        delete tempEditableItem["_id"];
        delete tempEditableItem["Company"];
        delete tempEditableItem["ExternalDoc"];
        switch (tempEditableItem["Source"]) {
            case this.config.sources.dynamics365:
                this.updateDynamics365Task(tempEditableItem);
                break;
            default:
                break;
        }
        this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Tasks/" + this.taskId, tempEditableItem).then(function (response) {
            _this.eventEmitter.updateTasks.emit();
        });
        editTaskForm.resetForm();
    };
    EditTaskComponent.prototype.onPeoplepickerValueChange = function () {
        var _this = this;
        if ((this.model.AssignedTo != null) && (this.model.AssignedTo.length > 0)) {
            this.filteredUsers = this.users.filter(function (user) { return user.Name.toLowerCase().indexOf(_this.model.AssignedTo.toLowerCase()) === 0; });
        }
        else {
            this.filteredUsers = [];
        }
    };
    EditTaskComponent.prototype.validatePeoplepicker = function (event, editTaskForm) {
        var _this = this;
        if ((this.model.AssignedTo != null) && (this.model.AssignedTo.length > 0)) {
            if (this.users.filter(function (user) { return user.Name == _this.model.AssignedTo; }).length != 1) {
                editTaskForm.form.controls.AssignedTo.setErrors({ 'incorrect': true });
            }
        }
        else {
            editTaskForm.form.controls.AssignedTo.setErrors({ 'incorrect': true });
        }
    };
    EditTaskComponent.prototype.updateDynamics365Task = function (task) {
        var _this = this;
        this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Users/" + task.AssignedTo["_docId"]).then(function (user) {
            _this.generalService.httpGet(_this.generalService.serverAPIUrl + "/_api/dynamics365/users").then(function (response) {
                var userExternalId;
                response.value.forEach(function (dynamics365User) {
                    if ((dynamics365User["internalemailaddress"] != null) && (dynamics365User["internalemailaddress"].toLowerCase() == user.Email.toLowerCase())) {
                        userExternalId = dynamics365User["systemuserid"];
                        return false;
                    }
                });
                if (userExternalId) {
                    var dynamics365TaskProps = {};
                    dynamics365TaskProps["subject"] = task.Title;
                    dynamics365TaskProps["description"] = task.Description;
                    dynamics365TaskProps["scheduledstart"] = task.DueDate;
                    dynamics365TaskProps["prioritycode"] = (task.IsImportant == true) ? "2" : "1";
                    dynamics365TaskProps["statecode"] = (task.Status == "Done") ? "1" : "0";
                    dynamics365TaskProps["ownerid@odata.bind"] = "/systemusers(" + userExternalId.toUpperCase() + ")";
                    _this.generalService.httpPost(_this.generalService.serverAPIUrl + "/_api/dynamics365/tasks/" + task.ExternalId + "/update", dynamics365TaskProps);
                }
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditTaskComponent.prototype, "taskId", void 0);
    EditTaskComponent = __decorate([
        core_1.Component({
            selector: 'edit-task',
            template: __webpack_require__("../../../../../src/app/components/tasks/edit-task/edit-task.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/tasks/edit-task/edit-task.component.css")]
        }),
        __param(2, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService, Object])
    ], EditTaskComponent);
    return EditTaskComponent;
}());
exports.EditTaskComponent = EditTaskComponent;


/***/ }),

/***/ "../../../../../src/app/components/tasks/info-task/info-task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".task-info-wrapper{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n.task-info-wrapper .task-header{\r\n    padding: 30px;\r\n    height: 120px;\r\n}\r\n.task-info-wrapper .task-header .author-avatar{\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-color: grey;\r\n    width: 55px;\r\n    height: 55px;\r\n    border-radius: 50%;\r\n    display: inline-block;\r\n    margin-right: 11px;\r\n    outline: none!important;\r\n}\r\n.task-info-wrapper .task-header .author-info{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n}\r\n.task-info-wrapper .task-header .author-info .author-name{\r\n    font-weight: 600;\r\n    margin-top: 4px;\r\n    font-size: 19px;\r\n    color: #444;\r\n    text-decoration: none;\r\n}\r\n.task-info-wrapper .task-header .author-info .author-name:hover{\r\n    color: black;\r\n}\r\n.task-info-wrapper .task-header .author-info .task-created{\r\n    color: #7d7d7d;\r\n    font-size: 14px;\r\n    margin-top: 5px;\r\n}\r\n.task-info-wrapper .task-body{\r\n    height: calc(100% - 120px);\r\n}\r\n.task-info-wrapper .task-body >>> .mat-tab-body-wrapper{\r\n    height: 100%;\r\n}\r\n.task-info-wrapper .task-body >>> .mat-tab-label-active {\r\n    background-color: #e6e6e6;\r\n}\r\n.task-info-wrapper .task-properties{\r\n    width: 100%;\r\n    table-layout: fixed;\r\n}\r\n.task-info-wrapper .task-properties tr td:first-child{\r\n    width: 160px;\r\n    font-weight: 600;\r\n    color: black;\r\n    padding-right: 15px;\r\n}\r\n.task-info-wrapper .task-properties tr td{\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    word-break: break-word;\r\n    vertical-align: top;\r\n    padding: 10px 5px;\r\n}\r\n.task-info-wrapper .task-properties .assignedto-avatar{\r\n    height: 30px;\r\n    width: 30px;\r\n    border-radius: 50%;\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-color: grey;\r\n    display: inline-block;\r\n    margin-right: 10px;\r\n}\r\n.task-info-wrapper .task-properties .assignedto-avatar + span{\r\n    vertical-align: top;\r\n    margin-top: 6px;\r\n    display: inline-block;\r\n}\r\n.task-info-wrapper .task-importance{\r\n    position: absolute;\r\n    top: 0;\r\n    right: 50px;\r\n    width: 50px;\r\n    height: 55px;\r\n}\r\n.task-info-wrapper .task-importance img{\r\n    width: 42px;\r\n    height: auto;\r\n}\r\n.task-info-wrapper .task-importance > div{\r\n    position: relative;\r\n    width: 50px;\r\n    height: 55px;\r\n}\r\n.task-info-wrapper .task-importance mat-icon{\r\n    position: absolute;\r\n    color: white;\r\n    top: 15px;\r\n    left: 9px;\r\n}\r\n@media screen and (max-width: 768px) {\r\n    .task-info-wrapper .task-header {\r\n        padding: 25px 20px;\r\n        height: 90px;\r\n    }\r\n    .task-info-wrapper .task-header .author-avatar{\r\n        width: 40px;\r\n        height: 40px;\r\n    }\r\n    .task-info-wrapper .task-header .author-info .author-name{\r\n        font-size: 15px;\r\n    }\r\n    .task-info-wrapper .task-header .author-info .task-created{\r\n        font-size: 13px;\r\n    }\r\n    .task-info-wrapper .task-importance{\r\n        right: 5px;\r\n    }\r\n    .task-info-wrapper .task-body{\r\n        height: calc(100% - 90px);\r\n    }\r\n    .task-info-wrapper .task-body >>> .mat-tab-label{\r\n        height: 40px;\r\n    }\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/tasks/info-task/info-task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"task-info-wrapper\" *ngIf=\"task != null\">\r\n    <div class=\"task-importance\" *ngIf=\"task.IsImportant == true\">\r\n        <div>\r\n            <img src=\"/src/img/importance-bg.png\"/>\r\n            <mat-icon>star</mat-icon>\r\n        </div>\r\n    </div>\r\n    <div class=\"task-header\">\r\n        <a class=\"author-avatar\" [ngStyle]=\"{'background-image': 'url(' + authorAvatarUrl + ')'}\" routerLink=\"/profile/{{authorId}}\"></a>\r\n        <div class=\"author-info\">\r\n            <a class=\"author-name\" routerLink=\"/profile/{{authorId}}\">{{ task.Author.props.Name }}</a>\r\n            <div class=\"task-created\">{{ task.Created | date:'short' }}</div>\r\n        </div>\r\n    </div>\r\n    <mat-tab-group class=\"task-body\">\r\n        <mat-tab label=\"{{ 'Tasks.Details' | translate }}\">\r\n            <table class=\"task-properties\" *ngIf=\"userRole == null\">\r\n                <tbody>\r\n                    <tr>\r\n                        <td>{{ 'Tasks.Name' | translate }}</td>\r\n                        <td>{{ task.Title }}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"task.Description != null\">\r\n                        <td>{{ 'Tasks.Description' | translate }}</td>\r\n                        <td>{{ task.Description }}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"task.AssignedTo.props._id != user._id\">\r\n                        <td>{{ 'Tasks.Executor' | translate }}</td>\r\n                        <td>\r\n                            <div class=\"assignedto-avatar\" [ngStyle]=\"{'background-image': 'url(' + assignedToAvatarUrl + ')'}\"></div>\r\n                            <span>{{ task.AssignedTo.props.Name }}</span>\r\n                        </td>\r\n                    </tr>\r\n                    <tr *ngIf=\"task.DueDate != null\">\r\n                        <td>{{ 'Tasks.Deadline' | translate }}</td>\r\n                        <td>{{ task.DueDate | date: 'shortDate' }}</td>\r\n                    </tr>\r\n                    <tr *ngIf=\"task.Status != null\">\r\n                        <td>{{ 'Tasks.Status' | translate }}</td>\r\n                        <td>{{ task.Status }}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n            <edit-task *ngIf=\"userRole != null\" [taskId]=\"task._id\"></edit-task>\r\n        </mat-tab>\r\n        <mat-tab label=\"{{ 'Tasks.Discussion' | translate }}\">\r\n            <discussion-task [taskId]=\"taskId\"></discussion-task>\r\n        </mat-tab>\r\n    </mat-tab-group>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/tasks/info-task/info-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var InfoTaskComponent = /** @class */ (function () {
    function InfoTaskComponent(generalService, _eventEmitter) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
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
    InfoTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        });
        this.subscriptions.push(this.eventEmitter.onTaskInfoOpen.subscribe(function (task) {
            _this.taskId = task._id;
            _this.getTask(_this.taskId);
        }));
        this.getTask(this.taskId);
    };
    InfoTaskComponent.prototype.getTask = function (taskId) {
        var _this = this;
        this.task = null;
        return this.generalService.httpGet(this.generalService.serverAPIUrl + "/_api/Tasks/" + this.taskId + "?expand=Author,Editor,AssignedTo").then(function (task) {
            _this.task = task;
            _this.authorAvatarUrl = "/src/img/avatars/" + task["Author"].props["Company"]["_docId"] + "/" + task["Author"].props["_id"] + ".jpeg";
            _this.authorId = task["Author"].props["_id"];
            _this.assignedToAvatarUrl = "/src/img/avatars/" + task["AssignedTo"].props["Company"]["_docId"] + "/" + task["AssignedTo"].props["_id"] + ".jpeg";
            if (_this.user["_id"] == _this.task.Author['_docId']) {
                _this.userRole = 'author';
            }
            else if (_this.user["_id"] == _this.task.AssignedTo['_docId']) {
                _this.userRole = 'assignedTo';
            }
        });
    };
    InfoTaskComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InfoTaskComponent.prototype, "taskId", void 0);
    InfoTaskComponent = __decorate([
        core_1.Component({
            selector: 'info-task',
            template: __webpack_require__("../../../../../src/app/components/tasks/info-task/info-task.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/tasks/info-task/info-task.component.css")]
        }),
        __metadata("design:paramtypes", [general_service_1.GeneralService, event_emitter_service_1.EventEmitterService])
    ], InfoTaskComponent);
    return InfoTaskComponent;
}());
exports.InfoTaskComponent = InfoTaskComponent;


/***/ }),

/***/ "../../../../../src/app/components/tasks/quick-create-task/quick-create-task.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".task.new{\r\n    height: 55px;\r\n    width: 100%;\r\n    background-color: rgba(255,255,255,.7);\r\n    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\r\n    border-radius: 5px;\r\n    margin-bottom: 3px;\r\n    font-size: 0;\r\n    position: relative;\r\n}\r\n.add-icon-wrapper{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    height: 55px;\r\n    width: 70px;\r\n    text-align: center;\r\n    color: #929292;\r\n}\r\n.add-icon-wrapper mat-icon{\r\n    font-size: 30px;\r\n    height: auto;\r\n    width: auto;\r\n    padding: 13px 0px;\r\n}\r\n.form-wrapper{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    width: calc(100% - 180px);\r\n}\r\n.form-wrapper input[name=\"Title\"]{\r\n    background-color: transparent;\r\n    border: none;\r\n    outline: none;\r\n    font-family: Roboto,\"Helvetica Neue\",sans-serif;\r\n    font-size: 16px;\r\n    padding: 0;\r\n    padding-top: 21px;\r\n    padding-bottom: 15px;\r\n    color: #444;\r\n    width: 100%;\r\n    text-overflow: ellipsis;\r\n}\r\n.form-wrapper .task-importance{\r\n    position: absolute;\r\n    right: 15px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    z-index: 2;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n.form-wrapper .task-importance mat-icon{\r\n    height: auto;\r\n    width: auto;\r\n    padding: 16px 0;        \r\n}\r\n.form-wrapper .task-importance-bg{\r\n    position: absolute;\r\n    right: 15px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    text-align: center;\r\n}\r\n.form-wrapper .task-importance-bg img{\r\n    width: 42px;\r\n    height: auto;\r\n}\r\n.form-wrapper .task-date{\r\n    position: absolute;\r\n    right: 65px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n.form-wrapper .task-date mat-icon{\r\n    height: auto;\r\n    width: auto;\r\n    padding: 16px 0; \r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/tasks/quick-create-task/quick-create-task.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"task new\">\r\n    <div class=\"add-icon-wrapper\">\r\n        <mat-icon>add</mat-icon>\r\n    </div>\r\n    <div class=\"form-wrapper\">\r\n        <form (submit)=\"onNewTaskFormSubmit($event, newTaskForm)\" #newTaskForm=\"ngForm\">\r\n            <input type=\"text\" placeholder=\"{{ 'Create' | translate }} {{'Tasks.task' | translate }}...\" [(ngModel)]=\"model.Title\" name=\"Title\" #Title=\"ngModel\" required>\r\n            <input matInput [matDatepicker]=\"datepicker\" [(ngModel)]=\"model.DueDate\" name=\"DueDate\" #DueDate=\"ngModel\" style=\"display:none;\">\r\n            <mat-datepicker #datepicker touchUi=\"true\"></mat-datepicker>\r\n            <div class=\"task-date\" (click)=\"datepicker.open()\">\r\n                <mat-icon>date_range</mat-icon>\r\n            </div>\r\n            <div class=\"task-importance\" (click)=\"toggleTaskImportance($event)\">\r\n                <mat-icon *ngIf=\"model.IsImportant == true\" style=\"color: white;\">star</mat-icon>\r\n                <mat-icon *ngIf=\"(model.IsImportant == null)||(model.IsImportant == false)\">star_border</mat-icon>\r\n            </div>\r\n            <div class=\"task-importance-bg\" *ngIf=\"model.IsImportant == true\">\r\n                <img src=\"/src/img/importance-bg.png\">\r\n            </div>\r\n            <input type=\"submit\" style=\"position: absolute; left: -9999px\"/>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/tasks/quick-create-task/quick-create-task.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var QuickCreateTaskComponent = /** @class */ (function () {
    function QuickCreateTaskComponent(generalService, _eventEmitter, router, config) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.router = router;
        this.config = config;
        this.model = {};
        this.eventEmitter = this._eventEmitter;
    }
    QuickCreateTaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generalService.getCurrentUser().then(function (user) {
            _this.user = user;
        });
    };
    QuickCreateTaskComponent.prototype.toggleTaskImportance = function (event) {
        if (this.model["IsImportant"] == null)
            this.model["IsImportant"] = true;
        else
            this.model["IsImportant"] = !this.model["IsImportant"];
    };
    QuickCreateTaskComponent.prototype.onNewTaskFormSubmit = function (event, newTaskForm) {
        var _this = this;
        event.preventDefault();
        if (!(this.model["Title"] && this.model["Title"].length > 0))
            return;
        var tempCreatableItem = {};
        Object.keys(this.model).forEach(function (objKey) { return tempCreatableItem[objKey] = _this.model[objKey]; });
        tempCreatableItem["AssignedTo"] = { "_col": this.user.Company._docId + "Users", "_docId": this.user["_id"] };
        tempCreatableItem["Status"] = this.config.tasksStatuses.new;
        tempCreatableItem["IsImportant"] = this.model["IsImportant"];
        if (this.model["DueDate"] != null) {
            this.model["DueDate"].setTime(this.model["DueDate"].getTime() + (12 * 60 * 60 * 1000));
            tempCreatableItem["DueDate"] = this.model["DueDate"].toISOString();
        }
        newTaskForm.resetForm();
        this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/Tasks", tempCreatableItem).then(function (response) {
            _this.eventEmitter.updateTasks.emit();
            _this.model["IsImportant"] = null;
        });
    };
    QuickCreateTaskComponent = __decorate([
        core_1.Component({
            selector: 'quick-create-task',
            template: __webpack_require__("../../../../../src/app/components/tasks/quick-create-task/quick-create-task.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/tasks/quick-create-task/quick-create-task.component.css")]
        }),
        __param(3, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            router_1.Router, Object])
    ], QuickCreateTaskComponent);
    return QuickCreateTaskComponent;
}());
exports.QuickCreateTaskComponent = QuickCreateTaskComponent;


/***/ }),

/***/ "../../../../../src/app/components/tasks/tasks.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-sidenav-container{\r\n    height: 100%;\r\n    background-color: transparent;\r\n}\r\nmat-sidenav{\r\n    width: 300px;\r\n    transition: width .3s ease;\r\n}\r\nmat-sidenav.info{\r\n    width: 500px;\r\n    max-width: 88%;\r\n}\r\n.tasks-list-wrapper{\r\n    width: 100%;\r\n    padding: 0;\r\n}\r\n.task{\r\n    height: 55px;\r\n    width: 100%;\r\n    background-color: white;\r\n    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);\r\n    border-radius: 5px;\r\n    margin-bottom: 3px;\r\n    font-size: 0;\r\n    position: relative;\r\n}\r\n.task:not(:last-child){\r\n    margin-bottom: 3px;\r\n}\r\n.task-checkbox-wrapper{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    height: 55px;\r\n    width: 70px;\r\n    text-align: center;\r\n}\r\n.task-checkbox-wrapper mat-checkbox{\r\n    height: auto;\r\n    width: auto;\r\n    margin: 18px 0px;\r\n    display: block;\r\n}\r\n.task-title{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    width: calc(100% - 225px);\r\n    font-size: 16px;\r\n    color: #444;\r\n    padding: 18px 0;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    cursor: default;\r\n    position: relative;\r\n}\r\n\r\n.withPadding{\r\n    padding-right : 45px;\r\n}\r\n.task-importance{\r\n    position: absolute;\r\n    right: 15px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    z-index: 2;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n.task-importance mat-icon{\r\n    height: auto;\r\n    width: auto;\r\n    padding: 16px 0;        \r\n}\r\n.task-importance-bg{\r\n    position: absolute;\r\n    right: 15px;\r\n    bottom: 0;\r\n    top: 0;\r\n    width: 50px;\r\n    text-align: center;\r\n}\r\n.task-importance-bg img{\r\n    width: 42px;\r\n    height: auto;\r\n}\r\n.task .task-date{\r\n    position: absolute;\r\n    right: 70px;\r\n    top: 0px;\r\n    font-size: 16px;\r\n    color: #444;\r\n    height: 100%;\r\n    padding-top: 18px;\r\n}\r\n.task.gu-mirror{\r\n    width: 300px!important;\r\n}\r\n.task-source-icon{\r\n    color:cornflowerblue;\r\n    position: absolute;\r\n    right:10px; \r\n    font-size: 25px;\r\n    margin-top: -5px;\r\n}\r\n.task-source-img{\r\n    height: 24px;\r\n    width: auto;\r\n    position: absolute;\r\n    right: 10px;\r\n    margin-top: -3px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/tasks/tasks.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container>\r\n    <mat-sidenav mode=\"over\" align=\"end\" (close)=\"onTaskSidenavClose()\" [opened]=\"tasksSidebarOpened\" [ngClass]=\"tasksSidebarType\">\r\n        <create-task *ngIf=\"tasksSidebarType == 'create'\"></create-task>\r\n        <info-task *ngIf=\"tasksSidebarType == 'info' && ( !taskInfoViewed.Source ||  taskInfoViewed.Source == config.sources.dynamics365)\" [taskId]=\"taskInfoViewed._id\"></info-task>\r\n        <work-task *ngIf=\"tasksSidebarType == 'info' && taskInfoViewed.Source == config.sources.lsdocs\" [task]=\"taskInfoViewed.ExternalDoc.props\" [toDoneTask]=\"doneLSDocsTask\"></work-task>\r\n        <connectedDoc *ngIf=\"tasksSidebarType == 'connectedLSDocsDoc'\" [task]=\"taskInfoViewed.ExternalDoc.props\" ></connectedDoc>\r\n    </mat-sidenav>\r\n    <div class=\"component-container\">\r\n        <quick-create-task></quick-create-task>\r\n        <div class=\"tasks-list-wrapper\" [dragula]='\"categories-bag\"'>\r\n            <div *ngFor=\"let task of items\" class=\"task\" [attr.data-id]=\"task._id\">\r\n                <div class=\"task-checkbox-wrapper\">\r\n                    <mat-checkbox color=\"primary\" matTooltip=\"{{ 'Tasks.Execute' | translate }}\" (change)=\"completeTask($event, task)\" [checked]=\"task.Status == config.tasksStatuses.done\" [disabled]=\"task.AssignedTo._docId != user._id\"></mat-checkbox>\r\n                </div>\r\n                <div class=\"task-title\" [ngClass]=\"task.Source ? 'withPadding' : '' \" (tap)=\"openTaskInfo($event, task)\">\r\n                    {{ task.Title }}\r\n                    <mat-icon *ngIf=\"task.Source == config.sources.lsdocs\" (tap)=\"openTaskInfo($event,task,'connectedLSDocsDoc')\" class=\"task-source-icon\" title=\"LS Docs\">cloud_queue</mat-icon>\r\n                    <img *ngIf=\"task.Source == config.sources.dynamics365\" class=\"task-source-img\" src=\"/src/img/dynamics.png\" title=\"Dynamics 365\"/>\r\n                </div>\r\n                <div class=\"task-date\"  (tap)=\"openTaskInfo($event, task)\" *ngIf=\"task.DueDate != null\">{{ task.DueDate | date:'shortDate' }}</div>\r\n                <div class=\"task-importance\" (click)=\"toggleTaskImportance($event, task)\">\r\n                    <mat-icon *ngIf=\"task.IsImportant == true\" style=\"color: white;\">star</mat-icon>\r\n                    <mat-icon *ngIf=\"(task.IsImportant == null)||(task.IsImportant == false)\">star_border</mat-icon>\r\n                </div>\r\n                <div class=\"task-importance-bg\" *ngIf=\"task.IsImportant == true\">\r\n                    <img src=\"/src/img/importance-bg.png\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</mat-sidenav-container>"

/***/ }),

/***/ "../../../../../src/app/components/tasks/tasks.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var general_service_1 = __webpack_require__("../../../../../src/app/shared/general.service.ts");
var event_emitter_service_1 = __webpack_require__("../../../../../src/app/shared/event-emitter.service.ts");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
var ng2_translate_1 = __webpack_require__("../../../../ng2-translate/index.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
var lsdocstasks_component_1 = __webpack_require__("../../../../../src/app/components/lsdocstasks/lsdocstasks.component.ts");
var TasksComponent = /** @class */ (function () {
    function TasksComponent(generalService, _eventEmitter, route, router, config, translate) {
        this.generalService = generalService;
        this._eventEmitter = _eventEmitter;
        this.route = route;
        this.router = router;
        this.config = config;
        this.translate = translate;
        this.mode = null;
        this.userTaskCategoryId = null;
        this.items = new Array();
        this.user = null;
        this.tasksSidebarOpened = false;
        this.tasksSidebarType = null;
        this.eventEmitter = this._eventEmitter;
        this.taskInfoViewed = null;
        this.subscriptions = [];
        this.doneLSDocsTask = lsdocstasks_component_1.LSDocsTasksComponent.prototype.toDoneTask;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.route.params.subscribe(function (params) {
            //Mode is for parametr in url (my, today, new, create)
            _this.mode = params["mode"];
            _this.userTaskCategoryId = params["id"];
            _this.generalService.getCurrentUser().then(function (user) {
                _this.user = user;
                _this.updateView();
            });
        }));
        this.subscriptions.push(this.eventEmitter.updateTasks.subscribe(function () {
            _this.updateView();
            _this.tasksSidebarOpened = false;
        }));
        this.subscriptions.push(this.eventEmitter.onNewTaskBtnClicked.subscribe(function () {
            _this.tasksSidebarOpened = true;
            _this.tasksSidebarType = null;
            setTimeout(function () { _this.tasksSidebarType = "create"; }, 300);
        }));
    };
    TasksComponent.prototype.updateView = function () {
        var _this = this;
        var requestUrl;
        if (this.mode != null) {
            if (this.mode == 'my') {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"}}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = false;
            }
            else if (this.mode == 'important') {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"},\"IsImportant\":true}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = false;
            }
            else if (this.mode == 'today') {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"},\"DueDate\":{\"$regex\":\"" + (new Date()).toISOString().split('T')[0] + "\"}}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = false;
            }
            else if (this.mode == 'new') {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"},\"Created\":{\"$regex\":\"" + (new Date()).toISOString().split('T')[0] + "\"}}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = false;
            }
            else if (this.mode == 'outgoing') {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"Author._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"}}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = false;
            }
            else if (this.mode == 'create') {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"AssignedTo._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"}}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = true;
                this.tasksSidebarType = 'create';
            }
            else {
                requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"Author._docId\":\"" + this.user["_id"] + "\",\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"},\"Category\": \"" + this.mode + "\"}&expand=ExternalDoc&orderby=Created desc";
                this.tasksSidebarOpened = false;
            }
        }
        else if (this.userTaskCategoryId != null) {
            requestUrl = this.generalService.serverAPIUrl + "/_api/Tasks?filter={\"UserCategories\":{\"$elemMatch\":{\"_docId\":\"" + this.userTaskCategoryId + "\"}},\"Status\":{\"$ne\":\"" + this.config.tasksStatuses.done + "\"}}&expand=ExternalDoc&orderby=Created desc";
            this.tasksSidebarOpened = false;
        }
        if ((requestUrl != null) && (requestUrl.length > 0)) {
            this.generalService.httpGet(requestUrl).then(function (docs) {
                _this.items = docs;
            });
        }
    };
    TasksComponent.prototype.completeTask = function (event, task) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var status, _a, tempEditableItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = false;
                        _a = task.Source;
                        switch (_a) {
                            case this.config.sources.lsdocs: return [3 /*break*/, 1];
                            case this.config.sources.dynamics365: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.doneLSDocsTask(task.ExternalDoc.props, 'Done', '')];
                    case 2:
                        status = _b.sent(); //return done status: 'true' or 'false'
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/dynamics365/tasks/" + task.ExternalId + "/update", { "statecode": "1" })];
                    case 4:
                        status = _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        status = true;
                        return [3 /*break*/, 6];
                    case 6:
                        tempEditableItem = {};
                        Object.keys(task).forEach(function (objKey) { return tempEditableItem[objKey] = task[objKey]; });
                        tempEditableItem["Status"] = this.config.tasksStatuses.done;
                        delete tempEditableItem["_id"];
                        delete tempEditableItem["Company"];
                        delete tempEditableItem["ExternalDoc"];
                        status && this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Tasks/" + task["_id"], tempEditableItem).then(function (response) {
                            _this.updateView();
                            _this.eventEmitter.updateTasks.emit();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksComponent.prototype.toggleTaskImportance = function (event, task) {
        var _this = this;
        switch (task.Source) {
            case this.config.sources.dynamics365:
                this.generalService.httpPost(this.generalService.serverAPIUrl + "/_api/dynamics365/tasks/" + task.ExternalId + "/update", { "prioritycode": ((task["IsImportant"] == true) ? "1" : "2") });
                break;
            default:
                break;
        }
        var tempEditableItem = {};
        Object.keys(task).forEach(function (objKey) { return tempEditableItem[objKey] = task[objKey]; });
        tempEditableItem["IsImportant"] = !task["IsImportant"];
        delete tempEditableItem["_id"];
        delete tempEditableItem["Company"];
        delete tempEditableItem["ExternalDoc"];
        this.generalService.httpUpdate(this.generalService.serverAPIUrl + "/_api/Tasks/" + task["_id"], tempEditableItem).then(function (response) {
            _this.updateView();
            _this.eventEmitter.updateTasks.emit();
        });
    };
    TasksComponent.prototype.openTaskInfo = function (event, task, type) {
        this.tasksSidebarType = type ? type : 'info';
        this.tasksSidebarOpened = true;
        this.eventEmitter.onTaskInfoOpen.emit(task);
        this.taskInfoViewed = task;
    };
    TasksComponent.prototype.onTaskSidenavClose = function () {
        this.tasksSidebarOpened = false;
        if (this.router.url.indexOf('/tasks/create') != -1) {
            this.router.navigate(['/tasks/my']);
        }
    };
    TasksComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
    };
    TasksComponent = __decorate([
        core_1.Component({
            selector: 'tasks',
            template: __webpack_require__("../../../../../src/app/components/tasks/tasks.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/tasks/tasks.component.css")]
        }),
        __param(4, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [general_service_1.GeneralService,
            event_emitter_service_1.EventEmitterService,
            router_1.ActivatedRoute,
            router_1.Router, Object, ng2_translate_1.TranslateService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;


/***/ }),

/***/ "../../../../../src/app/shared/event-emitter.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var EventEmitterService = /** @class */ (function () {
    function EventEmitterService() {
        this.updateTasks = new core_1.EventEmitter();
        this.onNewTaskBtnClicked = new core_1.EventEmitter();
        this.onTaskInfoOpen = new core_1.EventEmitter();
        this.onMainSidebarToggle = new core_1.EventEmitter();
    }
    EventEmitterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], EventEmitterService);
    return EventEmitterService;
}());
exports.EventEmitterService = EventEmitterService;


/***/ }),

/***/ "../../../../../src/app/shared/general.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var app_config_1 = __webpack_require__("../../../../../src/app/app.config.ts");
__webpack_require__("../../../../rxjs/_esm5/add/operator/toPromise.js");
var GeneralService = /** @class */ (function () {
    function GeneralService(http, config) {
        this.http = http;
        this.config = config;
        this.serverAPIUrl = config.serverAPIUrl;
        this.user = null;
        this.preloadersCount = 0;
        this.notificationsArr = [];
        this.notificationIsShowing = false;
    }
    GeneralService.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ((_this.user != null) && (Object.keys(_this.user).length > 0)) {
                resolve(_this.user);
            }
            else {
                _this.httpGet(_this.serverAPIUrl + "/_api/currentUser").then(function (user) {
                    _this.user = user;
                    resolve(_this.user);
                });
            }
        });
    };
    GeneralService.prototype.httpGet = function (queryUrl) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(queryUrl, options)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            return response;
        }).catch(function (response) {
            if (response.status == '403')
                window.location.reload(true);
            return response;
        });
    };
    GeneralService.prototype.httpPost = function (queryUrl, object) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        var options = new http_1.RequestOptions({ headers: headers });
        if (object == null)
            object = {};
        return this.http.post(queryUrl, JSON.stringify(object), options)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .then(function (response) {
            return response;
        }).catch(function (response) {
            if (response.status == '403')
                window.location.reload(true);
            return response;
        });
    };
    GeneralService.prototype.httpDelete = function (queryUrl) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(queryUrl, options)
            .toPromise()
            .then(function (response) {
            return response;
        }).catch(function (response) {
            if (response.status == '403')
                window.location.reload(true);
            return response;
        });
    };
    GeneralService.prototype.httpUpdate = function (queryUrl, object) {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json;odata=verbose');
        headers.append('Content-Type', 'application/json;odata=verbose');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(queryUrl, JSON.stringify(object), options)
            .toPromise()
            .then(function (response) {
            return response;
        }).catch(function (response) {
            if (response.status == '403')
                window.location.reload(true);
            return response;
        });
    };
    GeneralService.prototype.isLargeScreen = function () {
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width > 768) {
            return true;
        }
        else {
            return false;
        }
    };
    GeneralService.prototype.preloaderStart = function () {
        ++this.preloadersCount;
        document.getElementById('preloader-bg').classList.remove('hidden');
    };
    GeneralService.prototype.preloaderStop = function () {
        --this.preloadersCount;
        if (this.preloadersCount == 0) {
            document.getElementById('preloader-bg').classList.add('hidden');
        }
    };
    GeneralService.prototype.showNotification = function (message, ttl) {
        var _this = this;
        if (!this.notificationIsShowing) {
            this.notificationIsShowing = true;
            var NotificationFx = window["NotificationFx"];
            new NotificationFx({
                message: message,
                layout: 'growl',
                effect: 'slide',
                ttl: (ttl != null) ? ttl : 5000,
                onClose: function () {
                    _this.notificationIsShowing = false;
                    if (_this.notificationsArr.length > 0) {
                        _this.showNotification(_this.notificationsArr[0]);
                        _this.notificationsArr.splice(0, 1);
                    }
                    return false;
                }
            }).show();
        }
        else {
            this.notificationsArr.push(message);
        }
    };
    GeneralService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(app_config_1.APP_CONFIG)),
        __metadata("design:paramtypes", [http_1.Http, Object])
    ], GeneralService);
    return GeneralService;
}());
exports.GeneralService = GeneralService;


/***/ }),

/***/ "../../../../../src/app/shared/search-dlg.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var ListSearchDlgComponent = /** @class */ (function () {
    function ListSearchDlgComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.searchKeyWordCtrl = new forms_1.FormControl();
    }
    ListSearchDlgComponent.prototype.validate = function () {
        if (this.searchKeyWordCtrl.valid) {
            this.dialogRef.close(this.searchKeyWordCtrl.value);
        }
    };
    ListSearchDlgComponent = __decorate([
        core_1.Component({
            selector: 'list-search-dlg',
            template: "<div>\n        <mat-input-container style=\"width:400px;\">\n            <input matInput placeholder=\"{{ 'WordToSearch' | translate }}\" [formControl]=\"searchKeyWordCtrl\" required>\n        </mat-input-container>\n        <div style=\"text-align:right\">\n            <button mat-raised-button (click)=\"dialogRef.close(null)\" style=\"background-color:#efefef\">{{ 'Cancel' | translate }}</button>\n            <button mat-raised-button (click)=\"validate();\" style=\"background-color:#efefef\">{{ 'Search' | translate }}</button>\n        </div>\n    </div>",
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef])
    ], ListSearchDlgComponent);
    return ListSearchDlgComponent;
}());
exports.ListSearchDlgComponent = ListSearchDlgComponent;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map