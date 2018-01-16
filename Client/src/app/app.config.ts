import { InjectionToken } from "@angular/core";
import { IAppConfig } from './iapp.config.interface'

export let APP_CONFIG = new InjectionToken< IAppConfig >( 'app.config' );

export const AppConfig: IAppConfig = {
    serverAPIUrl : window.location.origin,  
    tasksStatuses: {
        done : 'Done',
        inprogress : "In Progress",
        new : "Not Started"
    },
    lsdocsStatuses : {
        done : 'Done',
        inprogress : "In Progress",
        new : 'Not Started'
    },
    sources : {
        lsdocs : 'lsdocs',
        dynamics365 : 'dynamics365'
    },
    locale  : getLocale(window.localStorage.getItem('userCustomLocale') || navigator.language || navigator['userLanguage'] || 'ru')
};

function getLocale(localization) {
    switch(localization.split('-')[0].toLowerCase()){
        case 'ru':
            localization = 'ru'
            break;
        case 'en':
            localization = 'en'
            break;
        default :
            localization = 'ru'
    }
    return localization;
}