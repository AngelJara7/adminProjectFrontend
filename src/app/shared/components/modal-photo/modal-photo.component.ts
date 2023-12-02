import { Component, Output, inject, signal } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { AlertStatus } from 'src/app/shared/interfaces';

@Component({
  selector: 'shared-modal-photo-component',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.css']
})
export class SharedModalPhotoComponent {

  private authService = inject(AuthService);
  private socket = inject(SocketService);

  public modalService = inject(ModalService);

  public selectdImg: any;
  public image: any;
  public isLoading: boolean = false;

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  hideModal() {
    this.clearImg();
    this.modalService.modalPhotoStatus = false;
  }

  clearImg() {
    this.selectdImg = '';
    this.image = '';
  }

  loadImg(event: any) {
    if (event.target.files && event.target.files[0]) {

      this.image = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => this.selectdImg = reader.result;

      reader.readAsDataURL(this.image);
    }

  }

  uploadImg() {
    this.isLoading = true;

    this.authService.uploadImg(this.image)
      .subscribe({
        next: res => {
          this.socket.editProfile();
          this.modalService.toastNotification.emit({
            title: res,
            status: AlertStatus.success
          });

          this.hideModal();
        },
        error: err => this.addProjectError(err.error),
        complete: () => this.isLoading = false
      });
  }

  addProjectError(res: string) {
    this.isLoading = false;
    this.message.set(res);
    this.statusRes = AlertStatus.error;
  }

}
