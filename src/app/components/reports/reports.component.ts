import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ReporttableComponent } from '../ui/reporttable/reporttable.component';
import { ReportheaderComponent } from '../ui/reportheader/reportheader.component';
@Component({
  selector: 'app-reports',
  imports: [Skeleton, TableModule, ReporttableComponent, ReportheaderComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  products: any[] = [];

    ngOnInit() {
        this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    }
}
