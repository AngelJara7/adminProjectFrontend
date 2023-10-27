import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/validators.service';
import { AuthService } from '../../services/auth.service';
import { RegisterResponse } from '../../interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerForm: FormGroup = this.fb.group({
    nombre: ['angelpeluso7', [Validators.required]],
    email: ['angelpeluso7@correo.com', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['angelpeluso7', [Validators.required, Validators.minLength(8)]],
    password2: ['angelpeluso7', [Validators.required]]
  }, {
    validators: [ this.service.isFieldOneEqualFieldTwo('password', 'password2') ]
  });

  public viewAlert: boolean = false;
  public statusRes: string = RegisterResponse.checking;
  public message: string = '';
  public imgAlert: string = '';
  public success: string = RegisterResponse.success;
  public error: string = RegisterResponse.error;

  constructor(
    private service: ValidatorsService
  ) {

  }

  isValidField(field: string) {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
    // return this.validatorsService.isValidField(this.registerForm, field);
  }

  getErrorField(field: string): string | null {

    return this.validatorsService.getErrorField(this.registerForm, field);
  }

  register() {
    const { password2, ...userCredentials } = this.registerForm.value;

    // if (this.registerForm.valid) console.log('VALUE: ',this.registerForm.value);

    this.authService.register(userCredentials)
      .subscribe({
        next: ((msg) => {
          this.message = msg;
          this.viewAlert = true;
          this.statusRes = RegisterResponse.success;
          this.imgAlert = '../../../../assets/img/succes.svg';
        }),
        error: ((error) => {
          this.message = `Error: ${error}`;
          this.viewAlert = true;
          this.statusRes = RegisterResponse.error;
          this.imgAlert = '../../../../assets/img/error.svg';
        })
      });
  }

  closeAlert() {
    this.viewAlert = false;
    this.statusRes = RegisterResponse.checking;
  }

}
