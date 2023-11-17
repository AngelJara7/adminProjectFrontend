import { Component, Input, signal } from '@angular/core';
import { AlertStatus } from '../../interfaces';

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class SharedAlertComponent {

  public alertStatus = AlertStatus;
  @Input() statusRes: string = this.alertStatus.checking;
  @Input() message = signal<string>('');

  closeAlert() {
    this.statusRes = this.alertStatus.checking;
    this.message.set('');
  }

}
