import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // todo: crear variable de entorno de ruta (url backend)
  private readonly baseUrl: string = 'http://localhost:4000/api';
  private http = inject(HttpClient);

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

  getProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`;

    return this.http.get<Project[]>(url, this.headers)
      .pipe(
        map((resp) => resp),
        catchError(err => throwError(() => err.error
        ))
      );
  }

  addProject(project: { nombre: string, descripcion: string, fecha: Date, clave: string }):Observable<string> {
    const url = `${this.baseUrl}/projects`;

    return this.http.post<string>(url, project, this.headers)
      .pipe(
        map((res) => {
          console.log('RESPUESTA:', res);
          return res;
        }),
        catchError(err => throwError(() => {
          console.log('ERROR:', {err});
          return err;
        }))
      );
  }

}
