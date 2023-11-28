import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  public modalService = inject(ModalService);

  public currentUser = computed(() => this.authService.currentUser());

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
