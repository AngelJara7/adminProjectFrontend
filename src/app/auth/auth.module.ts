import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmAccountPageComponent } from './pages/confirm-account-page/confirm-account-page.component';
import { AlertComponent } from './components/alert/alert.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    AuthLayoutComponent,
    RegisterPageComponent,
    ConfirmAccountPageComponent,
    AlertComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
