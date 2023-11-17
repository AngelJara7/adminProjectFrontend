import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ServerInternalErrorPageComponent } from './pages/server-internal-error-page/server-internal-error-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedAlertComponent } from './components/alert/alert.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    ServerInternalErrorPageComponent,
    SideBarComponent,
    NavBarComponent,
    SharedAlertComponent,
    ToastNotificationComponent
  ],
  exports: [
    NotFoundPageComponent,
    SideBarComponent,
    NavBarComponent,
    SharedAlertComponent,
    ToastNotificationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
