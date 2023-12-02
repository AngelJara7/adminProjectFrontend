import { Component, OnDestroy, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertStatus, Breadcrumbs, Collaborators, ModalAlert, ModalAlertType } from 'src/app/shared/interfaces';
import { Project } from 'src/app/shared/models/project.model';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ModalService } from 'src/app/shared/services/modal.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { SocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-colaboration',
  templateUrl: './colaboration.component.html',
  styleUrls: ['./colaboration.component.css']
})
export class ColaborationComponent implements OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private modalService = inject(ModalService);
  private socketService = inject(SocketService);

  public subscription$: Subscription;
  public project: Project | undefined;
  public nombre: string = '';
  public initialValue: string = '';
  public colaboradores: Collaborators[] = [];
  public rols = ['Administrador', 'Colaborador'];

  @Output() breadcrumbs: Breadcrumbs[] = [];
  @Output() modalAlert: ModalAlert | undefined;
  @Output() colaborador?: Collaborators | undefined;

  constructor() {
    this.subscription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.nombre = params['nombre'];
        this.loadProject();
      }
    );

    this.socketService.io.on('edited contributors', () => {
      this.loadProject();
    });

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.modalService.modalAddCollaboratorStatus = false;
    this.modalService.modalAlertStatus = false;
  }

  loadProject() {

    this.projectService.getProject(this.nombre)
      .subscribe({
        next: res => {
          this.project = res;

          this.colaboradores = this.project.colaboradores;
          this.colaboradores.unshift({
            usuario: this.project.usuario,
            rol: 'Administrador'
          });

          this.breadcrumbs = [
            { link: '../../projects', title: 'Proyectos' },
            { link: '../board', title: this.project!.nombre },
            { link: '../colaboration', title: 'Equipo' }
          ];
        }
      });

  }

  searchColaborators(colaborators: string) {

    if (!this.project || colaborators === '') {
      this.colaboradores = this.project!.colaboradores;
      return;
    };

    this.colaboradores = this.colaboradores.filter(colab => colab.usuario.nombre.match(colaborators) || colab.usuario.email.match(colaborators));
  }

  viewModalAddCollaborator() {
    this.modalService.modalAddCollaboratorStatus = true;
  }

  updateRolCollaborator(rol: HTMLSelectElement, colaborador: Collaborators, project: string) {

    if (!colaborador && !project) return;

    colaborador.rol = rol.value;

    this.projectService.updateCollaborator(colaborador, project)
    .subscribe({
      next: res => {
        this.socketService.editingCollaborators();
        this.modalService.toastNotification.emit({
          title: res,
          status: AlertStatus.success
        });
      },
      error: error => {
        this.socketService.editingCollaborators();
        this.modalService.toastNotification.emit({
          title: 'Se ha producido un error',
          message: error.error,
          status: AlertStatus.error
        });
      }
    });

  }

  viewModalAlert(colaborator: Collaborators, project: Project) {
    this.colaborador = colaborator;
    this.setAlert(colaborator, project);
    this.modalService.id.emit(project._id);
    this.modalService.modalAlertStatus = true;
  }

  setAlert(colaborator: Collaborators, project: Project) {
    this.modalAlert = {
      type: ModalAlertType.colaborator,
      title: `Eliminar a '${colaborator.usuario.nombre}' del proyecto '${project.nombre}'`,
      message: `Al confirmar esta acción esta eliminando al colaborador '${colaborator.usuario.nombre}' del proyecto y de todas las tareas de las que este es responsable. \n ¿Desea eliminar al colaborador?`
    }
  }

}
