import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatHeaderPipe } from '../../../pipes/format-header.pipe';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker'
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Router, ActivatedRoute } from '@angular/router';
import { ProgressBar } from 'primeng/progressbar';
import { Dialog } from 'primeng/dialog';
import { CrmconfigurationComponent } from '../crmconfiguration/crmconfiguration.component';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CrmintegrationService } from '../../../service/crmintegration.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../../service/auth.service';

interface RowData {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

interface Column {
  fieldType: string;
  headerName: string;
}


interface Report {
  name: string;
  code: string;
}

@Component({
  selector: 'app-listsection',
  imports: [ProgressSpinnerModule,SelectModule,InputTextModule,CrmconfigurationComponent,Dialog,ProgressBar,CardModule,Menubar, MenubarModule,TableModule,DatePicker,CommonModule,FormatHeaderPipe,ButtonModule,IconField,InputIcon,Select,FormsModule],
  templateUrl: './listsection.component.html',
  styleUrl: './listsection.component.css'
})

export class ListsectionComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  
  rowData: RowData[] = [];
  column: Column[] = [];
  listDataColumn: Column[] = [];
  first = 0;
  rows = 10;
  rangeDates: Date[]  = [new Date(), new Date()];
  listOptions: MenuItem[] | undefined;
  listData: ListData[] = [];
  reports: Report[] | undefined;
  selectedReport: Report | undefined;
  selectedProduct: RowData[] = [];
  loader: boolean = true;

  fetching: boolean = false;
  exporting: boolean = false;

  isShowDialog: boolean = false;

  isCrmVerified: boolean = false;
  isEditMode: boolean = false;
  isClosableDialog: boolean = true;

  listName: string = '';
  dialogHeaderName: string = '';

  sfObjectOptions: any[] = [];
  selectedSfObject: any;

  isShowLoaderDialog: boolean = false;

  crmintegrationService = inject(CrmintegrationService);
  
  actionOn( data: RowData){
    debugger;
    this.selectedProduct = [];
    this.selectedProduct.push(data);
    this.processContacts();
    
  }
  loadListOptionData() {
    this.listOptions = [
        {
            label: 'Process',
            icon: 'pi pi-cloud-download',
            command: () => this.processContacts()
        },
        {
            label: 'Create',
            icon: 'pi pi-plus',
            command: () => this.showDialog(false)
        },
        {
            label: 'Edit',
            icon: 'pi pi-pen-to-square',
            command: () => this.showDialog(true)
        },
        {
            label: 'Archive',
            icon: 'pi pi-history'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        }
    ]
}

createList(){
  debugger;

  const list: ListData = new ListData();
  list.Name = this.listName;
  list.Type = this.selectedSfObject.label;
  list.CreatedOn = new Date().toUTCString();
  list.CreatedBy = 'Karan';
  list.UpdatedOn = new Date().toUTCString();
  
  this.listData.push(list);

  localStorage.setItem('listData', JSON.stringify(this.listData));

  this.listName = '';
  this.selectedSfObject = null;

}

processContacts() {
  this.router.navigate(['../contacts'], { relativeTo: this.route });
}

  load(event: any) {
    debugger;
    this.fetching = true;

    setTimeout(() => {
        this.fetching = false
    }, 2000);
  }

export(event: any) {
  debugger;
  this.exporting = true;

  setTimeout(() => {
      this.exporting = false
  }, 2000);
  }



  ngOnInit(): void {
    debugger;
    this.loadListOptionData();

    this.loadListData();
    this.fetchColumnsFromListData();

    this.isShowLoaderDialog = true;
    debugger;
    const oAuthResponse: any = JSON.parse(localStorage.getItem('OauthResponse') || '{}');
    const userId: string = "0";
    this.crmintegrationService.authStatus({ userAccessId: this.authService.getDbContextLocalStorageUserAccessId() })
      .subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            localStorage.setItem('isCrmVerified', 'true');
            this.isCrmVerified = true;
            
            this.showDialog();
            this.isShowLoaderDialog = false;
          }
        },
        error: (error) => {
          localStorage.setItem('isCrmVerified', 'false');
          this.isCrmVerified = false;
          
          this.showDialog();
          this.isShowLoaderDialog = false;
        }
      });

    this.sfObjectOptions = [
      { label: 'Contact', value: 'contact' },
      { label: 'Lead', value: 'lead' },
      { label: 'Account', value: 'account' }
    ]
  }

  showDialog(isEditList: boolean | null = null) {
    debugger;
    if(this.isCrmVerified){
      if(isEditList != null){
        if(isEditList){
          this.isEditMode = true;
          this.dialogHeaderName = 'Edit List';
        }
        else {
          this.isEditMode = false;
          this.dialogHeaderName = 'Add New List';
        }
        this.isShowDialog = true;
      }
      
    }
    else{
      this.isClosableDialog = false;
      this.isShowDialog = true;
      this.dialogHeaderName = 'Verify CRM';
    }
    
  }

  clickHere(){
    debugger;
    this.selectedProduct;
  }


  fetchColumnsFromListData(){
    if(this.listData != null && this.listData.length > 0){
      this.listDataColumn = Object.keys(this.listData[0]).map((key) => ({
        fieldType: typeof this.listData[0][key as keyof ListData], 
        headerName: key
      }));
    }
  }

  formatHeaderName(key: string): string {
    return key.replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase()); 
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  

  loadListData() {
    debugger;
    this.listData = JSON.parse(localStorage.getItem('listData') || '[]');
  }
}

class ListData{
  Name: string;
  Type: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;

  constructor(){
    this.Name = '';
    this.Type = '';
    this.CreatedOn = '';
    this.CreatedBy = '';
    this.UpdatedOn = '';
  }
}


