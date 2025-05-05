
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceDeprecated {
  constructor() {}
  localStorageUsername: string | null = null;
  localStoragePassword: string | null = null;
  isAuthenticated: string | null = null;
  oAuthResult: boolean = false;

  checkAuthentication(): boolean {
    return this.getDbContextLocalStorageIsAuthenticated();
  }

  loginWithGoogle(){
    debugger;
    google.accounts.id.initialize({
      client_id: '434258960620-qqm047vdu0pfi9j87mem8l47oa23c5b5.apps.googleusercontent.com',
      callback: (resp: any) => {
        console.log(resp);
      }
    });
    google.accounts.id.prompt();
  }

  //Google Login authenticator
  // Initialize Google Sign-In and return the callback response
  initializeGoogleSignIn() {
    debugger;
    // Ensure google is available (loaded via script in index.html)
    if (typeof google === 'undefined') {
      console.error('Google Identity Services script not loaded.');
      return;
    }

    google.accounts.id.initialize({
      client_id: environment.googleClientId, // Use environment variable
      callback: (resp: any) => {
        debugger;
        console.log('Google Sign-In Response:', resp);
        // Handle the response (e.g., send resp.credential to backend)
        if (resp.credential) {
          this.setDbContextLocalStorageIsAuthenticated(true);
        }
      }
    });
  }
  // Render the Google Sign-In button in the specified DOM element
  renderGoogleButton(element: HTMLElement | null): void {
    if (!element) {
      console.error('Element for Google button not found.');
      return;
    }

    google.accounts.id.renderButton(element, {
      theme: 'outline', // Button style: 'outline', 'filled_blue', etc.
      size: 'large'     // Button size: 'small', 'medium', 'large'
    });
  }

  login(username : string, password: string): boolean{
    if(this.getDbContextLocalStorageCreds(username, password)){
        this.setDbContextLocalStorageIsAuthenticated(true);
    }
    else
    {
      this.setDbContextLocalStorageIsAuthenticated(false);
    }
    return this.checkAuthentication();
  }

  logoff():void{
    this.setDbContextLocalStorageIsAuthenticated(false);
    if (typeof google != 'undefined') {
      google.accounts.id.disableAutoSelect();
    }
    
  }

  getDbContextLocalStorageCreds(username: string, password: string) : boolean{
    this.localStorageUsername = localStorage.getItem('username');
    this.localStoragePassword = localStorage.getItem('password');
    if(this.localStorageUsername && this.localStorageUsername === username)
    {
      if(this.localStoragePassword && this.localStoragePassword === password)
      {
          return true;
      }
    }
    return false
  }
  getDbContextLocalStorageIsAuthenticated(): boolean{
    this.isAuthenticated = localStorage.getItem('isAuthenticated');
    if (this.isAuthenticated && this.isAuthenticated === 'true')
    {
      return true;
    }
    return false;
  }
  setDbContextLocalStorageIsAuthenticated(value: boolean): void{
    if (value)
    {
      localStorage.setItem('isAuthenticated','true');
    }
    else{
      localStorage.setItem('isAuthenticated','false');
    }
  }

}
