import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectLayoutComponent } from './layout/project-layout/project-layout.component';
import { SharedModule } from '../shared/shared.module';
import { CollaborationComponent } from './pages/collaboration/collaboration.component';
import { ProjectComponent } from './pages/project/project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsProjectComponent } from './pages/settings-project/settings-project.component';


@NgModule({
  declarations: [
    ProjectLayoutComponent,
    ProjectComponent,
    CollaborationComponent,
    SettingsProjectComponent
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
