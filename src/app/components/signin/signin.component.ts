import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signin',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    Toast,
    AutoFocus
  ],
  providers:[MessageService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  messageService = inject(MessageService);
  authService = inject(AuthService);
  router = inject(Router);

  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  companyId: number = 0;
  crmName: string = '';
  email: string = '';
  enterPassword: string = '';
  reenterPassword: string = '';
  allClear: boolean = false;

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered' });
  }
  showWarn(msg: string) {
    this.messageService.add({ severity: 'warn', summary: 'Registration Failed', detail: msg });
  }

  onCancel() {
  }

  onRegister() {
    this.allClear = true;
    debugger;
    if(this.firstName === "" 
      || this.lastName === ""
      || this.email === "" 
      || this.phoneNumber === "" 
      || this.companyId === 0 
      || this.crmName === ""
      || this.enterPassword === "" 
      || this.reenterPassword === ""
    ){
      this.showWarn("Please enter all field values");
      this.allClear = false;
    }
    if(this.enterPassword != this.reenterPassword){
      this.showWarn("Please enter same password");
      this.allClear = false;
    }
    if(this.allClear){
      this.authService.register({firstName: this.firstName,
        lastName: this.lastName, 
        phoneNumber: this.phoneNumber, 
        email: this.email, 
        password: this.enterPassword, 
        companyId: this.companyId, 
        crmName: this.crmName}).subscribe({
          next: (response) => {
            this.showSuccess();
            console.log(response);
            this.authService.setDbContextLocalStorageUserAccessId(response.userAccessId);
            this.router.navigate(['/crmconfiguration']);
          },
          error: (error) => {
            console.error(error);
            this.showWarn("Registration Failed. Please try again.");
          }
      })
    }
  }
}
