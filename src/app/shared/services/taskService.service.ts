import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = `${environment.base_url}/api/tasks`;
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

  addTask(task: Task): Observable<string> {
    const url = `${this.baseUrl}`;

    return this.http.post<string>(url, task, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  updateTask(task: Task, idTask: string):Observable<string> {
    const url = `${this.baseUrl}/${idTask}`;

    return this.http.put<string>(url, task, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

  deleteTask(idTask: string): Observable<string> {
    const url = `${this.baseUrl}/${idTask}`;

    return this.http.delete<string>(url, this.headers)
      .pipe(
        map(res => res),
        catchError(err => throwError(() => err))
      );
  }

}
