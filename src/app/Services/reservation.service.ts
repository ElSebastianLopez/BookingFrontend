import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly APIUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetAllReservationByIdCustomerApiService(): Observable<any> {
    return this.http.get(
      `${this.APIUrl}Reservations/GetAllReservationByIdCustomer`
    );
  }
  GetByIdReservationApiService(id: number): Observable<any> {
    return this.http.get(`${this.APIUrl}Reservations/GetByIdReservation/${id}`);
  }
  CreateReservationApiservice(data: any): Observable<any> {
    return this.http.patch(
      `${this.APIUrl}Reservations/AddOrEditReservation`,
      data
    );
  }
  EditReservationApiservice(data: any): Observable<any> {
    return this.http.patch(
      `${this.APIUrl}Reservations/AddOrEditReservation`,
      data
    );
  }
  DeleteReservationApiservice(id: number): Observable<any> {
    return this.http.delete(
      `${this.APIUrl}Reservations/DeleteReservation/${id}`
    );
  }
  CancelReservationApiService(id: number): Observable<any> {
    return this.http.get(`${this.APIUrl}Reservations/CancelReservation/${id}`);
  }
  BuyReservation(id: number): Observable<any> {
    return this.http.get(`${this.APIUrl}Reservations/BuyReservation/${id}`);
  }
}
