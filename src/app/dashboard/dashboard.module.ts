import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ModalProjectFormComponent } from './components/modal-project-form/modal-project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalImgComponent } from './components/modal-img/modal-img.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProjectListComponent,
    ModalProjectFormComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
