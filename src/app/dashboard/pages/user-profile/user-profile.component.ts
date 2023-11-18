import { Component, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { ModalAlert, ModalAlertType, StatusToastNotification } from '../../interfaces';
import { AlertStatus } from 'src/app/shared/interfaces';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);

  public modalService = inject(ModalService);

  public user = signal<User|null>(null);
  public photo: string = '';
  public isTheUserLogged: boolean = false;
  public hasDataChanged: boolean = false;

  public userForm: FormGroup;

  @Output() toastNotification: StatusToastNotification | undefined;
  @Output() modalAlert: ModalAlert | undefined;

  constructor() {

    this.userForm = this.fb.group({
      _id: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
    });

    this.loadUser();

    this.user()!._id === this.activatedRoute.snapshot.params['id']
    ? this.isTheUserLogged = true
    : this.isTheUserLogged = false;

    this.socket.io.on('edited profile', toastNotification => {

      this.userService.checkAuthStatus().subscribe(() => {
        this.loadUser();
      });

      this.setToastNotification(toastNotification);
    });
  }

  loadUser() {
    this.user.set(this.userService.currentUser());

    if (!this.user()) return;

    this.userForm.setValue({ _id: this.user()?._id, nombre: this.user()?.nombre, email: this.user()?.email });

    !this.user()?.foto
    ? this.photo = '../../../../assets/img/user_circle.svg'
    : this.photo = `http://localhost:4000/${this.user()?.foto}`;

  }

  setToastNotification(toastNotification: StatusToastNotification) {
    this.toastNotification = toastNotification;
    this.modalService.toastNotificationStatus = true;
    this.modalService.hideToastNotification();
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

  editProfile() {
    this.hasDataChanged = false;

    if (this.userForm.invalid) return;

    this.userService.editProfile(this.userForm.value)
      .subscribe({
        next: res => {
          this.socket.editProfile({
            title: res,
            status: AlertStatus.success
          });
        },
        error: error => {
          this.socket.editProfile({
            title: 'Error al actualizar perfil',
            message: error,
            status: AlertStatus.error
          });

          this.loadUser();
        }
      });
  }

}
