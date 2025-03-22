import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatHeaderPipe } from '../../../pipes/format-header.pipe';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker'

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
  selector: 'app-reporttable',
  imports: [CardModule,TableModule,DatePicker,CommonModule,FormatHeaderPipe,ButtonModule,IconField,InputIcon,Select,FormsModule],
  templateUrl: './reporttable.component.html',
  styleUrl: './reporttable.component.css'
})
export class ReporttableComponent implements OnInit {
  rowData: RowData[] = [];
  column: Column[] = [];
  first = 0;
  rows = 10;
  rangeDates: Date[]  = [new Date(), new Date()];

  fetching: boolean = false;
  exporting: boolean = false;

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
    this.loadTableData();
    this.fetchColumnsFromTableData()
    this.reports = [
      { name: 'Coversation History', code: 'CH' },
      { name: 'Attempt History', code: 'AH' },
      { name: 'Session Report', code: 'SR' }
  ];
  }

  clickHere(){
    debugger;
    this.selectedProduct;
  }

  fetchColumnsFromTableData(){
    if(this.rowData != null && this.rowData.length > 0){
      this.column = Object.keys(this.rowData[0]).map((key) => ({
        fieldType: typeof this.rowData[0][key as keyof RowData], 
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
}
