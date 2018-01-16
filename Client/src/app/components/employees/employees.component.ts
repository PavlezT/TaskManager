import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from '../../shared/general.service';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

@Component({
    selector: 'employees',
    styleUrls: ['./employees.component.css'],
    templateUrl: './employees.component.html',
    animations: [
        trigger('preloaderState', [
          state('inactive', style({
            opacity: '0',
            visibility: 'hidden'
          })),
          state('active',   style({
            opacity: '1',
            visibility: 'visible'
          })),
          transition('* => *', animate('500ms ease-out')),
        ])
      ]
})
export class EmployeesListView implements OnInit {

    Users : Array<any>;
    itemsPerPage : number;
    pageNumber : number;
    preloaderVisible : string;

    constructor(
        private generalService: GeneralService
    )
    {
       this.Users = [];
       this.pageNumber = 1;
       this.itemsPerPage = 6;
       this.preloaderVisible = 'inactive';
    }

    ngOnInit () {
        this.updateView();
    }

    private updateView() : Promise<any> {
        this.preloaderVisible = 'active';
        let skip: number = (this.pageNumber - 1) * this.itemsPerPage;
        let top: number = this.itemsPerPage+1;

        return this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/Users?skip=${skip}&top=${top}`).then((users : Array<any>) => {
            this.Users = users;
            this.preloaderVisible = 'inactive';
         });
    }

    //   --- Pagination ---

    public paginationChange(direction: string) : any { 
        if (direction == "prev") 
        --this.pageNumber;
        else if (direction == "next")
        ++this.pageNumber;
        this.updateView();
    }

    //   --- Pagination END ---

}