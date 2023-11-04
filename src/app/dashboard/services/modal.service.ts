import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private _modalStatus: boolean = false;

  get modalStatus() {
    return this._modalStatus;
  }

  viewModal() {
    this._modalStatus = true;
  }

  hideModal() {
    this._modalStatus = false;
  }
}
