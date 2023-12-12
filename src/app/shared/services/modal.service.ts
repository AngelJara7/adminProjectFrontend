import { EventEmitter, Injectable } from '@angular/core';
import { StatusToastNotification } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private _modalAddCollaboratorStatus: boolean = false;
  private _modalAlertStatus: boolean = false;
  private _modalDeleteColumn: boolean = false;
  private _modalPhotoStatus: boolean = false;
  private _modalProjectFormStatus: boolean = false;
  private _toastNotificationStatus: boolean = false;
  private _viewNewSharedColumnCard: boolean = false;

  public id: EventEmitter<string> = new EventEmitter<string>();

  public toastNotification: EventEmitter<StatusToastNotification> = new EventEmitter<StatusToastNotification>();

  get modalAddCollaboratorStatus() {
    return this._modalAddCollaboratorStatus;
  }

  set modalAddCollaboratorStatus(status: boolean) {
    this._modalAddCollaboratorStatus = status;
  }

  get modalAlertStatus() {
    return this._modalAlertStatus;
  }

  set modalAlertStatus(status: boolean) {
    this._modalAlertStatus = status;
  }

  get modalDeleteColumn() {
    return this._modalDeleteColumn;
  }

  set modalDeleteColumn(status: boolean) {
    this._modalDeleteColumn = status;
  }

  get modalPhotoStatus() {
    return this._modalPhotoStatus;
  }

  set modalPhotoStatus(status: boolean) {
    this._modalPhotoStatus = status;
  }

  get modalProjectFormStatus() {
    return this._modalProjectFormStatus;
  }

  set modalProjectFormStatus(status: boolean) {
    this._modalProjectFormStatus = status;
  }

  get toastNotificationStatus() {
    return this._toastNotificationStatus;
  }

  set toastNotificationStatus(status: boolean) {
    this._toastNotificationStatus = status;
  }

  get viewNewSharedColumnCard() {
    return this._viewNewSharedColumnCard;
  }

  set viewNewSharedColumnCard(status: boolean) {
    this._viewNewSharedColumnCard = status;
  }

}
