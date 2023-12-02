import { Component, computed, inject } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { ProjectService } from '../../services/project.service';
import { User } from 'src/app/auth/interfaces';
import { AlertStatus } from '../../interfaces';
import { SocketService } from '../../services/socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'shared-modal-add-collaborator',
  templateUrl: './modal-add-collaborator.component.html',
  styleUrls: ['./modal-add-collaborator.component.css']
})
export class SharedModalAddCollaboratorComponent {

  private projectService = inject(ProjectService);
  private socketService = inject(SocketService);
  private fb = inject(FormBuilder);

  public modalService = inject(ModalService);

  public project = computed(() => this.projectService._currentProject());
  public users: User[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;
  public rols = ['Administrador', 'Colaborador'];
  public collaboratorForm: FormGroup = this.fb.group({
    usuario: [this.initialValue],
    rol: ['Administrador', Validators.required]
  });

  constructor() { }

  searchUser(email: string) {
    if (email === '') {
      this.users = [];
      this.initialValue = email;
      return;
    }

    this.projectService.searchCollaborator(email)
      .subscribe({
        next: res => this.users = res
      });
  }

  userSelected(user: User) {
    this.initialValue = user.email;
    const { email } = user;
    this.collaboratorForm.controls['usuario'].setValue({
      email
    });
    this.users = [];
  }

  addCollaborator() {

    if (this.initialValue === '' && !this.project) return;

    this.isLoading = true;

    this.projectService.addCollaborator(this.collaboratorForm.value, this.project()!._id)
      .subscribe({
        next: res => {
          this.modalService.toastNotification.emit({
            title: res,
            status: AlertStatus.success
          })
          this.socketService.editingCollaborators();
          this.hideModal();
        },
        error: err => {
          this.isLoading = false;
          this.modalService.toastNotification.emit({
            title: 'Se ha producido un error',
            message: err.error,
            status: AlertStatus.error
          })
        }
      });
  }

  hideModal() {
    this.users = [];
    this.initialValue = '';
    this.isLoading = false;
    this.modalService.modalAddCollaboratorStatus = false;
  }

}
