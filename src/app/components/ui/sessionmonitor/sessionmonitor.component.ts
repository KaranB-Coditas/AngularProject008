import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
@Component({
  selector: 'app-sessionmonitor',
  imports: [CardModule,Skeleton],
  templateUrl: './sessionmonitor.component.html',
  styleUrl: './sessionmonitor.component.css'
})
export class SessionmonitorComponent {

}
