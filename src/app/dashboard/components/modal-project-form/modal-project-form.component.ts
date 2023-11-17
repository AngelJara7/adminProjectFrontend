import { Component, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertStatus } from './../../../shared/interfaces/alert-status.enum';
import { ModalService } from '../../services/modal.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ProjectService } from '../../services/project.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'modal-project-form',
  templateUrl: './modal-project-form.component.html',
  styleUrls: ['./modal-project-form.component.css']
})
export class ModalProjectFormComponent {

  private projectService = inject(ProjectService);
  private validatorsServices = inject(ValidatorsService);
  private socket = inject(SocketService);

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
    this.modalService.hideToastNotification();
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
        next: () => {
          this.socket.project('add');
          this.hideModal();
        },
        error: error => this.addProjectError(error),
        complete: () => this.isLoading = false
      });
  }

  addProjectError(res: string) {
    this.isLoading = false;
    this.message.set(res);
    this.statusRes = AlertStatus.error;
  }

}
