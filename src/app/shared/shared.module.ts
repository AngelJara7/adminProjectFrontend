import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ServerInternalErrorPageComponent } from './pages/server-internal-error-page/server-internal-error-page.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    ServerInternalErrorPageComponent,
    SideBarComponent,
    NavBarComponent
  ],
  exports: [
    NotFoundPageComponent,
    SideBarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
