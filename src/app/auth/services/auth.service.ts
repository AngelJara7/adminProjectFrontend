import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({providedIn: 'root'})

export class AuthService {

  // todo: crear variable de entorno de ruta (url backend)
  private readonly baseUrl: string = 'http://localhost:4000/api/users';
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ token, user }) => {
          console.log(user)
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          // console.log(this.currentUser);
          return true;
        }),
        catchError(err => throwError(() => err.error ))
      )
  }

}