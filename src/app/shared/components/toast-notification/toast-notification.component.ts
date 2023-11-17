import { Component, Input, inject } from '@angular/core';
import { AlertStatus } from '../../interfaces';
import { ModalService } from 'src/app/dashboard/services/modal.service';
import { StatusToastNotification } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'shared-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent {

  public modalService = inject(ModalService);
  public alertStatus = AlertStatus;

  @Input() toastNotification: StatusToastNotification | undefined;

  constructor() { }

  closeNotification() {
    this.modalService.toastNotificationStatus = false;
  }
}
