import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Column, Project } from '../../models';
import { ModalService } from '../../services/modal.service';
import { ProjectService } from '../../services/project.service';
import { AlertStatus } from '../../interfaces';
import { SocketService } from '../../services/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shared-column-card',
  templateUrl: './columnCard.component.html',
  styleUrls: ['./columnCard.component.css'],
})
export class SharedColumnCardComponent implements OnInit, AfterViewInit {

  private modalService = inject(ModalService);
  private projectService = inject(ProjectService);
  private socketService = inject(SocketService);
  private fb = inject(FormBuilder);

  public columnForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  });

  @Input() public column: Column | undefined;
  @Input() public project!: Project;
  @ViewChild('nameColumn') nameColumn!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
    this.loadColumnForm();
  }

  ngAfterViewInit(): void {
    if (!this.column) this.nameColumn.nativeElement.focus();
  }

  loadColumnForm() {
    if (!this.column) return;
    this.columnForm?.controls['nombre'].setValue(this.column.nombre);
  }

  changeColumnName(field: string) {

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

}
