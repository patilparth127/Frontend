import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CommanInterceptor implements HttpInterceptor {

  constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let header = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        })
      };
      const modifiedRequest = request.clone(header) 
        return next.handle(modifiedRequest).pipe(
        tap((event: HttpEvent<any>) => {
          console.log('Incoming HTTP response', event);
        })
      );
  }}
