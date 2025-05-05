declare var google: any;
import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { AutoFocus } from 'primeng/autofocus';
import { GooglesigninComponent } from '../ui/googlesignin/googlesignin.component';


@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, FormsModule, Toast, AutoFocus, GooglesigninComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  @ViewChild('signinDiv') signinDiv!: ElementRef;

  authService = inject(AuthService);
  username: string = '';
  password: string = '';

  router = inject(Router);
  messageService = inject(MessageService);


  loginWithGoogle(){
    debugger;
    google.accounts.id.initialize({
      client_id: '434258960620-qqm047vdu0pfi9j87mem8l47oa23c5b5.apps.googleusercontent.com',
      callback: (resp: any) => {
        console.log(resp);
      }
    });
    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: 'outline',
      size: 'large'
    });
  }

  ngOnInit(): void {
    const userAccessId = this.authService.getDbContextLocalStorageUserAccessId();
    const isAuthenticated = this.authService.getDbContextLocalStorageLoginStatus();
    if(isAuthenticated && userAccessId !== ""){
      this.router.navigate(['/home']);
    }
  }
  
  onCancel() {
    // Add logic for cancel action (e.g., redirect or reset form)
    console.log('Cancel clicked');
  }

  onRegistration() {
    this.router.navigate(['/registration']);
  }

  onLogin() {
    debugger;
    this.authService.login({ email: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            this.authService.setDbContextLocalStorageUserAccessId(response.userAccessId);
            this.authService.setDbContextLocalStorageLoginStatus(true);
            this.showSuccess();
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.authService.setDbContextLocalStorageUserAccessId("");
          this.authService.setDbContextLocalStorageLoginStatus(false);
          this.showWarn();
        }
      });
  }

  showSuccess() {
    debugger;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged In' });
  }
  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Login Failed', detail: 'Incorrect Credentials' });
  }
}
