import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  public currentUser = computed(() => this.authService.currentUser());

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
