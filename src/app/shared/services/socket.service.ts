import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public io = io(`${environment.base_url}`, {
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

  editingCollaborators() {
    this.io.emit('editing collaborators');
  }
}
