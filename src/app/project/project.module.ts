import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectLayoutComponent } from './layout/project-layout/project-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ColaborationComponent } from './pages/colaboration/colaboration.component';
import { ProjectComponent } from './pages/project/project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProjectLayoutComponent,
    ProjectComponent,
    ColaborationComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class ProjectModule { }
