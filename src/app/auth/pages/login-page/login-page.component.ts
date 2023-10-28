import { Component, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/validators.service';
import { AuthService } from '../../services/auth.service';
import { RegisterResponse } from '../../interfaces';

@Component({
  selector: 'login-page',
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

  @Output() statusRes: string = RegisterResponse.checking;
  @Output() message: string = '';

  isValidField(field: string) {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
    // return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {

    return this.validatorsService.getErrorField(this.loginForm, field);
  }

  login() {
    const { email, password } = this.loginForm.value;

    // if (this.loginForm.valid) console.log('VALUE: ',this.loginForm.value);

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ((message) => {
          this.message = message;
          this.statusRes = RegisterResponse.error;
        })
      });
  }

}
