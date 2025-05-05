import { CanActivateFn } from '@angular/router';
import {AuthService} from '../service/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getDbContextLocalStorageLoginStatus();
};
