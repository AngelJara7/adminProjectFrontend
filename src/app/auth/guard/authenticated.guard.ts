import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  if (authService.authStatus() === AuthStatus.authenticated) return true;

  const router = inject(Router);
  router.navigateByUrl('/auth');
  return false;
};
