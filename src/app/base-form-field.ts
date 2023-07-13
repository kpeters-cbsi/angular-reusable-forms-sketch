/** @format */

import {
  DoCheck,
  EventEmitter,
  Injectable,
  Input,
  Optional,
  Output,
  Self,
} from "@angular/core"
import { ControlValueAccessor, FormControl, NgControl } from "@angular/forms"

@Injectable()
export abstract class BaseFormField implements ControlValueAccessor, DoCheck {
  @Input() label!: string
  @Input() ariaLabel!: string
  // giving the possibility to override the default error messages
  @Input() errorMessages: { [key: string]: any } = {}

  @Output() change = new EventEmitter<any>()

  value: any
  text!: string
  disabled = false
  required = false

  onChange = (_value: any) => {}
  onTouched = () => {}

  constructor(@Optional() @Self() public controlDir: NgControl) {
    // bind the CVA to our control
    controlDir.valueAccessor = this
  }

  ngDoCheck() {
    if (this.controlDir.control instanceof FormControl) {
      // check if this field is required or not to display a 'required label'
      const validator =
        this.controlDir.control.validator &&
        this.controlDir.control.validator(new FormControl(""))
      this.required =
        Boolean(validator && validator.hasOwnProperty("required")) ||
        Boolean(validator && validator.hasOwnProperty("selectedCount"))
    }
  }

  get hasErrors() {
    return (
      this.controlDir.control &&
      this.controlDir.control.touched &&
      this.controlDir.control.errors
    )
  }

  get control() {
    return this.controlDir?.control
  }

  // implementation of `ControlValueAccessor`
  writeValue(value: any): void {
    this.value = value
    if (typeof value === "string") {
      this.text = value
    }

    this.onChange(this.value)
    this.change.emit(this.value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
  }
}
