import { Component, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProjectService } from '../../services/project.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AlertStatus } from '../../interfaces/alert-status.enum';

@Component({
  selector: 'shared-modal-project-form',
  templateUrl: './modal-project-form.component.html',
  styleUrls: ['./modal-project-form.component.css']
})
export class SharedModalProjectFormComponent {

  private projectService = inject(ProjectService);
  private validatorsServices = inject(ValidatorsService);
  private socketService = inject(SocketService);

  public modalService = inject(ModalService);

  private fb = inject(FormBuilder);

  public isLoading: boolean = false;

  public projectForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    clave: ['', [Validators.required], [this.validatorsServices]],
  });

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  hideModal() {
    this.projectForm.reset();
    this.modalService.modalProjectFormStatus = false;
  }

  isValidField(field: string) {
    return this.projectForm.controls[field].errors && this.projectForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    return this.validatorsServices.getErrorField(this.projectForm, field);
  }

  addProject() {
    this.isLoading = true;

    this.projectService.addProject(this.projectForm.value)
      .subscribe({
        next: res => {
          this.socketService.editingProjects();
          this.setToastNotificacion(res, AlertStatus.success);
          this.hideModal();
        },
        error: error => this.setToastNotificacion('Se ha producido un error', AlertStatus.error, error),
      });
  }

  setToastNotificacion(title: string, status: AlertStatus, message?: string) {

    this.isLoading = false;
    this.modalService.toastNotification.emit({
      title,
      message,
      status
    });

  }

}
