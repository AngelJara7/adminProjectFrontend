import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ModalProjectFormComponent } from './components/modal-project-form/modal-project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalPhotoComponent } from './components/modal-img/modal-photo.component';
import { SharedModule } from '../shared/shared.module';
import { LoadingComponent } from './components/loading/loading.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProjectComponent } from '../project/pages/project/project.component';
import { SettingsProjectComponent } from '../project/pages/settings-project/settings-project.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProjectListComponent,
    ModalProjectFormComponent,
    ModalPhotoComponent,
    LoadingComponent,
    UserProfileComponent,
    ModalAlertComponent,
    ChangePasswordComponent,
    ProjectComponent,
    SettingsProjectComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
