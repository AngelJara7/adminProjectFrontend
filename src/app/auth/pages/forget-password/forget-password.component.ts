import { Component, Output, inject } from '@angular/core';
import { RegisterResponse } from '../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/validators.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public forgetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]]
  });

  isValidField(field: string) {
    return this.forgetPasswordForm.controls[field].errors && this.forgetPasswordForm.controls[field].touched;
  }

  getErrorField(field: string): string | null {
    return this.validatorsService.getErrorField(this.forgetPasswordForm, field);
  }

  @Output() statusRes: string = RegisterResponse.checking;
  @Output() message: string = '';

  solicitar() {
    if (this.forgetPasswordForm.valid) console.log(this.forgetPasswordForm.value);
  }

  goBack() {
    console.log(this.router.getCurrentNavigation());
  }

}
