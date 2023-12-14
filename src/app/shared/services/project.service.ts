import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { Project } from '../models/project.model';
import { Collaborators } from '../interfaces';
import { environment } from 'src/environments/environment';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // todo: crear variable de entorno de ruta (url backend)
  private readonly baseUrl = `${environment.base_url}/api/projects`;
  private http = inject(HttpClient);

  public _currentProject = signal<Project|null>(null);

  public currentProject = computed(() => this._currentProject());

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
    const url = `${this.baseUrl}/?project=${project}`;

    return this.http.get<Project[]>(url, this.headers)
      .pipe(
        // delay(1000),
        map((resp) => resp),
        catchError(err => throwError(() => err.error
        ))
      );
  }

  getProject(project: string): Observable<Project> {
    const url = `${this.baseUrl}/${project}`;

    return this.http.get<Project>(url, this.headers)
      .pipe(
        // delay(2000),
        map((res) => {
          this._currentProject.set(res);
          return res;
        }),
        catchError(err => throwError(() => err.error
        ))
      );
  }

  addProject(project: { nombre: string, descripcion: string, clave: string }):Observable<string> {
    const url = `${this.baseUrl}`;

    return this.http.post<string>(url, project, this.headers)
      .pipe(
        map((res) => res),
        catchError(err => throwError(() => err.error))
      );
  }

  deleteProject(id: string): Observable<string> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<string>(url, this.headers)
      .pipe(
        // delay(3000),
        map((res) => res),
        catchError(err => throwError(() => err))
      );
  }

  searchCollaborator(email: string):Observable<User[]> {
    const url = `${this.baseUrl}/collaborators`;

    return this.http.post<User[]>(url, {email}, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  addCollaborator(colaborador: Collaborators, idProject: string): Observable<string> {
    const url = `${this.baseUrl}/collaborators/${idProject}`;

    return this.http.post<string>(url, colaborador, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  updateCollaborator(colaborador: Collaborators, idProject: string):Observable<string> {
    const url = `${this.baseUrl}/collaborators/${idProject}`;

    return this.http.put<string>(url, colaborador, this.headers)
      .pipe(
        map(res =>  res),
        catchError(err => throwError(() => err))
      );
  }

  deleteColaborator(colaborador: Collaborators, idProject: string): Observable<string> {
    const url = `${this.baseUrl}/delete-collaborator/${idProject}`;

    return this.http.post<string>(url, colaborador, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  addColumn(nombre: string, idProject: string):Observable<string> {
    const url = `${this.baseUrl}/columns/${idProject}`;

    return this.http.post<string>(url, { nombre } , this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  updateColumn(nombre: string, idColumn: string, idProject: string): Observable<string> {
    const url = `${this.baseUrl}/columns/${idColumn}/${idProject}`;

    return this.http.put<string>(url, { nombre }, this.headers)
     .pipe(
      map(res => res),
      catchError(err => throwError(() => err))
     );
  }

  deleteColumn(columna: string, idColumn: string, idProject: string): Observable<string> {
    const url = `${this.baseUrl}/columns/${idColumn}/${idProject}`;

    return this.http.post<string>(url, { columna }, this.headers)
     .pipe(
      map(res => res),
      catchError(err => throwError(() => err))
     );
  }

}
