import { Component, OnDestroy, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'modal-img-component',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnDestroy {

  private authService = inject(AuthService);
  private socket = inject(SocketService);

  public modalService = inject(ModalService);
  public selectdImg: any;
  public image: any;
  public isLoading: boolean = false;

  ngOnDestroy(): void {
    this.clearImg();
  }

  hideModal() {
    this.modalService.modalImgStatus = false;
    this.ngOnDestroy();
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
          this.clearImg();
          this.socket.loadImg();
          this.hideModal();
        },
        error: err => {
          this.isLoading = false;
          console.log({err});
        },
        complete: () => {
          this.isLoading = false
        }
      });
  }

  addProjectSuccess(res: string) {

    this.isLoading = false;

    // this.message.set(res);

    // status === AlertStatus.success
    // ? this.statusRes = AlertStatus.success
    // : this.statusRes = AlertStatus.error;
  }

}
