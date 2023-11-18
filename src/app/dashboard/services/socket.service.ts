import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { StatusToastNotification } from '../interfaces/status-toast-notification.interface';

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

  project(statusToastNotification: StatusToastNotification) {
    this.io.emit('project', statusToastNotification);
  }

  editProfile(statusToastNotification: StatusToastNotification) {
    this.io.emit('edit profile', statusToastNotification);
  }
}
