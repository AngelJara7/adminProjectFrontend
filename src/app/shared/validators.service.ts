import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field] && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fireldValue1 = formGroup.get(field1)?.value;
      const fireldValue2 = formGroup.get(field2)?.value;

      if (fireldValue1 !== fireldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: 'Las contraseñas no son iguales' });
        return { notEqual: 'Las contraseñas no son iguales' }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  getErrorField(form: FormGroup, field: string): string | null {

    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;

        case 'pattern':
          return 'Introduzca un e-mail válido';

        case 'notEqual':
          return 'La contraseña no coincide';
      }
    }

    return null;
  }

}
