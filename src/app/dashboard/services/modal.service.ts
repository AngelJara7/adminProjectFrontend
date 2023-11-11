import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private _modalProjectFormStatus: boolean = false;
  private _modalImgStatus: boolean = false;

  get modalProjectFormStatus() {
    return this._modalProjectFormStatus;
  }

  set modalProjectFormStatus(status: boolean) {
    this._modalProjectFormStatus = status;
  }

  get modalImgStatus() {
    return this._modalImgStatus;
  }

  set modalImgStatus(status: boolean) {
    this._modalImgStatus = status;
  }

}
