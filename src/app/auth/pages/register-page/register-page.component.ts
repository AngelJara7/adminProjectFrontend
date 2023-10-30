import { Component, Output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/validators.service';
import { AuthService } from '../../services/auth.service';
import { RegisterResponse } from '../../interfaces';

@Component({
  selector: 'auth-register-page',
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
    validators: [ this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2') ]
  });

  @Output() statusRes: string = RegisterResponse.checking;
  @Output() message = signal<string>('');

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
        next: (msg) => {
          this.message.set(msg);
          this.statusRes = RegisterResponse.success;
          this.registerForm.reset();
        },
        error: (error) => {
          this.message.set(`Error: ${error}`);
          this.statusRes = RegisterResponse.error;
        }
      });
  }

}
