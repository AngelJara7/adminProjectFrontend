import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthServiceInterceptor implements HttpInterceptor {

  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const reqClone = request.clone();

    return next.handle(reqClone).pipe(
      map(res => res),
      catchError(err => throwError(() => {
        console.log({err});
        switch (err.status) {
          case 500:
            this.router.navigateByUrl('/server-internal-error');
            return;

           case 0:
             this.router.navigateByUrl('/server-internal-error');
             return;

          case 404:
            this.router.navigateByUrl('/not-found');
            return;

          case 403:
            // this.router.navigateByUrl('/not-found');
            return err;

          case 400:
            return err;
        }
      }))
    );
  }
}
