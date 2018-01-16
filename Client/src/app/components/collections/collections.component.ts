import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../shared/general.service';

@Component ({
    selector: 'collections',
    templateUrl: "collections.component.html",
    styleUrls: ["collections.component.css"]
}) 

export class CollectionsComponent implements OnInit {
    collections: Array<any>;

    constructor (private generalService: GeneralService) {
        this.collections = new Array<any>();
    }

    ngOnInit() {
        this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/collections`).then((response) => {
            this.collections = response;
        })
    }
}