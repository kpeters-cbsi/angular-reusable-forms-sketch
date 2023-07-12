import {
  Component,
  forwardRef,
  Input,
  OnInit,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
  ],
})
export class FormFieldComponent<T> implements ControlValueAccessor, OnInit {
  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    console.debug('OnInit', { this: this });
    this.placeholder ??= null;
    this.errorMessages ??= {};
    this.required ??= !!this.required;
    this.readonly ??= !!this.readonly;
    this.value ??= null;
    this.type ??= 'text';
  }
  @Input({ required: true })
  label!: string;

  @Input()
  placeholder?: string | null;

  @Input()
  errorMessages?: Record<string, string>;

  @Input()
  required?: boolean = false;

  @Input()
  readonly?: boolean = false;

  @Input()
  value?: T | null;

  @Input()
  type: string = 'text';

  disabled = false;

  private valueChanges = new Subject<T | null>();

  private touches = new Subject();

  registerOnChange(fn: any) {
    this.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.touches.subscribe(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(value: T | null) {
    this.value = value;
  }

  updateValue(value: T | null) {
    console.debug('UpdateValue', { value });
    this.value = value;
    this.valueChanges.next(value);
  }

  touch() {
    this.touches.next('');
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
