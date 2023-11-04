import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ModalProjectFormComponent } from './components/modal-project-form/modal-project-form.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProjectListComponent,
    ModalProjectFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
