import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  readonly APIUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetAllServiceApiService(): Observable<any> {
    return this.http.get(`${this.APIUrl}Services/GetAllService`);
  }
}
