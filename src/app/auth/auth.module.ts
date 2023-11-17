import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ConfirmAccountPageComponent } from './pages/confirm-account-page/confirm-account-page.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthServiceInterceptor } from './interceptors/auth-service.interceptor';


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
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthServiceInterceptor,
  //     multi: true
  //   }
  // ],
})
export class AuthModule { }
