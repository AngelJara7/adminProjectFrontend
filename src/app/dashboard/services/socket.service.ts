import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public io = io('http://localhost:4000/', {
    withCredentials: true,
    autoConnect: true
  });

  constructor() {}

  loadProjects(user: string) {
    this.io.emit('load projects', user);
  }

  addProject() {
    this.io.emit('create project');
  }

  loadImg() {
    this.io.emit('load img');
  }
}
