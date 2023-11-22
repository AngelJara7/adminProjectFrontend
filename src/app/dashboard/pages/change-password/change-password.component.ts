import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ModalService } from '../../services/modal.service';
import { AlertStatus } from 'src/app/shared/interfaces';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private userService = inject(AuthService);
  private modalService = inject(ModalService);

  public changePasswordForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  }, {
    validators: [this.validatorsService.isFieldOneEqualFieldTwo('newPassword', 'confirmPassword')]
  });

  public isLoading: boolean = false;

  isValidField(field: string) {
    return this.changePasswordForm.controls[field].errors && this.changePasswordForm.controls[field].touched;
  }

  getErrorField(field: string): string | null {
    return this.validatorsService.getErrorField(this.changePasswordForm, field);
  }

  updatePassword() {

    this.isLoading = true;

    if (this.changePasswordForm.invalid) return;
    const { currentPassword, newPassword } = this.changePasswordForm.value;

    this.userService.updatePassword(currentPassword, newPassword)
      .subscribe({
        next: res => {
          this.modalService.toasNotification.emit({
            title: res,
            status: AlertStatus.success
          });
        },
        error: error => {
          this.isLoading = false;
          this.modalService.toasNotification.emit({
            title: 'Se ha producido un error',
            message: error,
            status: AlertStatus.error
          });
        },
        complete: () => {
          this.isLoading = false;
          this.changePasswordForm.reset()
        }
      });
  }

}
