import { ModalAlertType } from '../interfaces/modal-alert.enum';
import { EventEmitter, Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { StatusToastNotification } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private _modalProjectFormStatus: boolean = false;
  private _modalPhotoStatus: boolean = false;
  private _modalAlertStatus: boolean = false;
  private _toastNotificationStatus: boolean = false;
  private _modalAddCollaboratorStatus: boolean = false;

  public id: EventEmitter<string> = new EventEmitter<string>();

  public toastNotification: EventEmitter<StatusToastNotification> = new EventEmitter<StatusToastNotification>();

  get modalProjectFormStatus() {
    return this._modalProjectFormStatus;
  }

  set modalProjectFormStatus(status: boolean) {
    this._modalProjectFormStatus = status;
  }

  get modalPhotoStatus() {
    return this._modalPhotoStatus;
  }

  set modalPhotoStatus(status: boolean) {
    this._modalPhotoStatus = status;
  }

  get modalAlertStatus() {
    return this._modalAlertStatus;
  }

  set modalAlertStatus(status: boolean) {
    this._modalAlertStatus = status;
  }

  get toastNotificationStatus() {
    return this._toastNotificationStatus;
  }

  set toastNotificationStatus(status: boolean) {
    this._toastNotificationStatus = status;
  }

  get modalAddCollaboratorStatus() {
    return this._modalAddCollaboratorStatus;
  }

  set modalAddCollaboratorStatus(status: boolean) {
    this._modalAddCollaboratorStatus = status;
  }

}
