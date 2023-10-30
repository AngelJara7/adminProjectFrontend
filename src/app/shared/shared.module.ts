import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ServerInternalErrorPageComponent } from './pages/server-internal-error-page/server-internal-error-page.component';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    ServerInternalErrorPageComponent
  ],
  exports: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
