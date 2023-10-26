import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/shared/validators.service';

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
  public errorForm: boolean = false;
  public message: string = '';

  isValidField(field: string) {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
    // return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError(field: string): string | null {
    if(!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;

        case 'pattern':
          return `Introduzca un email válido`;
      }
    }
    return null;
  }

  login() {
    const { email, password } = this.loginForm.value;

    // if (this.loginForm.valid) console.log('VALUE: ',this.loginForm.value);

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ((message) => {
          this.message = message;
          this.errorForm = true;
        })
      });
  }

  closeAlert() {
    this.errorForm = false;
  }

}
