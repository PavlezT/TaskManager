import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventEmitterService {

    updateTasks = new EventEmitter();
    onNewTaskBtnClicked = new EventEmitter();
    onTaskInfoOpen = new EventEmitter();
    onMainSidebarToggle = new EventEmitter();

    constructor() {}

}