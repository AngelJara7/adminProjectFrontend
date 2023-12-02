import { Component, Output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../../shared/services/auth.service';
import { AlertStatus } from 'src/app/shared/interfaces';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required]]
  }, {
    validators: [ this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2') ]
  });

  public isLoading: boolean = false;

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  isValidField(field: string) {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
    // return this.validatorsService.isValidField(this.registerForm, field);
  }

  getErrorField(field: string): string | null {

    return this.validatorsService.getErrorField(this.registerForm, field);
  }

  register() {
    this.isLoading = true;
    const { password2, ...userCredentials } = this.registerForm.value;

    this.authService.register(userCredentials)
      .subscribe({
        next: (msg) => {
          this.message.set(msg);
          this.statusRes = AlertStatus.success;
          this.registerForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.message.set(`Error: ${error.error}`);
          this.statusRes = AlertStatus.error;
        },
        complete: () => this.isLoading = false
      },);
  }

}
