import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'shared-modal-task-form',
  templateUrl: './modal-task-form.component.html',
  styleUrls: ['./modal-task-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedModalTaskFormComponent {

  public modalService = inject(ModalService);

}
