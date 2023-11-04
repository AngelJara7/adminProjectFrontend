import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // component: ProjectListComponent
    children: [
      { path: 'projects', component: ProjectListComponent },
      { path: '**', redirectTo: 'projects' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
