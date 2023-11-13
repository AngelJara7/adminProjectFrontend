import { Component, OnDestroy, Output, inject, signal } from '@angular/core';
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
export class ModalProjectFormComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  private validatorsServices = inject(ValidatorsService);
  private socket = inject(SocketService);

  public modalService = inject(ModalService);

  public projectForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    clave: ['', [Validators.required], [this.validatorsServices]],
  });

  public isLoading: boolean = false;

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  ngOnDestroy(): void {
    this.projectForm.reset();
    this.statusRes = AlertStatus.checking;
    this.message.set('');
  }

  hideModal() {
    this.modalService.modalProjectFormStatus = false;
    this.ngOnDestroy();
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
          this.addProjectSuccess(res, AlertStatus.success);
          this.projectForm.reset();
          this.socket.addProject();
          this.hideModal();
        },
        error: error => {
          this.addProjectSuccess(error, AlertStatus.error);
        }
      });
  }

  addProjectSuccess(res: string, status: AlertStatus) {

    this.isLoading = false;

    this.message.set(res);

    status === AlertStatus.success
    ? this.statusRes = AlertStatus.success
    : this.statusRes = AlertStatus.error;
  }

}
