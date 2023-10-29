import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guard/not-authenticated.guard';
import { AuthenticatedGuard } from './auth/guard/authenticated.guard';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';

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
    component: NotFoundPageComponent
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
