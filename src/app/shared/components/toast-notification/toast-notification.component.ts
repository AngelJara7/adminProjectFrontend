import { Component, ElementRef, Renderer2, ViewChild, inject } from '@angular/core';
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

  public toastNotification: StatusToastNotification | undefined;

  @ViewChild("toastContainer") toastContainer!: ElementRef;

  constructor() {

    this.toastNotification$ = this.toastNotification$ = this.modalService.toasNotification.subscribe(notification => this.setToastNotification(notification));
  }

  setToastNotification(toastNotification: StatusToastNotification) {
    this.toastNotification = toastNotification;

    // this.renderer.addClass(this.toastContainer.nativeElement, 'show');
    this.modalService.toastNotificationStatus = true;
    console.log(this.modalService.toastNotificationStatus);
    // this.createNewNotification();
    this.modalService.hideToastNotification();
  }

  createNewNotification() {
    const notification: HTMLElement = this.renderer.createElement('li');
    this.renderer.addClass(notification, 'toast');
    const icon = this.toastNotification?.status === this.alertStatus.success
              ? '<i class="fa-solid fa-circle-check" style="color: #0ABF30;"></i>'
              : '<i class="fa-solid fa-circle-exclamation" style="color: #e94e42;"></i>';

    notification.innerHTML = `
      ${icon}

      <div>
        <b>${this.toastNotification?.title}</b>

        <p *ngIf="${this.toastNotification?.message}">
          ${this.toastNotification?.message}
        </p>
      </div>

      <i class="fa-solid fa-xmark" (click)="${this.closeNotification()}"></i>`;

    this.renderer.appendChild(this.toastContainer.nativeElement, notification);


    console.log('NOTIFY',this.toastNotification);
  }

  closeNotification() {
    this.modalService.toastNotificationStatus = false;
  }
}
