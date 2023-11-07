import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  private userService = inject(AuthService);
  private router = inject(Router);

  public viewOptionsProfile: boolean = false;
  public user = computed(() => this.userService.currentUser());
  public userName = this.user()?.nombre;
  public email = this.user()?.email;


  viewProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
