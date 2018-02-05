import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../shared/general.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ListSearchDlgComponent } from '../../shared/search-dlg.component';

@Component({
  selector: 'collection-view',
  templateUrl: 'collection-view.component.html',
  styleUrls: ['collection-view.component.css'],
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
export class CollectionViewComponent implements OnInit {

  collectionName: string;
  collectionKeys: Array<string>;
  items: Array<any>;
  selectedItemsCount: number;
  sortingRules: Array<any>;
  searchInfo : string;
  preloaderVisible: string;
  itemEditModeActive: boolean;
  editableItem: any;  
  itemAddModeActive: boolean;
  pageNumber: number;
  itemsPerPage: number;

  constructor (
    private generalService: GeneralService, 
    public dialog: MatDialog, 
    private route: ActivatedRoute
  ) {
    this.collectionName = "";
    this.collectionKeys = new Array<string>();
    this.selectedItemsCount = 0;
    this.sortingRules = new Array<any>();
    this.searchInfo = null;
    this.preloaderVisible = "active";
    this.itemEditModeActive = false;
    this.editableItem = null;
    this.itemAddModeActive = false;
    this.pageNumber = 1;
    this.itemsPerPage = 15;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.collectionName = params["name"];
      this.updateView();
    });
  }

  updateView() : Promise<any> {
    this.preloaderVisible = "active";
    
    //Generating sorting string for URL query
    let sortingStr: string = '';
    if (this.sortingRules.length > 0) {
      sortingStr += '&orderby='
    }
    this.sortingRules.forEach((sortingRule, i) => {
      sortingStr += sortingRule.Key + ' ' + sortingRule.Sorting;
      if (i+1 != this.sortingRules.length) {
        sortingStr += ',';
      }
    });
      
    let skip: number = (this.pageNumber - 1) * this.itemsPerPage;
    let top: number = this.itemsPerPage;
    let searchStr: string = this.searchInfo ? `&filter=${JSON.stringify({ $text: { $search: `"${this.searchInfo}"`, $caseSensitive: false, $diacriticSensitive: false }})}` : "";
    
    let promiseArray: Array<any> = new Array<any>();
    promiseArray.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/${this.collectionName}/keys`).then((keys:Array<string>) => {
      this.collectionKeys = keys;
    }));
    promiseArray.push(this.generalService.httpGet(`${this.generalService.serverAPIUrl}/_api/${this.collectionName}?skip=${skip}&top=${top}${sortingStr}${searchStr}`).then((docs) => {
      docs.forEach(doc => doc.ngProps = {});
      this.items = docs;
      this.preloaderVisible = "inactive";
    }));
    return Promise.all(promiseArray).then(() => {
      this.preloaderVisible = "inactive";
      this.selectedItemsCount = 0;
      this.itemEditModeActive = false;
    });
  }

  public getItemView( item : any ) : string {
    return item != null ? (typeof item == 'object' ? JSON.stringify(item) : item ) : '';
  }

//   --- Sort functionality --- 

  checkSort(key) : any {
    let sortingRule = this.sortingRules.find(sortingRule => {return sortingRule.Key == key});
    return (sortingRule != null) ? sortingRule.Sorting : null;
  }

  updateSort(e, key) : any {
    if (e.shiftKey == false) {
      if (!((this.sortingRules.length == 1)&&(this.sortingRules[0].Key == key)))
        this.sortingRules = [];
    }
    //Looking for existing sorting rule and creating if no found
    let sortingRuleIndex: number = null;
    for (let i: number = 0; i < this.sortingRules.length; ++i) {
      if (this.sortingRules[i].Key == key) {
        sortingRuleIndex = i;
      }
    }
    if (sortingRuleIndex == null) {
      sortingRuleIndex = this.sortingRules.length
      this.sortingRules.push({Key: key});
    }
    //Changing the sorting rule for current key
    let sortingRule = this.sortingRules[sortingRuleIndex];
    if (sortingRule.Sorting == null) 
      sortingRule.Sorting = 'asc';
    else if (sortingRule.Sorting == 'asc')
      sortingRule.Sorting = 'desc';
    else if (sortingRule.Sorting == 'desc')
      this.sortingRules.splice(sortingRuleIndex, 1);

    this.updateView();
  }

//   --- Sort functionality END --- 

//   --- Item select\dropdown --- 
 
  toggleItemSelection(e, item) : any {
    if (!this.itemEditModeActive) {
      if (item.ngProps.Selected == true) {
        item.ngProps.Selected = false;
        --this.selectedItemsCount;
      } else {
        item.ngProps.Selected = true;
        ++this.selectedItemsCount;
      }
    }
  }

  onDropdownOpen(e, selectedItem) : any {
    this.items.forEach((item) => {
      item.ngProps.Selected = null;
    });
    this.selectedItemsCount = 0;
    this.toggleItemSelection(e, selectedItem);
  }

  disselectAll() : any {
    this.items.forEach(item => {
      item.ngProps.Selected = false;
    });
    this.selectedItemsCount = 0;
  }

//   --- Item select\dropdown END --- 

//   --- Item delete ---

  deleteSelectedItems() : any {
    let promiseArray: Array<any> = new Array<any>();
    this.items.forEach(item => {
      if (item.ngProps.Selected == true) {
        promiseArray.push(this.generalService.httpDelete(`${this.generalService.serverAPIUrl}/_api/${this.collectionName}/${item._id}`));
      }
    });
    Promise.all(promiseArray).then(() => {
      this.updateView();
    });
  }

  deleteItem(e, item) : any {
    this.generalService.httpDelete(`${this.generalService.serverAPIUrl}/_api/${this.collectionName}/${item._id}`).then(() => {
      this.updateView();
    });
  }

//   --- Item delete END ---

//   --- Item quick change ---

  toggleItemEdit(e, item) : any {
    if (item.ngProps.Editable == true) {
      item.ngProps.Editable = false;
      this.itemEditModeActive = false;
    } else if (!this.itemAddModeActive) {
      item.ngProps.Editable = true;
      this.editableItem = item;
      this.itemEditModeActive = true;
    }
  }

  saveEditableItem() : any {
    let tempEditableItem = {};
    Object.keys(this.editableItem).forEach((objKey) => tempEditableItem[objKey] = this.editableItem[objKey]);
    let editableItemRow: NodeListOf<Element> = document.querySelectorAll('.ls-list .editable td[key] > div[contenteditable]');
    for (let i: number = 0; i < editableItemRow.length; ++i) {
      let key = editableItemRow[i].parentNode.attributes.getNamedItem('key').value;
      let value = editableItemRow[i].textContent.trim();
      tempEditableItem[key] = value;
    }
    delete tempEditableItem['_id'];
    delete tempEditableItem['ngProps'];
    delete tempEditableItem['Company'];
    this.generalService.httpUpdate(`${this.generalService.serverAPIUrl}/_api/${this.collectionName}/${this.editableItem['_id']}`, tempEditableItem).then(() => {
      this.itemEditModeActive = false;
      this.updateView();
    });
  }

  //   --- Item quick change END ---

  //   --- Item quick add ---

  toggleItemAdd() : any {
    if (!this.itemEditModeActive) 
      this.itemAddModeActive = true;
  }

  saveNewItem() : any {
    let tempEditableItem = {};
    let editableItemRow: NodeListOf<Element> = document.querySelectorAll('.ls-list .new td[key] > div[contenteditable]');
    for (let i: number = 0; i < editableItemRow.length; ++i) {
      let key = editableItemRow[i].parentNode.attributes.getNamedItem('key').value;
      let value = editableItemRow[i].textContent.trim();
      tempEditableItem[key] = value;
    }
    delete tempEditableItem['_id'];
    delete tempEditableItem['Company'];
    this.generalService.httpPost(`${this.generalService.serverAPIUrl}/_api/${this.collectionName}`, tempEditableItem).then(() => {
      this.itemAddModeActive = false;
      this.updateView();
    });
  }

  //   --- Item quick add END ---

  //   --- Pagination ---

  paginationChange(direction: string) : any { 
    if (direction == "prev") 
      --this.pageNumber;
    else if (direction == "next")
      ++this.pageNumber;
    this.updateView();
  }

  //   --- Pagination END ---

  //   --- Search ---

  openListSearchDlg() : any {
    let dialogRef = this.dialog.open(ListSearchDlgComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.searchInfo= result;
        this.pageNumber = 1;
        this.updateView();
      }
    });
  }

  public cancelSearch() : void {
    this.searchInfo = null;
    this.updateView();
  }

    //   --- Search END---

}




