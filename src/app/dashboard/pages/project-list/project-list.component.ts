import { Component, OnDestroy, Output, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ProjectService } from '../../../shared/services/project.service';
import { ModalService } from '../../../shared/services/modal.service';
import { SocketService } from '../../../shared/services/socket.service';
import { Project } from '../../../shared/models/project.model';
import { ModalAlert, ModalAlertType } from '../../../shared/interfaces';

@Component({
  selector: 'dashboard-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnDestroy {

  private projectService = inject(ProjectService);
  private socket = inject(SocketService);
  private userService = inject(AuthService);

  public modalService = inject(ModalService);

  public projects: Project[] = [];
  public loadingProjects: boolean = false;
  public currentUser = computed(() => this.userService.currentUser());
  public initialValue: string = '';

  @Output() modalAlert: ModalAlert | undefined;

  constructor() {
    this.getProjects('');

    if (this.currentUser()?._id) this.socket.loadProjects(this.currentUser()!._id);

    this.socket.io.on('edited projects', () => this.getProjects(''));
  }

  ngOnDestroy(): void {
    this.modalService.modalProjectFormStatus = false;
    this.modalService.modalAlertStatus = false;
  }

  getProjects(project: string) {
    this.loadingProjects = true;

    this.projectService.getProjects(project)
      .subscribe({
        next: resp => this.projects = resp,
        error: () => this.loadingProjects = false,
        complete: () => this.loadingProjects = false
      });
  }

  searchProject(project: string) {
    this.getProjects(project);
  }

  setAlert(project: string) {
    this.modalAlert = {
      type: ModalAlertType.project,
      title: 'Eliminar Proyecto',
      message: `Todas la tareas vinculadas a este proyecto serán eliminadas junto con el mismo de forma permanente. ¿Desea eliminar el proyecto '${project}'?`
    };
  }

  viewModalProjectForm() {
    this.modalService.modalProjectFormStatus = true;
  }

  viewModalAlert(project: Project) {
    this.setAlert(project.nombre);
    this.modalService.id.emit(project._id);
    this.modalService.modalAlertStatus = true;
  }

}
