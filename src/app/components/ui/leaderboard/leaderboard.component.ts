import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Skeleton } from 'primeng/skeleton';
@Component({
  selector: 'app-leaderboard',
  imports: [CardModule,Skeleton],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

}
