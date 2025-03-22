import { Component } from '@angular/core';
import { GraphchartComponent } from '../ui/graphchart/graphchart.component';
import { StatsComponent } from '../ui/stats/stats.component';
import { LeaderboardComponent } from '../ui/leaderboard/leaderboard.component';
import { SessionmonitorComponent } from '../ui/sessionmonitor/sessionmonitor.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home',
  imports: [SkeletonModule,GraphchartComponent, StatsComponent, LeaderboardComponent, SessionmonitorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
