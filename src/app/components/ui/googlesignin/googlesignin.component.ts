import { Component, AfterViewInit, inject  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-googlesignin',
  imports: [],
  templateUrl: './googlesignin.component.html',
  styleUrl: './googlesignin.component.css'
})
export class GooglesigninComponent implements AfterViewInit  {

  router = inject(Router);
  authService = inject(AuthService);

  ngAfterViewInit() {
    (window as any).google.accounts.id.initialize({
      client_id: '434258960620-qqm047vdu0pfi9j87mem8l47oa23c5b5.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      ux_mode: 'popup',
      auto_select: false
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large', text: 'signin_with' }
    );
  }

  handleCredentialResponse(response: any) {
    console.log('Google Auth Response:', response);
    alert('Login successful!');
    this.authService.setDbContextLocalStorageIsAuthenticated(true);
    this.router.navigate(['/home']);
  }
}
