import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'primeng/togglebutton';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { CrmintegrationService } from '../../../service/crmintegration.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-crmconfiguration',
  imports: [StepperModule,ButtonModule, FormsModule,ToggleButton,CardModule,ProgressSpinnerModule,CommonModule],
  templateUrl: './crmconfiguration.component.html',
  styleUrl: './crmconfiguration.component.css'
})
export class CrmconfigurationComponent implements OnInit, OnDestroy {
  isCrmVerified: boolean = false;
  ngOnInit(): void {
    this.isCrmVerified = localStorage.getItem('isCrmVerified') === 'true';
    if(this.isCrmVerified){
      this.router.navigate(['/home']);
    }
  }
  router = inject(Router);
  authService = inject(AuthService);
  crmIntegrationService = inject(CrmintegrationService);
  isSfBtnRaised: boolean = false;
  isSlBtnRaised: boolean = false;
  isHsBtnRaised: boolean = false;
  isOtBtnRaised: boolean = false;
  isSfBtnDisabled: boolean = false;
  isSlBtnDisabled: boolean = false;
  isHsBtnDisabled: boolean = false;
  isOtBtnDisabled: boolean = false;
  response: any;
  error: string = "";
  
  isLoading = false;
  isAuthenticated = false;
  popup: Window | null = null;
  pollingInterval: any;
  retryCount = 0;
  maxRetries = 3;

  route = inject(ActivatedRoute)

  selectedCrm: string = 'salesforce';
  data = { crmName: 'salesforce', userId: 1 };

  verifyCrm(){
    this.isLoading = true;
    debugger;
    this.crmIntegrationService.verify({ userAccessId: this.authService.getDbContextLocalStorageUserAccessId() }).subscribe({
      next: (response) => {
        debugger;
        this.response = response;
        this.popup = window.open(this.response.authorizeUrl, 'popupWindow', 'width=800,height=600,left=200,top=100');
        if (!this.popup) {
          alert('Popup blocked! Please allow popups for this site.');
          this.isLoading = false;
          return;
        }
        setTimeout(() => this.startPolling(), 5000);
      },
      error: (error) => {
        this.isLoading = false;
        debugger;
        alert('Error: ' + error.message);
      }
    });
  }

  startPolling() {
    this.pollingInterval = setInterval(() => {
      if (this.retryCount >= this.maxRetries) {
        this.stopPolling();
        this.isLoading = false;
        this.notifyUser('Authentication timed out after 3 retries.');
        this.popup?.close();
        return;
      }

      this.checkAuthStatus();
      this.retryCount++;
      console.log(`Retry ${this.retryCount} of ${this.maxRetries}`);
    }, 5000);
  }

  checkAuthStatus() {
    debugger;
    this.crmIntegrationService.authStatus({ userAccessId: this.authService.getDbContextLocalStorageUserAccessId()})
      .subscribe({
        next: (response: any) => {
          console.log('Status response:', response);
          if (response.status === 'success') {
            localStorage.setItem('isCrmVerified', 'true');
            localStorage.setItem('OauthResponse', JSON.stringify(response));
            this.isLoading = false;
            this.notifyUser('Successfully authenticated with Salesforce!');
            this.stopPolling();
            this.popup?.close();
          }
        },
        error: (error) => {
          console.error('Status check failed:', error.message);
          localStorage.setItem('isCrmVerified', 'false');
        }
      });
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  notifyUser(message: string) {
    console.log('Notification:', message);
    alert(message);
  }

  setSelectedCrm(){
    localStorage.setItem('selectedCrm', this.selectedCrm);
  }

  clickSfBtn() {
    this.resetRaisedBtn();
    this.isSfBtnRaised = true;
    this.selectedCrm = 'salesforce';
  }
  clickHsBtn() {
    this.resetRaisedBtn();
    this.isHsBtnRaised = true;
    this.selectedCrm = 'hubspot';
  }
  clickSlBtn() {
    this.resetRaisedBtn();
    this.isSlBtnRaised = true;
    this.selectedCrm = 'salesloft';
  }
  ClickOtBtn() {
    this.resetRaisedBtn();
    this.isOtBtnRaised = true;
    this.selectedCrm = 'outreach';
  }
  resetRaisedBtn() {
    this.isSfBtnRaised = false;
    this.isSlBtnRaised = false;
    this.isHsBtnRaised = false;
    this.isOtBtnRaised = false;
  }
  checkCrmVerified(): boolean{
    if(localStorage.getItem('isCrmVerified') === 'true'){
      return true;
    }
    else{
      alert('Crm Not verified!!!');
      return false;
    }
  }
  crmVerified(){
    debugger;
    this.router.navigate(['/home/dialer']);
    window.location.reload();
  }

  ngOnDestroy() {
    this.stopPolling();
    if (this.popup) {
      this.popup.close();
    }
  }

}
