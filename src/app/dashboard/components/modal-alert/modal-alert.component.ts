import { Component, Input, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ProjectService } from '../../services/project.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { ModalAlert } from '../../interfaces/modal-alert.interface';
import { ModalAlertType } from '../../interfaces';
import { AlertStatus } from 'src/app/shared/interfaces';

@Component({
  selector: 'modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent {

  private userService = inject(AuthService);
  private projectService = inject(ProjectService);
  private socket = inject(SocketService);

  private _deleteModel: Subscription;

  public modalService = inject(ModalService);
  public isLoading: boolean = false;
  public id: string = '';

  @Input() modalAlert: ModalAlert | undefined;

  constructor() {
    this._deleteModel = this._deleteModel = this.modalService.id.subscribe(id => this.id = id);
  }

  hideModal() {
    this.modalAlert = undefined;
    this.modalService.modalAlertStatus = false;
  }

  typeAlert() {

    switch (this.modalAlert?.type) {

      case ModalAlertType.user:
        this.deleteImgProfile();
        return ;

      case ModalAlertType.project:
        this.deleteProject();
        return;

      case ModalAlertType.task:
        console.log('ALERTA:',this.modalAlert.type);
        return;
    }

  }

  deleteImgProfile() {
    this.isLoading = true;

    this.userService.uploadImg(undefined)
      .subscribe({
        next: res => {
          this.socket.editProfile();
          this.modalService.toasNotification.emit({
            title: res,
            status: AlertStatus.success
          });

          this.hideModal();
        },
        error: () => this.isLoading = false,
        complete: () => this.isLoading = false
      });
  }

  deleteProject() {
    this.projectService.deleteProject(this.id)
      .subscribe({
        next: res => {
          this.socket.editingProjects();
          this.modalService.toasNotification.emit({
            title: res,
            status: AlertStatus.success
          });

          this.hideModal();
        },
        error: error => {
          this.socket.editingProjects();
          this.modalService.toasNotification.emit({
            title: 'Se ha producido un error ',
            message: error,
            status: AlertStatus.success
          });

          this.hideModal();
        }
      });
  }

  // setProjectResponseStatus(type: string) {
  //   this.socket.project(type);
  //   this.hideModal();
  // }

}
