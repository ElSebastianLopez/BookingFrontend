import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuxiliarService } from '../Services/auxiliar.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auxiliarService: AuxiliarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | null = localStorage.getItem('token');

    // Clonar la solicitud y añadir el token de autorización
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        // Manejar errores según el código de estado
        if (err.status === 401) {
          sessionStorage.clear();
          this.auxiliarService.toastFuntionError(err.error.message);
          this.router.navigate(['/login']);
        } else if (err.status === 404 || err.status === 400 || err.status === 500) {
          this.auxiliarService.toastFuntionError(err.error.message);
          if (err.status === 404) {
            this.router.navigate(['/login']);
          }
        }

        return throwError(() => err);
      })
    );
  }
}
