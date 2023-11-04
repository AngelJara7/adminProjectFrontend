import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'modal-project-form',
  templateUrl: './modal-project-form.component.html',
  styleUrls: ['./modal-project-form.component.css']
})
export class ModalProjectFormComponent {

  public modalService = inject(ModalService);

  hideModal() {
    this.modalService.hideModal();
  }

}
