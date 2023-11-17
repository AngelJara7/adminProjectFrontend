import { Component, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';
import { AlertStatus } from 'src/app/shared/interfaces';

@Component({
  selector: 'auth-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);

  public forgetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
  });

  public isLoading: boolean = false;

  isValidField(field: string) {
    return this.forgetPasswordForm.controls[field].errors && this.forgetPasswordForm.controls[field].touched;
  }

  getErrorField(field: string): string | null {
    return this.validatorsService.getErrorField(this.forgetPasswordForm, field);
  }

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  requestChangePassword() {
    this.isLoading = true;
    const { email } = this.forgetPasswordForm.value;

    this.authService.requestChangePassword(email)
      .subscribe({
        next: (msg) => {
          this.message.set(msg);
          this.statusRes = AlertStatus.success;
          this.forgetPasswordForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.message.set(error.error);
          this.statusRes = AlertStatus.error;
        },
        complete: () => this.isLoading = false
      });
  }

}
