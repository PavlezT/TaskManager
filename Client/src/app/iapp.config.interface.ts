export interface IAppConfig {
    serverAPIUrl : string,
    tasksStatuses: {
        done : string,
        new : string,
        inprogress : string
    },
    lsdocsStatuses : {
        done : string,
        inprogress : string,
        new : string
    },
    sources : {
        lsdocs : string,
        dynamics365 : string
    },
    locale : string
}