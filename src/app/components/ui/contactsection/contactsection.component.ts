import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { Router, ActivatedRoute } from '@angular/router';
import { CrmintegrationService } from '../../../service/crmintegration.service';
import { Skeleton } from 'primeng/skeleton';
import { ProgressSpinner } from 'primeng/progressspinner';

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

interface ContactRowData {
  name: string;
  email: string;
  phone: string;
  homePhone: string;
  mobilePhone: string;
  title: string;
  department: string;
}

interface Column {
  fieldType: string;
  headerName: string;
}

interface Report {
  name: string;
  code: string;
}
interface OutcomeStatus {
  id: number;
  name: string;
}

interface contact {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber1: string;
  contactNumber2: string;
  address: string;
}

@Component({
  selector: 'app-contactsection',
  imports: [ProgressSpinner,Skeleton,DatePickerModule,TextareaModule,ScrollPanelModule,PanelModule,DataViewModule,DialogModule,DividerModule,CardModule,Menubar, MenubarModule,TableModule,DatePicker,CommonModule,FormatHeaderPipe,ButtonModule,IconField,InputIcon,Select,FormsModule],
  templateUrl: './contactsection.component.html',
  styleUrl: './contactsection.component.css'
})



export class ContactsectionComponent implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  crmintegrationService = inject(CrmintegrationService);
  changeDetectorRef = inject(ChangeDetectorRef);

   rowData: RowData[] = [];
    column: Column[] = [];
    contacts: contact[] = [];

    rowData1: ContactRowData[] = [];

    first = 0;
    rows = 10;
    rangeDates: Date[]  = [new Date(), new Date()];
    listOptions: MenuItem[] | undefined;
    noteText: string = '';
    followupDate: Date = new Date;

    outcomeStatus: OutcomeStatus[] = [];

    selectedOutcome: OutcomeStatus | undefined;


    dialogVisible: boolean = false;
  
    fetching: boolean = false;
    exporting: boolean = false;

    totalContacts: number = 0;

    isContactLoading: boolean = true;

    showDialog() {
      this.dialogVisible = true;
  }

  backToList(){
    this.router.navigate(['../lists'], { relativeTo: this.route });
  }

  loadOutcomeStatus(){
    this.outcomeStatus = [
      {
      name: 'Open',
      id: 1
      },
      {
        name: 'Closed',
        id: 2
      },
      {
        name: 'New',
        id: 3
      }
      
    ]
  }

  
  listData(): contact[]{
      return this.contacts;
  }
  
  
    loadListOptionData() {
      this.listOptions = [
          {
              label: 'Dial',
              icon: 'pi pi-phone'
          }
      ]
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
  
    reports: Report[] | undefined;
  
    selectedReport: Report | undefined;
  
    selectedProduct: RowData[] = [];
  
    ngOnInit(): void {
      
      this.reports = [
        { name: 'Coversation History', code: 'CH' },
        { name: 'Attempt History', code: 'AH' },
        { name: 'Session Report', code: 'SR' }
      ];
      this.loadListOptionData();
      this.loadContacts();
      this.loadOutcomeStatus();

      this.loadTableData();
      this.fetchColumnsFromTableData()
      this.loadCrmContacts();
    }

    loadCrmContacts(){

      this.crmintegrationService.fetchCrmData({userId: '1', objectType: localStorage.getItem('selectedSfObject')}).subscribe({
        next: (response) => {
          console.log('Fetch response:', response);
          this.loadSfContacts(response.data.records);
          this.isContactLoading = false;
        },
        error: (error) => {
          console.error('Fetch failed:', error.message);
        }
      });

    }

    loadSfContacts(data: any){
      debugger;
      
      this.rowData1 = data.map((element: any) => ({
        name: element.name ?? "",
        email: element.email ?? "",
        phone: element.phone ?? "",
        homePhone: element.homePhone ?? "",
        mobilePhone: element.mobilePhone ?? "",
        title: element.title ?? "",
        department: element.department ?? ""
      }));
    }

  
    clickHere(){
      debugger;
      this.selectedProduct;
    }
  
    fetchColumnsFromTableData(){
      if(this.rowData1 != null && this.rowData1.length > 0){
        this.column = Object.keys(this.rowData1[0]).map((key) => ({
          fieldType: typeof this.rowData1[0][key as keyof ContactRowData], 
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
  exportCSV(){
  
  }
  
    loadTableData(){
      this.rowData1 = [
        {
          name: '',
          email: '',
          phone: '',
          homePhone: '',
          mobilePhone: '',
          title: '',
          department: ''
        }
      ]

      this.rowData = [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
          id: '1001',
          code: 'f230fh0g31',
          name: 'Bamboo Watch1',
          description: 'Product Description1',
          image: 'bamboo-watch.jpg1',
          price: 651,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '1002',
          code: 'f230fh0g32',
          name: 'Bamboo Watch2',
          description: 'Product Description2',
          image: 'bamboo-watch.jpg2',
          price: 652,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '1003',
          code: 'f230fh0g33',
          name: 'Bamboo Watch3',
          description: 'Product Description3',
          image: 'bamboo-watch.jpg3',
          price: 653,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '1004',
          code: 'f230fh0g34',
          name: 'Bamboo Watch4',
          description: 'Product Description4',
          image: 'bamboo-watch.jpg4',
          price: 654,
          category: 'Accessories4',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
            id: '10005',
          code: 'f230fh0g3',
          name: 'Bamboo Watch',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        }
      ];
    }

    loadContacts(){
      this.contacts = [
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        },
        {
          id: 1,
          firstName: 'Karan',
          lastName: 'B',
          contactNumber1: '9876787678',
          contactNumber2: '9878987656',
          address: 'Nagpur'
        }
  
      ]
    }
}
