import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrmintegrationService {

  constructor(private http: HttpClient) { }

  
  verify(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.verify, {params: data});
  }
  authStatus(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.status, {params: data});
  }
  fetchCrmData(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.fetchCrmData, {params: data});
  }
  refreshToken(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.refreshcrmtoken, {params: data});
  }
  updateList(data: any): Observable<any> {
    return this.http.get(environment.crmIntegrationBaseUrl+environment.updatelist, {params: data});
  }
  
}
