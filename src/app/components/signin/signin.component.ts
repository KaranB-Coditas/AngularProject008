import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';

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
  router = inject(Router);
  fullname: string = '';
  email: string = '';
  enterpassword: string = '';
  reenterpassword: string = '';
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

    if(this.fullname === "" 
      || this.email === "" 
      || this.enterpassword === "" 
      || this.reenterpassword === ""
    ){
      this.showWarn("Please enter all field values");
      this.allClear = false;
    }
    if(this.enterpassword != this.reenterpassword){
      this.showWarn("Please enter same password");
      this.allClear = false;
    }
    if(this.allClear){
      this.showSuccess();

      setTimeout(()=>{
        this.router.navigate(['/login']);
      },2000);
      
    }
  }
}
