import { Component, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { AuthService } from '../../../shared/services/auth.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AlertStatus } from 'src/app/shared/interfaces';

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
  public userName: string = '';
  public isLoading: boolean = false;

  @Output() statusRes: string = AlertStatus.checking;
  @Output() message = signal<string>('');

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({token}) => this.authService.verifyToken(token))
      ).subscribe({
        next: (user) => this.userName = user,
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
    this.isLoading = true;
    const { password } = this.resetPasswordForm.value;

    this.activatedRoute.params
      .pipe(
        switchMap(({token}) => this.authService.changePassword(password, token))
      ).subscribe({
        next: (msg) => {
          this.isLoading = false;
          this.message.set(msg);
          this.statusRes = AlertStatus.success;
          this.resetPasswordForm.reset();
        },
        error: (error) => this.message.set(error),
        complete: () => this.isLoading = false
      });
  }

}
