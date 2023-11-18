import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';
import { SocketService } from 'src/app/dashboard/services/socket.service';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  private userService = inject(AuthService);
  private router = inject(Router);
  private socket = inject(SocketService);

  public viewOptionsProfile: boolean = false;
  public user = signal<User|null>(null);
  public img: string = '';

  constructor() {
    this.loadUser();

    this.socket.io.on('edited profile', () => {
      this.userService.checkAuthStatus().subscribe(() => this.loadUser());
    });

  }

  loadUser() {
    this.user.set(this.userService.currentUser());

    if (!this.user()) return;

    !this.user()?.foto
    ? this.img = '../../../../assets/img/user_circle.svg'
    : this.img = `http://localhost:4000/${this.user()?.foto}`;
  }

  viewProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  navigateUserProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
    this.router.navigateByUrl(`/dashboard/user/${this.user()?._id}`);
  }

  navigateProjects() {
    this.router.navigateByUrl('/dashboard/projects');
  }

}
