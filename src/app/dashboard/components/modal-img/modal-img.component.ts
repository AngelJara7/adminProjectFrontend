import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'modal-img-component',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent {

  private authService = inject(AuthService);

  public selectdImg: any;
  public image: any;

  loadImg(event: any) {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {

      // console.log( event.file.files[0] );
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
