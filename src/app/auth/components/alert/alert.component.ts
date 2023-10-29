import { Component, Input, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { RegisterResponse } from '../../interfaces';

@Component({
  selector: 'auth-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy, OnChanges {

  @Input() statusRes: string = RegisterResponse.checking;
  @Input() message = signal<string>('');
  public imgAlert: string = '';

  constructor() {
    this.ngOnChanges();
  }

  ngOnInit(): void {
    this.ngOnChanges();
  }

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
    this.message.set('');
    this.imgAlert = '';
  }

}
