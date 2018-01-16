import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'list-search-dlg',
  template: 
    `<div>
        <mat-input-container style="width:400px;">
            <input matInput placeholder="{{ 'WordToSearch' | translate }}" [formControl]="searchKeyWordCtrl" required>
        </mat-input-container>
        <div style="text-align:right">
            <button mat-raised-button (click)="dialogRef.close(null)" style="background-color:#efefef">{{ 'Cancel' | translate }}</button>
            <button mat-raised-button (click)="validate();" style="background-color:#efefef">{{ 'Search' | translate }}</button>
        </div>
    </div>`,
})
export class ListSearchDlgComponent {

  searchKeyWordCtrl: FormControl;

  constructor(public dialogRef: MatDialogRef<ListSearchDlgComponent>) {
      this.searchKeyWordCtrl = new FormControl();
  }

  validate() : any {
      if (this.searchKeyWordCtrl.valid) {
          this.dialogRef.close(this.searchKeyWordCtrl.value);
      }
  }

}