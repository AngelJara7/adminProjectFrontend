import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService implements AsyncValidator {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public emptySpace = /\s/;

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const clave = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>((subcriber) => {
      if (this.emptySpace.test(clave)) {
        subcriber.next({ taken: 'No se permiten espacios en blanco' });
        subcriber.complete();
      }
      subcriber.next(null);
      subcriber.complete();
    });

    return httpCallObservable;
  }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field] && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: 'Las contraseñas no son iguales' });
        return { notEqual: 'Las contraseñas no son iguales' }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  getErrorField(form: FormGroup, field: string): string | null {

    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
            return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;

        case 'pattern':
          return 'Introduzca un e-mail válido';

        case 'taken':
          return 'No se permiten espacios en blanco';

        case 'notEqual':
          return 'La contraseña no coincide';
      }
    }

    return null;
  }

}
