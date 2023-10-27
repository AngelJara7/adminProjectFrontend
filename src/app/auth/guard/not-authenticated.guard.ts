import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

const checkAuthStatus = (): boolean | Observable<boolean> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus()
    .pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigateByUrl('/dashboard');
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    )
}

export const notAuthenticatedGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};
