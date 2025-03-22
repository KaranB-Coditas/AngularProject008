import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { ListsectionComponent } from '../ui/listsection/listsection.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dialer',
  imports: [Skeleton, ListsectionComponent,RouterOutlet],
  templateUrl: './dialer.component.html',
  styleUrl: './dialer.component.css'
})
export class DialerComponent {

}
