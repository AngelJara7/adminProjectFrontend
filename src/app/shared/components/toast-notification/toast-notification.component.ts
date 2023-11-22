import { Component, ElementRef, QueryList, Renderer2, ViewChildren, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertStatus } from '../../interfaces';
import { ModalService } from 'src/app/dashboard/services/modal.service';
import { StatusToastNotification } from 'src/app/dashboard/interfaces';

@Component({
  selector: 'shared-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent {

  private renderer = inject(Renderer2);
  public modalService = inject(ModalService);
  public alertStatus = AlertStatus;

  private toastNotification$!: Subscription;

  public bodyNotification: StatusToastNotification[] = [];
  public interval: any;

  @ViewChildren("notifications") notifications!: QueryList<ElementRef>;

  constructor() {

    this.toastNotification$ = this.toastNotification$ = this.modalService.toasNotification.subscribe(notification => this.setToastNotification(notification));
  }

  setToastNotification(toastNotification?: StatusToastNotification) {

    this.bodyNotification.unshift(toastNotification!);
    this.modalService.toastNotificationStatus = true;

    clearInterval(this.interval);
    this.clearNotifications();
  }

  clearNotifications() {

    this.interval = setInterval(() => {
      this.closeNotification(0);

    }, 10000);

  }

  closeNotification(index: number) {

    this.renderer.addClass(this.notifications.get(index)?.nativeElement, 'hide');

    const removeNotification = setTimeout(() => {

      this.bodyNotification.splice(index, 1);

      if (this.bodyNotification.length === 0) {
        clearTimeout(removeNotification);
        clearInterval(this.interval);
        this.modalService.toastNotificationStatus = false;
      }

    }, 1000);

  }
}
