import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry, catchError, debounceTime, debounce, finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/loader.service';
import { LogService } from './log.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService,public logger:LogService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe(
      retry(1),
      finalize(() => this.loaderService.hide()),
      catchError((error: HttpErrorResponse) => {
     
        if (error.status === 401) {
          // refresh token
        }else if(error.status === 0 && error.statusText=='Unknown Error'&& error.url==null){
        alert('Run the JsonServer');
        this.logger.log('JSON server is not running','')
        }else if(error.status === 429){
         this.logger.log('Tried to retrive more records','')
          }
         else {
          return throwError(error);
        }
      })
    );
  }


}
