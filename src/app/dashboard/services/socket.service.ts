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

  loadProjects(user: string) {
    this.io.emit('load projects', user);
  }

  editingProjects() {
    this.io.emit('editing projects');
  }

  editProfile() {
    this.io.emit('edit profile');
  }
}
