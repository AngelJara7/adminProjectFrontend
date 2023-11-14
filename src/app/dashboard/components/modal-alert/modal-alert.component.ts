import { Component, Input, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent {

  private userService = inject(AuthService);
  private socket = inject(SocketService);

  public modalService = inject(ModalService);
  public isLoading: boolean = false;

  @Input() titleModalAlert: string = '';
  @Input() messageModalAlert: string = '';

  hideModal() {
    this.modalService.modalAlertStatus = false;
  }

  deleteImgProfile() {
    this.isLoading = true;

    this.userService.uploadImg(undefined)
      .subscribe({
        next: () => {
          this.socket.loadImg();
          this.hideModal();
        },
        error: () => this.isLoading = false,
        complete: () => this.isLoading = false
      });
  }

}
