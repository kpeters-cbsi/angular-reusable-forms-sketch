/** @format */

import { Component, Input, OnDestroy, OnInit, forwardRef } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms"
import { ObjectFormField, Value } from "../object-form-field"
import { MatInputModule } from "@angular/material/input"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { FormFieldComponent } from "../form-field/form-field.component"
import { Subject, takeUntil } from "rxjs"

type FormControlOf<T> = { [Key in keyof T]: FormControl<T> }
@Component({
  selector: "app-object-input",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
  templateUrl: "./object-input.component.html",
  styleUrls: ["./object-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ObjectInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ObjectInputComponent),
      multi: true,
    },
  ],
})
export class ObjectInputComponent<T extends Value>
  implements OnInit, ControlValueAccessor, Validator, OnDestroy
{
  // @Input({ required: true })
  // form!: FormGroup

  @Input({ required: true })
  field!: ObjectFormField<T>

  form!: FormGroup<FormControlOf<T>>

  value?: any
  disabled = false
  onTouched: any = () => {}
  onChange: any = () => {}
  destroySubject = new Subject<void>()

  ngOnInit(): void {
    console.debug("ObjectInputComponent::ngOnInit()", { field: this.field })
    this.form = new FormGroup(
      Object.keys(this.field.fields).reduce((acc, key) => {
        const fieldSpec = this.field.fields[key]
        const control = new FormControl(fieldSpec.value)
        if (fieldSpec.required) {
          control.addValidators(Validators.required)
        }
        return { ...acc, [key]: control }
      }, {} as FormControlOf<T>)
    )
    this.form
    console.debug("ObjectInputComponent::ngOnInit()", { f: this.form })
  }

  ngOnDestroy(): void {
    this.destroySubject.next()
    this.destroySubject.complete()
  }

  validate(_control: AbstractControl<any, any>): ValidationErrors | null {
    return this.form.valid ? null : { [this.field.key]: true }
  }

  writeValue(obj: T): void {
    this.form.patchValue(obj as any, { emitEvent: false })
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe(takeUntil(this.destroySubject)).subscribe(fn)
    // this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInputBlur(event: Event) {
    const newValue = (event.target as HTMLInputElement).value
    this.value = newValue
    this.onChange(this.value)
    this.onTouched()
  }

  get isValid() {
    return this.form.controls[this.field.key].valid
  }

  get fields() {
    // console.debug("ObjectInputComponent::fields", {
    //   keyvals: Object.entries(this.field.value),
    // })
    return this.field.fields
  }
}
