import { Component, computed, inject } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  private userService = inject(AuthService);
  private modalService = inject(ModalService);
  private socket = inject(SocketService);

  public user = computed(() => this.userService.currentUser());
  public img: string = '';

  constructor() {
    this.loadImg();

    this.socket.io.on('img loaded', () => {
      this.userService.checkAuthStatus().subscribe(() => this.img = `http://localhost:4000/${this.user()?.foto}`
      )
    });

  }

  loadImg() {
    !this.user()?.foto
    ? this.img = '../../../../assets/img/user_circle.svg'
    : this.img = `http://localhost:4000/${this.user()?.foto}`;
  }

  viewModalImg() {
    this.modalService.modalImgStatus = true;
  }
}
