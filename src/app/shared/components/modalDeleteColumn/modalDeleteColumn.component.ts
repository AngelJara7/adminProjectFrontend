import { Component, Input, OnDestroy, inject } from '@angular/core';

import { ProjectService } from '../../services/project.service';
import { SocketService } from '../../services/socket.service';
import { ModalService } from '../../services/modal.service';
import { Column } from '../../models/column.models';
import { Project } from '../../models';
import { Subscription } from 'rxjs';

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
    // TODO: mostrar toast notification y ocultar modal segurn respuesta
    if (!this.column?._id && !this.project?._id) return;

    this.projectService.deleteColumn(columna, this.column!._id, this.project!._id)
      .subscribe({
        next: res => {
          console.log({res});
        },
        error: err => {
          console.log({err});
        }
      });
  }

}
