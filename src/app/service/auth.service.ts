import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.registeruser, {params: data});
  }
  login(data: any) : Observable<any>{
    return this.http.get(environment.crmIntegrationBaseUrl+environment.login, {params: data});
  }
  logout(data: any) : Observable<any>{
    return this.http.get(environment.crmIntegrationBaseUrl+environment.logout, {params: data});
  }
  getDbContextLocalStorageUserAccessId(): string{ 
    const userAccessId = localStorage.getItem('userAccessId');
    if(userAccessId)
      return userAccessId;
    else
      return '';
  }
  setDbContextLocalStorageUserAccessId(value: string): void{
    localStorage.setItem('userAccessId',value);
    this.setDbContextLocalStorageLoginStatus(true);
  }
  userLoginStatus(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.userloginstatus, {params: data});
  }
  getDbContextLocalStorageLoginStatus(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated && isAuthenticated === 'true') {
      return true;
    } else {
      return false;
    }
  }
  setDbContextLocalStorageLoginStatus( value: boolean) {
    localStorage.setItem('isAuthenticated', value.toString());
  }
}
