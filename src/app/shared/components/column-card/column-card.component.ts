import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Column, Project, Task } from '../../models';
import { ModalService } from '../../services/modal.service';
import { ProjectService } from '../../services/project.service';
import { AlertStatus, ModalAlert, ModalAlertType } from '../../interfaces';
import { SocketService } from '../../services/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shared-column-card',
  templateUrl: './column-card.component.html',
  styleUrls: ['./column-card.component.css'],
})
export class SharedColumnCardComponent implements OnInit {

  private modalService = inject(ModalService);
  private projectService = inject(ProjectService);
  private socketService = inject(SocketService);
  private fb = inject(FormBuilder);

  public columnForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  });

  public modalAlert: ModalAlert | undefined;

  @Input() public column: Column | undefined;
  @Input() public project!: Project;

  constructor() { }

  ngOnInit(): void {
    this.loadColumnForm();
  }

  loadColumnForm() {
    if (!this.column) return;
    this.columnForm?.controls['nombre'].setValue(this.column.nombre);
  }

  changeColumnName() {

    if (this.column?._id) {
      this.updateColumn();
    } else {
      this.addColumn();
    }
  }

  blurFormField(event: any) {
    event as HTMLElement;
    event.target.firstChild.blur();
  }

  addColumn() {

    if (this.columnForm.invalid) {
      this.modalService.viewNewSharedColumnCard = false;
      return;
    }

    this.projectService.addColumn(this.columnForm.controls['nombre'].value.toUpperCase(), this.project._id)
      .subscribe({
        next: res => this.setToastNotification(res, AlertStatus.success),
        error: err => this.setToastNotification(err.error, AlertStatus.error)
      });
  }

  updateColumn() {
    if (this.columnForm.invalid) {
      this.loadColumnForm();
      return;
    }

    if (this.columnForm.controls['nombre'].value === this.column?.nombre) return;
    console.log(this.columnForm.controls['nombre'].value);
    this.projectService.updateColumn(
      this.columnForm.controls['nombre'].value.toUpperCase(), this.column!._id, this.project._id
    )
      .subscribe({
        next: res => this.setToastNotification(res, AlertStatus.success),
        error: err => this.setToastNotification(err.error, AlertStatus.error)
      });

  }

  deleteColumn(column: Column) {
    this.modalService.id.emit(column._id);
    this.modalService.modalDeleteColumn = true;
  }

  setToastNotification(res: string, status: AlertStatus) {

    switch (status) {

      case AlertStatus.success:
        this.modalService.toastNotification.emit({
          title: res,
          status: status
        });

        this.socketService.editingCollaborators();
        this.modalService.viewNewSharedColumnCard = false;
        break;

      case AlertStatus.error:
        this.modalService.toastNotification.emit({
          title: 'Se ha producido un error',
          message: res,
          status: status
        });

        this.loadColumnForm();
        this.modalService.viewNewSharedColumnCard = false;
        break;
    }

  }

  loadPhoto(photo?: string) {
    return photo ? `${environment.base_url}/${photo}` : `${environment.path_no_img}`;
  }

  formatDate(dateFormat: Date | string) {

    const date = new Date(dateFormat);

    return date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).substr(-2) + '-' +
      ('0' + date.getUTCDate()).substr(-2);
  }

  viewModalTaskForm(task: Task) {
    this.modalService.currentTask.emit(task);
    this.modalService.modalTaskFormStatus = true;
  }

  deleteTask(task: Task) {
    this.modalService.setModalAlert(this.setModalAlert(task));
    this.modalService.id.emit(task._id);
    this.modalService.modalAlertStatus = true;
  }

  setModalAlert(task: Task) {
    return this.modalAlert = {
      type: ModalAlertType.task,
      title: `¿Eliminar '${task.nombre}'?`,
      message: `Estas a punto de eliminar de forma permanente está tarea\n\n ¿Desea continuar?`
    }
  }

}
