import { Component, Output, inject, signal } from '@angular/core';
import { RegisterResponse } from '../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public forgetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
  });

  isValidField(field: string) {
    return this.forgetPasswordForm.controls[field].errors && this.forgetPasswordForm.controls[field].touched;
  }

  getErrorField(field: string): string | null {
    return this.validatorsService.getErrorField(this.forgetPasswordForm, field);
  }

  @Output() statusRes: string = RegisterResponse.checking;
  @Output() message = signal<string>('');

  requestChangePassword() {

    const { email } = this.forgetPasswordForm.value;

    this.authService.requestChangePassword(email)
      .subscribe({
        next: (msg) => {
          this.message.set(msg);
          this.statusRes = RegisterResponse.success;
          this.forgetPasswordForm.reset();
        },
        error: (error) => {
          this.message.set(error);
          this.statusRes = RegisterResponse.error;
        }
      });
  }

}
