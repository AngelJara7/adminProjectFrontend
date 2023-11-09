import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private userService = inject(AuthService);
  private router = inject(Router);

  public viewOptionsProfile: boolean = false;
  public user = computed(() => this.userService.currentUser());
  public userName = this.user()?.nombre;
  public email = this.user()?.email;
  public img = `http://localhost:4000/${this.user()?.foto}`;

  ngOnInit(): void {
    this.loadImg();
  }

  viewProfile() {
    this.viewOptionsProfile = !this.viewOptionsProfile;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  loadImg() {
    if (!this.img) {
      this.img = '../../../../assets/img/user_circle.svg';
    }
  }

}
