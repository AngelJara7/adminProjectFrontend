import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { SharedSideBarComponent } from './components/side-bar/side-bar.component';
import { SharedServerInternalErrorPageComponent } from './pages/server-internal-error-page/server-internal-error-page.component';
import { SharedSearchBoxComponent } from './components/search-box/search-box.component';
import { SharedNotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SharedNavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModalProjectFormComponent } from './components/modal-project-form/modal-project-form.component';
import { SharedModalPhotoComponent } from './components/modal-photo/modal-photo.component';
import { SharedModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { SharedModalAddCollaboratorComponent } from './components/modal-add-collaborator/modal-add-collaborator.component';
import { SharedLoadingComponent } from './components/loading/loading.component';
import { SharedBreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SharedAlertComponent } from './components/alert/alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { SharedColumnCardComponent } from './components/column-card/column-card.component';
import { SharedModalDeleteColumnComponent } from './components/modal-delete-column/modal-delete-column.component';
import { SharedModalTaskFormComponent } from './components/modal-task-form/modal-task-form.component';

@NgModule({
  declarations: [
    SharedAlertComponent,
    SharedBreadcrumbsComponent,
    SharedColumnCardComponent,
    SharedLoadingComponent,
    SharedModalAddCollaboratorComponent,
    SharedModalAlertComponent,
    SharedModalDeleteColumnComponent,
    SharedModalPhotoComponent,
    SharedModalProjectFormComponent,
    SharedModalTaskFormComponent,
    SharedNavBarComponent,
    SharedNotFoundPageComponent,
    SharedSearchBoxComponent,
    SharedServerInternalErrorPageComponent,
    SharedSideBarComponent,
    SharedToastNotificationComponent,
  ],
  exports: [
    SharedAlertComponent,
    SharedBreadcrumbsComponent,
    SharedColumnCardComponent,
    SharedLoadingComponent,
    SharedModalAddCollaboratorComponent,
    SharedModalAlertComponent,
    SharedModalDeleteColumnComponent,
    SharedModalPhotoComponent,
    SharedModalProjectFormComponent,
    SharedModalTaskFormComponent,
    SharedNavBarComponent,
    SharedNotFoundPageComponent,
    SharedSearchBoxComponent,
    SharedServerInternalErrorPageComponent,
    SharedSideBarComponent,
    SharedToastNotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ]
})
export class SharedModule { }
