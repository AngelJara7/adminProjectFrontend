import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, delay, map, throwError } from 'rxjs';
import { Project } from '../models/project.model';
import { User } from 'src/app/auth/interfaces';
import { Collaborators } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // todo: crear variable de entorno de ruta (url backend)
  private readonly baseUrl: string = 'http://localhost:4000/api';
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

  searchCollaborator(email: string):Observable<User[]> {
    const url = `${this.baseUrl}/projects/collaborators`;

    return this.http.post<User[]>(url, {email}, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  addCollaborator(colaborador: Collaborators, idProject: string): Observable<string> {
    const url = `${this.baseUrl}/projects/collaborators/${idProject}`;

    return this.http.post<string>(url, colaborador, this.headers)
      .pipe(
        map(res => res
        ),
        catchError(err => throwError(() => err))
      );
  }

  updateCollaborator(colaborador: Collaborators, idProject: string):Observable<string> {
    const url = `${this.baseUrl}/projects/collaborators/${idProject}`;

    return this.http.put<string>(url, colaborador, this.headers)
      .pipe(
        map(res =>  res),
        catchError(err => throwError(() => err))
      );
  }

  deleteColaborator(colaborador: Collaborators, idProject: string): Observable<string> {
    const url = `${this.baseUrl}/projects/delete-collaborator/${idProject}`;

    return this.http.post<string>(url, colaborador, this.headers)
      .pipe(
        map(res => res,
        ),
        catchError(err => throwError(() => err))
      );
  }

}
