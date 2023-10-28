import { Component, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/validators.service';
import { RegisterResponse } from '../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { EmptyError, switchMap } from 'rxjs';

@Component({
  selector: 'auth-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private activatedRoute = inject(ActivatedRoute);

  public resetPasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)] ],
    password2: ['', [Validators.required]]
  }, {
    validators: [this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  @Output() statusRes: string = RegisterResponse.checking;
  @Output() message = signal<string>('');

  isValidField(field: string) {
    return this.resetPasswordForm.controls[field].errors && this.resetPasswordForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getErrorField(this.resetPasswordForm, field);
  }

  changePassword() {
    const { password } = this.resetPasswordForm.value;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.authService.changePassword(password, id))
      ).subscribe({
        next: (msg) => {
          this.message.set(msg);
          this.statusRes = RegisterResponse.success
        },
        error: (error) => {
          this.message.set(error);
          this.statusRes = RegisterResponse.error;
        }
      })
  }

}
