import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectLayoutComponent } from './layout/project-layout/project-layout.component';
import { ProjectComponent } from './pages/project/project.component';
import { SettingsProjectComponent } from './pages/settings-project/settings-project.component';
import { ColaborationComponent } from './pages/colaboration/colaboration.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectLayoutComponent,
    children: [
      { path: 'board', component: ProjectComponent },
      { path: 'colaboration', component: ColaborationComponent },
      { path: 'settings', component: SettingsProjectComponent },
      { path: '**', redirectTo: 'board' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
