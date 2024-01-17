import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../models';
import { Collaborators } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private readonly baseUrl = `${environment.base_url}/api/collaborators`;
  private http = inject(HttpClient);

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    }
  }

  searchCollaborator(email: string):Observable<User[]> {
    const url = `${this.baseUrl}/?email=${email}`;

    return this.http.get<User[]>(url, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  addCollaborator(colaborador: Collaborators): Observable<string> {
    const url = `${this.baseUrl}`;

    return this.http.post<string>(url, colaborador, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  updateCollaborator(colaborador: Collaborators):Observable<string> {
    const url = `${this.baseUrl}/${colaborador._id}`;

    return this.http.put<string>(url, colaborador, this.headers)
      .pipe(
        map(res =>  res),
        catchError(err => throwError(() => err))
      );
  }

  deleteCollaborator(idCollaborator: string): Observable<string> {
    const url = `${this.baseUrl}/${idCollaborator}`;

    return this.http.delete<string>(url, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

}
