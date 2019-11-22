import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
     
        if (error.status === 401) {
          // refresh token
        }else if(error.status === 0){
        alert('Run the JsonServer');
        }else if(error.status === 25){
          alert('Limit Reached');
          }
         else {
          return throwError(error);
        }
      })
    );
  }
}
