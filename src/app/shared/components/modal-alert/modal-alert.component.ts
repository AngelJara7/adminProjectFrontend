import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ProjectService } from '../../services/project.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { ModalAlertType } from '../../interfaces';
import { AlertStatus } from 'src/app/shared/interfaces';
import { Collaborators } from '../../interfaces/collaborators.interface';
import { TaskService } from '../../services/taskService.service';
import { CollaboratorService } from '../../services/collaborator.service';

@Component({
  selector: 'shared-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class SharedModalAlertComponent {

  private userService = inject(AuthService);
  private projectService = inject(ProjectService);
  private collaboratorSerice = inject(CollaboratorService);
  private taskService = inject(TaskService);
  private socket = inject(SocketService);

  private _deleteModel: Subscription;

  public modalService = inject(ModalService);
  public isLoading: boolean = false;
  public id: string = '';
  public modalAlert = computed(() => this.modalService.alert());

  // @Input() modalAlert: ModalAlert | undefined;
  // @Input() colaborador: Collaborators | undefined;

  constructor() {
    this._deleteModel = this._deleteModel = this.modalService.id.subscribe(id => this.id = id);
  }

  hideModal() {
    this.isLoading = false;
    // this.modalAlert = undefined;
    // this.colaborador = undefined;
    this.modalService.modalAlertStatus = false;
  }

  typeAlert() {

    switch (this.modalAlert()?.type) {

      case ModalAlertType.user:
        this.deleteImgProfile();
        return ;

      case ModalAlertType.project:
        this.deleteProject();
        return;

      case ModalAlertType.colaborator:
        this.deleteColaborator();
        return;

      case ModalAlertType.task:
        this.deleteTask();
        return;
    }

  }

  deleteImgProfile() {
    this.isLoading = true;

    this.userService.uploadImg(undefined)
      .subscribe({
        next: res => {
          this.socket.editProfile();
          this.setToastNotification(AlertStatus.success, res);
        },
        error: () => this.isLoading = false,
        complete: () => this.isLoading = false
      });
  }

  deleteProject() {
    this.isLoading = true;

    this.projectService.deleteProject(this.id)
      .subscribe({
        next: res => {
          this.socket.editingProjects();
          this.setToastNotification(AlertStatus.success, res);
        },
        error: error => {
          this.socket.editingProjects();
          this.setToastNotification(AlertStatus.error, error);
        }
      });
  }

  deleteColaborator() {

    this.isLoading = true;

    this.collaboratorSerice.deleteColaborator(this.id)
      .subscribe({
        next: res => {
          this.socket.editingCollaborators();
          this.setToastNotification(AlertStatus.success, res);
        },
        error: error => {
          this.socket.editingCollaborators();
          this.setToastNotification(AlertStatus.error, error.error);
        }
      });
  }

  deleteTask() {

    this.taskService.deleteTask(this.id)
      .subscribe({
        next: res => {
          console.log(res);
          this.socket.editingCollaborators();
          this.setToastNotification(AlertStatus.success, res);
        },
        error: error => {
          console.log(error);
          this.socket.editingCollaborators();
          this.setToastNotification(AlertStatus.error, error.error);
        }
      });
  }

  setToastNotification(status: AlertStatus, res: string) {

    if (status === AlertStatus.success) {
      this.modalService.toastNotification.emit({
        title: res,
        status: status
      });

      this.hideModal();
    }

    if (status === AlertStatus.error) {
      this.modalService.toastNotification.emit({
        title: 'Se ha producido un error',
        message: res,
        status: status
      });

      this.hideModal();
    }
  }

}

