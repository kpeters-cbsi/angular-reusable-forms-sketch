import { CommonModule } from '@angular/common';
import {
  Component,
  DoCheck,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ErrorMessageContainerComponent } from '../error-message-container/error-message-container.component';
import { FormFieldComponent } from '../form-field.component';

export interface FieldSpec<T> {
  placeholder?: string;
  value?: T;
}

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ErrorMessageContainerComponent,
    MatIconModule,
    FormFieldComponent,
  ],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => FormArrayComponent),
  //     multi: true,
  //   },
  // ],
})
export class FormArrayComponent<T>
  implements OnInit, ControlValueAccessor, DoCheck
{
  @Input()
  readonly?: boolean;

  @Input()
  fieldType?: string;

  @Input()
  addLabel?: string;

  @Input()
  addIcon?: string;

  @Input()
  addTooltip?: string | null;

  @Input()
  removeLabel?: string;

  @Input()
  removeTooltip?: string | null;

  @Input()
  removeIcon?: string;

  @Input({ required: true })
  label!: string;

  @Input()
  fields: FieldSpec<T>[] = [];

  @Input() ariaLabel: string;
  // giving the possibility to override the default error messages

  @Input() errorMessages: { [key: string]: string } = {};

  @Output() change = new EventEmitter<any>();

  ngOnInit() {
    console.info('FormArrayComponent::onInit()');
  }
  value: T[];
  text: string;
  disabled = false;
  required = false;

  onChange = (_value: T[]) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public controlDir: NgControl) {
    console.info('formArrayComponent::constructor', { controlDir });
    // bind the CVA to our control
    controlDir.valueAccessor = this;
  }

  ngDoCheck() {
    console.info('ngDoCheck', { control: this.controlDir.control });
    if (this.controlDir.control instanceof FormArray) {
      // check if this field is required or not to display a 'required label'
      const validator =
        this.controlDir.control.validator &&
        this.controlDir.control.validator(new FormArray([]));
      this.required =
        Boolean(validator && validator.hasOwnProperty('required')) ||
        Boolean(validator && validator.hasOwnProperty('selectedCount'));
    }
  }

  get hasErrors() {
    return (
      this.controlDir.control &&
      this.controlDir.control.touched &&
      this.controlDir.control.errors
    );
  }

  get control() {
    return this.controlDir?.control;
  }

  get formArray() {
    return this.control as FormArray;
  }
  // implementation of `ControlValueAccessor`
  writeValue(value: any): void {
    this.value = value;
    if (typeof value === 'string') {
      this.text = value;
    }

    this.onChange(this.value);
    this.change.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
  doChange(value: T[]) {
    this.writeValue(value);
  }

  elementAt(index: number) {
    return this.formArray.at(index) as FormControl<T>;
  }
  addItem() {
    this.formArray.push(new FormControl());
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }
}
