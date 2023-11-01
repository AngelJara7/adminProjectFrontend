import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ServerInternalErrorPageComponent } from './pages/server-internal-error-page/server-internal-error-page.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    ServerInternalErrorPageComponent,
    SideBarComponent
  ],
  exports: [
    NotFoundPageComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
