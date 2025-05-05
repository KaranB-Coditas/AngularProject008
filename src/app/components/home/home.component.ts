import { Component, inject } from '@angular/core';
import { GraphchartComponent } from '../ui/graphchart/graphchart.component';
import { StatsComponent } from '../ui/stats/stats.component';
import { LeaderboardComponent } from '../ui/leaderboard/leaderboard.component';
import { SessionmonitorComponent } from '../ui/sessionmonitor/sessionmonitor.component';
import { SkeletonModule } from 'primeng/skeleton';
import { OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CrmintegrationService } from '../../service/crmintegration.service';
import { CrmconfigurationComponent } from '../ui/crmconfiguration/crmconfiguration.component';
import { Dialog } from 'primeng/dialog';
@Component({
  selector: 'app-home',
  imports: [Dialog,CrmconfigurationComponent,SkeletonModule,GraphchartComponent, StatsComponent, LeaderboardComponent, SessionmonitorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  showCrmDialog: boolean = false;
  

  authService = inject(AuthService);
  router = inject(Router);
  crmIntegrationService = inject(CrmintegrationService);

  ngOnInit(): void {
    this.verifyUserAccessId();
  }

  verifyUserAccessId() {
    const userAccessId = this.authService.getDbContextLocalStorageUserAccessId();
    const isAuthenticated = this.authService.getDbContextLocalStorageLoginStatus();

    if(isAuthenticated && userAccessId !== ''){
      this.authService.userLoginStatus({userAccessId: userAccessId})
      .subscribe({
        next: (response) => {
          if(response.status === 'success'){
            this.verifyUserCrmIntegration(userAccessId);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.router.navigate(['/login']);
        }
      })
    }
  }
  verifyUserCrmIntegration( userAccessId: string) {
    this.crmIntegrationService.authStatus({ userAccessId: userAccessId })
      .subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            localStorage.setItem('isCrmVerified', 'true');
            this.showCrmDialog = false;
          }
          else{
            localStorage.setItem('isCrmVerified', 'false');
            this.showCrmDialog = true;
          }
        },
        error: (error) => {
          localStorage.setItem('isCrmVerified', 'false');
          this.showCrmDialog = true;
        }
      });
  }
  
}
