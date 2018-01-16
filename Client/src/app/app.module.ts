import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';
import { APP_CONFIG, AppConfig } from './app.config';
import { IAppConfig } from './iapp.config.interface';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateStaticLoader, TranslateLoader, TranslateService } from 'ng2-translate';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { 
  MatNativeDateModule, 
  NativeDateAdapter, 
  DateAdapter,
  MAT_DATE_FORMATS,
  MatSidenavModule,
  MatMenuModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatGridListModule,
  MatFormFieldModule,
  MatTabsModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './components/app/app.component';
import { MainSidebarComponent } from './components/app/main-sidebar/main-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionViewComponent } from './components/collection-view/collection-view.component';
import { ListSearchDlgComponent } from './shared/search-dlg.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { QuickCreateTaskComponent } from './components/tasks/quick-create-task/quick-create-task.component';
import { InfoTaskComponent } from './components/tasks/info-task/info-task.component';
import { DiscussionTaskComponent } from './components/tasks/discussion-task/discussion-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { ProfileAppInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings.component';
import { EmployeesListView } from './components/employees/employees.component';
import { GeneralService } from './shared/general.service';
import { EventEmitterService } from './shared/event-emitter.service';
import { LSDocsTasksComponent } from './components/lsdocstasks/lsdocstasks.component';
import { WorkLSDocsComponent } from './components/lsdocstasks/work-task/work-task.component';
import { ConnectedDoc } from './components/lsdocstasks/connectedDoc/connectedDoc';
import { CompanySettings } from './components/company-settings/company-settings';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './src/assets/i18n', '.json');
}

export function getLocale(config: IAppConfig) { 
  return config.locale;
}

registerLocaleData(localeRu);

@NgModule({
  exports:[
    MatSidenavModule,
    MatMenuModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})

export class MaterialDesign {}

@NgModule({
  declarations: [
    AppComponent,
    MainSidebarComponent,
    HomeComponent,
    CollectionsComponent,
    CollectionViewComponent,
    ListSearchDlgComponent,
    TasksComponent,
    CreateTaskComponent,
    QuickCreateTaskComponent,
    InfoTaskComponent,
    DiscussionTaskComponent,
    EditTaskComponent,
    LSDocsTasksComponent,
    WorkLSDocsComponent,
    ConnectedDoc,
    EmployeesListView,
    ProfileSettingsComponent,
    ProfileAppInfoComponent,
    CompanySettings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    DragulaModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesign,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'collections',
        component: CollectionsComponent,
      },
      {
        path: 'collection/:name',
        component: CollectionViewComponent,
      },
      // {
      //   path: 'tasks/lsdocs',
      //   component: LSDocsTasksComponent,
      // },
      {
        path: 'tasks/category/:id',
        component: TasksComponent,
      },
      {
        path: 'tasks/:mode',
        component: TasksComponent,
      },
      {
        path: 'profile/:id',
        component: ProfileAppInfoComponent,
      },
      {
        path: 'profile-settings',
        component: ProfileSettingsComponent,
      },
      {
        path: 'company-settings',
        component: CompanySettings,
      },
      {
        path:'employees',
        component: EmployeesListView        
      },
      {
        path: '',
        redirectTo: '/tasks/my',
        pathMatch: 'full'
      }
    ], {useHash: true})
  ],
  providers: [
    GeneralService,
    EventEmitterService,
    { 
      provide: APP_CONFIG,
      useValue: AppConfig
    },
    {
      provide: LOCALE_ID,
      deps : [APP_CONFIG],
      useFactory: getLocale 
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListSearchDlgComponent
  ]
})
export class AppModule { }
