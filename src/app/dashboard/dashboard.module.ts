import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    DashboardLayoutComponent,
    ProjectListComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ]
})
export class DashboardModule { }
