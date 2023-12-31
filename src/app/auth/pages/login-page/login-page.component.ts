import { Component, Output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../../shared/services/auth.service';
import { AlertStatus } from 'src/app/shared/interfaces';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  public isLoading: boolean = false;

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  isValidField(field: string) {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
    // return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {

    return this.validatorsService.getErrorField(this.loginForm, field);
  }

  login() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (error) => {
          this.isLoading = false;
          this.message.set(error.error);
          this.statusRes = AlertStatus.error;
        },
        complete: () => this.isLoading = false,
      });
  }

}
