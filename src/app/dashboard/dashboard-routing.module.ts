import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // component: ProjectListComponent
    children: [
      { path: 'projects', component: ProjectListComponent },
      { path: 'adp/projects/:nombre', loadChildren: () => import('../project/project.module').then(m => m.ProjectModule) },
      { path: 'user/:id', component: UserProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'projects' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
