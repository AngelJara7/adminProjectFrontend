import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

const checkAuthStatus = (): boolean | Observable<boolean> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus()
    .pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigateByUrl('/auth/login');
        }
      })
    );
}

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};
