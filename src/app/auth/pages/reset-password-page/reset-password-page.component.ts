import { Component, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../../shared/validators.service';
import { RegisterResponse } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'auth-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public resetPasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)] ],
    password2: ['', [Validators.required]]
  }, {
    validators: [this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  @Output() statusRes: string = RegisterResponse.checking;
  @Output() message = signal<string>('');
  // public tokenExists = signal<boolean>(false);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({token}) => this.authService.verifyToken(token))
      ).subscribe({
        error: () => this.router.navigateByUrl('/not-found')
      });
  }

  isValidField(field: string) {
    return this.resetPasswordForm.controls[field].errors && this.resetPasswordForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getErrorField(this.resetPasswordForm, field);
  }

  changePassword() {
    const { password } = this.resetPasswordForm.value;

    this.activatedRoute.params
      .pipe(
        switchMap(({token}) => this.authService.changePassword(password, token))
      ).subscribe({
        next: (msg) => {
          this.message.set(msg);
          this.statusRes = RegisterResponse.success
        },
        error: () => this.router.navigateByUrl('/not-found')
      })
  }

}
