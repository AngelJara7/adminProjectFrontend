import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

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
  public user = computed(() => this.userService.currentUser());
  public img: string = '';

  constructor() {
    this.loadImg();

    this.socket.io.on('img loaded', () => {
      this.userService.checkAuthStatus().subscribe(() => this.loadImg())
    });
  }

  viewProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  loadImg() {
    !this.user()?.foto
    ? this.img = '../../../../assets/img/user_circle.svg'
    : this.img = `http://localhost:4000/${this.user()?.foto}`;
  }

  navigateUserProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
    this.router.navigateByUrl(`/dashboard/user/${this.user()?._id}`);
  }

}
