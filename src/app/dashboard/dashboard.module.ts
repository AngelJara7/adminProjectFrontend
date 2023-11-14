import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ModalProjectFormComponent } from './components/modal-project-form/modal-project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalImgComponent } from './components/modal-img/modal-img.component';
import { SharedModule } from '../shared/shared.module';
import { LoadingComponent } from './components/loading/loading.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProjectListComponent,
    ModalProjectFormComponent,
    ModalImgComponent,
    LoadingComponent,
    UserProfileComponent,
    ModalAlertComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
