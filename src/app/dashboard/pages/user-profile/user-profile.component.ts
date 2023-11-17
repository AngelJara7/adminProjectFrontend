import { Component, Output, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { ModalAlert, ModalAlertType, StatusToastNotification } from '../../interfaces';
import { AlertStatus } from 'src/app/shared/interfaces';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private userService = inject(AuthService);
  private socket = inject(SocketService);

  public modalService = inject(ModalService);

  public user = computed(() => this.userService.currentUser());
  public photo: string = '';
  public hasDataChanged: boolean = false;

  public userForm: FormGroup;
  // = this.fb.group({
  //   nombre: [this.user()?.nombre, [Validators.required]],
  //   email: [this.user()?.email, [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
  // });

  @Output() toastNotification: StatusToastNotification | undefined;
  @Output() modalAlert: ModalAlert | undefined;

  constructor() {
    console.log(this.user());
    this.loadPhoto();

    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
    });

    this.loadUser();

    this.socket.io.on('img loaded', type => {

      this.userService.checkAuthStatus().subscribe(() => {
        this.loadPhoto();
      });

      this.toastNotificationType(type);
    });
  }

  loadPhoto() {
    !this.user()?.foto
    ? this.photo = '../../../../assets/img/user_circle.svg'
    : this.photo = `http://localhost:4000/${this.user()?.foto}`;
  }

  loadUser() {
    if (!this.user()) return;

    this.userForm.setValue({ nombre: this.user()?.nombre, email: this.user()?.email });
  }

  toastNotificationType(type: string) {
    this.modalService.toastNotificationStatus = true;

    switch (type) {

      case 'add':
        this.toastNotification = {
          title: 'Foto de perfil actualizada',
          status: AlertStatus.success
        }
        return;

      case 'delete':
        this.toastNotification = {
          title: 'Foto de perfil eliminada',
          status: AlertStatus.success
        }
        return;

      case 'error':
        this.toastNotification = {
          title: 'Se ha producido un error',
          message: 'No se ha podido eliminar la foto de perfil. Intentalo de nuevo.',
          status: AlertStatus.error
        }
        return;
    }
  }

  setAlert() {
    this.modalAlert = {
      type: ModalAlertType.user,
      title: 'Eliminar foto de perfil',
      message: '¿seguro?'
    };
  }

  viewModalPhoto() {
    this.modalService.modalPhotoStatus = true;
  }

  viewModalAlert() {
    this.setAlert();
    this.modalService.modalAlertStatus = true;
  }

  isValidField(field: string) {
    return this.userForm.controls[field].errors && this.userForm.controls[field].touched;
  }

  getErrorField(field: string): string | null {
    return this.validatorsService.getErrorField(this.userForm, field);
  }

  verifyChangesInForm() {
    const name = this.userForm.controls['nombre'].value;
    const email = this.userForm.controls['email'].value;

    if (name !== this.user()?.nombre || email !== this.user()?.email) {
      this.hasDataChanged = true;
    } else {
      this.hasDataChanged = false;
    }
  }

  saveChanges() {

  }

}
