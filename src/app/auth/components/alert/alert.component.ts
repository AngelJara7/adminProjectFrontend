import { Component, Input, OnChanges, OnDestroy, OnInit, Output, computed } from '@angular/core';
import { RegisterResponse } from '../../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnDestroy, OnChanges {

  @Input() statusRes: string = RegisterResponse.checking;
  @Input() message: string = '';
  public imgAlert: string = '';

  ngOnChanges(): void {

    if (this.statusRes === RegisterResponse.success) {
      this.imgAlert = '../../../../assets/img/succes.svg';
    }

    if (this.statusRes === RegisterResponse.error) {
      this.imgAlert = '../../../../assets/img/error.svg';
    }
  }

  ngOnDestroy(): void {
    this.statusRes = RegisterResponse.checking;
    this.message = '';
    this.imgAlert = '';
  }

}
