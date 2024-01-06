import { Component, OnDestroy, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from '../../../shared/services/modal.service';
import { SocketService } from '../../../shared/services/socket.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { User } from '../../../shared/models/user.model';
import { AlertStatus } from 'src/app/shared/interfaces';
import { ModalAlert, ModalAlertType } from '../../../shared/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private userService = inject(AuthService);
  private socket = inject(SocketService);
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);

  public id: string = '';
  public user: User | undefined;
  public photo: string = '';
  public isTheUserLogged: boolean = false;
  public hasDataChanged: boolean = false;

  public userForm: FormGroup = this.fb.group({
    _id: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
  });

  public modalAlert: ModalAlert | undefined;
  // @Output() modalAlert: ModalAlert | undefined;

  constructor() {

    const user = this.userService.currentUser();
    this.id = this.activatedRoute.snapshot.params['id'];

    if (!user) return;

    if (this.id === user._id) {
      this.isTheUserLogged = true;
      this.loadForm(user);
      return;
    }

    this.isTheUserLogged = false;

    this.loadUser();

    this.socket.io.on('edited profile', () => {
      this.userService.checkAuthStatus().subscribe(() => this.loadUser());
    });
  }

  ngOnDestroy(): void {
    this.userForm.reset();
    this.modalService.modalPhotoStatus = false;
    this.modalService.modalAlertStatus = false;
  }

  loadUser() {

    this.userService.searchUser(this.id)
      .subscribe({
        next: res => this.loadForm(res),
        error: err => console.log({err})
      });

  }

  loadForm(user: User) {
    this.user = user;
    this.userForm.setValue({
      _id: user._id,
      nombre: user.nombre,
      email: user.email
    });

    !user.foto
    ? this.photo = environment.path_no_img
    : this.photo = `${environment.base_url}/${user.foto}`
  }

  setAlert() {
    return this.modalAlert = {
      type: ModalAlertType.user,
      title: 'Eliminar foto de perfil',
      message: '¿seguro?'
    };
  }

  viewModalPhoto() {
    this.modalService.modalPhotoStatus = true;
  }

  viewModalAlert() {
    this.modalService.setModalAlert(this.setAlert());
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

    if (name !== this.user?.nombre || email !== this.user?.email) {
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
          this.socket.editProfile();
          this.modalService.toastNotification.emit({
            title: res,
            status: AlertStatus.success
          });
        },
        error: error => {
          this.modalService.toastNotification.emit({
            title: 'Se ha producido un error',
            message: error,
            status: AlertStatus.error
          });

          this.loadUser();
        }
      });
  }

}
