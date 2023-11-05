import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmAccountPageComponent } from './pages/confirm-account-page/confirm-account-page.component';
import { SharedAlertComponent } from '../shared/components/alert/alert.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginPageComponent,
    AuthLayoutComponent,
    RegisterPageComponent,
    ConfirmAccountPageComponent,
    ForgetPasswordComponent,
    ResetPasswordPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
