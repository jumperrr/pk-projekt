import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let headers = request.headers.set('Content-Type', 'application/json');
      headers = request.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
      request = request.clone({
        headers
      });
    return next.handle(request);
  }
}
