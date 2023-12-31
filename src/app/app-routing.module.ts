import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guard/not-authenticated.guard';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';
import { SharedNotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { SharedServerInternalErrorPageComponent } from './shared/pages/server-internal-error-page/server-internal-error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ notAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }, {
    path: 'dashboard',
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }, {
    path: 'not-found',
    component: SharedNotFoundPageComponent
  }, {
    path: 'server-internal-error',
    component: SharedServerInternalErrorPageComponent
  }, {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
