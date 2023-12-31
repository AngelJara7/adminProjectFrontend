import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse } from '../../auth/interfaces';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({providedIn: 'root'})

export class AuthService {

  private readonly baseUrl = `${environment.base_url}/api/users`;
  private http = inject(HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() { this.checkAuthStatus().subscribe() }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    }
  }

  //* Establece el estado de la sesion del usuario y guarda el token
  setAuthentication(user: User, token: string,) {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(err => throwError(() => err ))
      )
  }

  register(body: {}): Observable<string> {
    const url = `${this.baseUrl}/register`;

    return this.http.post<string>(url, body)
      .pipe(
        map(( msg ) => {
          return msg;
        }),
        catchError(err => throwError(()=> err))
      )
  }

  //* Solicitud para cambio de contraseña por el email de usuario
  requestChangePassword(email: string):Observable<string> {
    const url = `${this.baseUrl}/reset-password`;
    const body = { email }

    return this.http.post<string>(url, body)
      .pipe(
        map((msg) => {
          return msg;
        }),
        catchError(err => throwError(() => err))
      );
  }

  //* Verificar el estado de la sesion del usuario (ver Auth-Guard)
  checkAuthStatus():Observable<boolean> {
    const url = `${this.baseUrl}/profile`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  confirmAccount(id: string): Observable<User> {
    const url = `${this.baseUrl}/confirm-account/${id}`;

    return this.http.get<User>(url)
      .pipe(
        catchError(err => throwError(() => err))
      )
  }

  //* Verifica el token del usuario con el del backend
  verifyToken(token: string):Observable<string> {
    const url = `${this.baseUrl}/reset-password/${token}`;

    return this.http.get<string>(url)
      .pipe(
        map((user) => user),
        catchError(() => throwError(() => null))
      );
  }

  searchUser(id: string): Observable<User> {
    const url = `${this.baseUrl}/user/${id}`;

    return this.http.get<User>(url, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      )
  }

  //* Hace uso de la solicitud de cambio de contraseña
  changePassword(password: string, token: string):Observable<string> {
    const body = { password };
    const url = `${this.baseUrl}/reset-password/${token}`;

    return this.http.post<string>(url, body)
      .pipe(
        map((msg) => {
          return msg;
        }),
        catchError(err => throwError(() => err))
      )
  }

  editProfile(user: User): Observable<string> {
    const url = `${this.baseUrl}/profile`;

    return this.http.put<string>(url, user, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err.error))
      );
  }

  updatePassword(currentPassword: string, newPassword: string): Observable<string> {
    const url = `${this.baseUrl}/update-password`;
    const body = { currentPassword, newPassword };

    return this.http.put<string>(url, body, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err.error))
      );
  }

  uploadImg(file: File | undefined): Observable<string> {
    const url = `${this.baseUrl}/upload-img`;
    const fd = new FormData();

    if(file) {
      fd.append('image', file);
    }

    return this.http.put<string>(url, fd, this.headers)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(err => throwError(() => {
          return err;
        }))
      );
  }

}