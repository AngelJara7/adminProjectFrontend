import { Component, Input, OnChanges, OnDestroy, OnInit, Output, computed, signal } from '@angular/core';
import { RegisterResponse } from '../../interfaces';
import { Observable } from 'rxjs';

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
    console.log('CONSTUYENDO...');
    this.ngOnChanges();
  }

  ngOnInit(): void {
    console.log('INICIANDO...');
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
