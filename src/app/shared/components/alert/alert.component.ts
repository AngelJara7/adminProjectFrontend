import { Component, Input, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { AlertStatus } from '../../interfaces';



@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class SharedAlertComponent implements OnInit, OnDestroy, OnChanges {

  public alertStatus = AlertStatus;
  public imgAlert: string = '';
  @Input() statusRes: string = this.alertStatus.checking;
  @Input() message = signal<string>('');

  constructor() {
    this.ngOnChanges();
  }

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {

    if (this.statusRes === this.alertStatus.success) {
      this.imgAlert = '../../../../assets/img/succes.svg';
    }

    if (this.statusRes === this.alertStatus.error) {
      this.imgAlert = '../../../../assets/img/error.svg';
    }
  }

  ngOnDestroy(): void {
    this.statusRes = this.alertStatus.checking;
    this.message.set('');
    this.imgAlert = '';
  }

}
