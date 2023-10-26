import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    password1: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]]
  });
  public errorForm: boolean = false;
  public message: string = '';

  isValidField(field: string) {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
    // return this.validatorsService.isValidField(this.registerForm, field);
  }

  getErrorField(field: string): string | null {

    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;

        case 'pattern':
          return 'Introduzca un e-mail válido';
      }
    }

    return null;
  }

}
