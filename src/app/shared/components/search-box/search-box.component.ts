import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SharedSearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '';
  @Input() public controlName: FormControlName | undefined;

  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();

  emitValue(value: string): void  {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500),
      )
      .subscribe(value =>
        this.onDebounce.emit(value)
      );
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

}
