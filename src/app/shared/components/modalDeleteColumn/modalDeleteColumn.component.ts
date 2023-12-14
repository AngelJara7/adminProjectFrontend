import { Component, Input, OnDestroy, inject } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { SocketService } from '../../services/socket.service';
import { ModalService } from '../../services/modal.service';
import { Column } from '../../models/column.models';
import { Project } from '../../models';
import { Subscription } from 'rxjs';
import { AlertStatus } from '../../interfaces';

@Component({
  selector: 'modal-delete-column',
  templateUrl: './modalDeleteColumn.component.html',
  styleUrls: ['./modalDeleteColumn.component.css']
})
export class ModalDeleteColumnComponent implements OnDestroy {

  private projectService = inject(ProjectService);
  private socketService = inject(SocketService);

  public modalService = inject(ModalService);

  public deleteColumn$: Subscription;
  public column: Column | undefined;
  public columns: Column[] = [];
  public isLoading: boolean = false;

  @Input() public project: Project | undefined;

  constructor() {
    this.deleteColumn$ = this.deleteColumn$ = this.modalService.id.subscribe(id => {
      this.column = this.project?.columnas?.find(columna => columna._id === id);

      this.columns = this.project!.columnas!.filter(columna => columna._id !== this.column?._id);
    });
  }
  ngOnDestroy(): void {
    this.deleteColumn$.unsubscribe();
  }

  hideModal() {
    this.modalService.modalDeleteColumn = false;
  }

  deleteColumn(columna: string) {
    
    if (!this.column?._id && !this.project?._id) return;

    this.projectService.deleteColumn(columna, this.column!._id, this.project!._id)
      .subscribe({
        next: res => this.setToastNotification(res, AlertStatus.success),
        error: err => this.setToastNotification(err.error, AlertStatus.error)
      });
  }

  setToastNotification(res: string, status: AlertStatus) {

    switch (status) {

      case AlertStatus.success:
        this.modalService.toastNotification.emit({
          title: res,
          status: status
        });

        this.hideModal();
        this.socketService.editingCollaborators();
        this.modalService.viewNewSharedColumnCard = false;
        break;

      case AlertStatus.error:
        this.modalService.toastNotification.emit({
          title: 'Se ha producido un error',
          message: res,
          status: status
        });

        this.isLoading = false;
        this.modalService.viewNewSharedColumnCard = false;
        break;
    }

  }

}
