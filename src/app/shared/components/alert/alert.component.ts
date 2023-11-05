import { Component, Input, OnChanges, OnDestroy, OnInit, signal } from '@angular/core';
import { AlertStatus } from '../../interfaces';



@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class SharedAlertComponent implements OnInit, OnDestroy, OnChanges {

  @Input() statusRes: string = AlertStatus.checking;
  @Input() message = signal<string>('');
  public imgAlert: string = '';

  constructor() {
    this.ngOnChanges();
  }

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {

    if (this.statusRes === AlertStatus.success) {
      this.imgAlert = '../../../../assets/img/succes.svg';
    }

    if (this.statusRes === AlertStatus.error) {
      this.imgAlert = '../../../../assets/img/error.svg';
    }
  }

  ngOnDestroy(): void {
    this.statusRes = AlertStatus.checking;
    this.message.set('');
    this.imgAlert = '';
  }

}
