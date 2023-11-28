import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { Project } from '../../dashboard/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // todo: crear variable de entorno de ruta (url backend)
  private readonly baseUrl: string = 'http://localhost:4000/api';
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

  getProjects(project: string): Observable<Project[]> {
    const url = `${this.baseUrl}/projects/?project=${project}`;

    return this.http.get<Project[]>(url, this.headers)
      .pipe(
        // delay(1000),
        map((resp) => resp),
        catchError(err => throwError(() => err.error
        ))
      );
  }

  getProject(project: string): Observable<Project> {
    const url = `${this.baseUrl}/projects/${project}`;

    return this.http.get<Project>(url, this.headers)
      .pipe(
        // delay(1000),
        map((resp) => resp),
        catchError(err => throwError(() => err.error
        ))
      );
  }

  addProject(project: { nombre: string, descripcion: string, clave: string }):Observable<string> {
    const url = `${this.baseUrl}/projects`;

    return this.http.post<string>(url, project, this.headers)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(err => throwError(() => err.error))
      );
  }

  deleteProject(id: string): Observable<string> {
    const url = `${this.baseUrl}/projects/${id}`;

    return this.http.delete<string>(url, this.headers)
      .pipe(
        // delay(3000),
        map((res) => {
          return res;
        }),
        catchError(err => throwError(() => {
          return err;
        }))
      );
  }

}
