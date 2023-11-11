import { Component, OnDestroy, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'modal-img-component',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnDestroy {

  private authService = inject(AuthService);

  public modalService = inject(ModalService);
  public selectdImg: any;
  public image: any;

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
    this.authService.uploadImg(this.image)
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
