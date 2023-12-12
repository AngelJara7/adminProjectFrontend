import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class SharedNavBarComponent {

  private userService = inject(AuthService);
  private router = inject(Router);
  private socket = inject(SocketService);

  public viewOptionsProfile: boolean = false;
  public user = signal<User|null>(null);
  public img: string = '';

  @ViewChild('profileUser') profileUser!: ElementRef;
  @ViewChild('button') button!: ElementRef;

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
    ? this.img = environment.path_no_img
    : this.img = `${environment.base_url}/${this.user()?.foto}`;
  }

  viewProfile(event: any) {
    // this.viewOptionsProfile = !this.viewOptionsProfile;
    // this.close(event);
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  navigateProjects() {
    this.router.navigateByUrl('/dashboard/projects');
  }

  navigateUserProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
    this.router.navigateByUrl(`/dashboard/user/${this.user()?._id}`);
  }

  navigateChangePassword() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
    this.router.navigateByUrl('/dashboard/change-password');
  }

  close(event: any) {

    if (event.target === this.button.nativeElement || event.target === this.button.nativeElement.lastChild) {
      this.viewOptionsProfile = !this.viewOptionsProfile;
    } else {
      this.viewOptionsProfile = false;
    }
  }

}
