import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces';

@Injectable({providedIn: 'root'})

export class AuthService {

  // todo: crear variable de entorno de ruta (url backend)
  private readonly baseUrl: string = 'http://localhost:4000/api/users';
  private http = inject(HttpClient);

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ token, ...user }) => {
          console.log('user', user);
          console.log(token);
          return true;
        }),
        catchError(err => throwError(() => {
          console.log('error', {err});
        }))
      )
  }

}