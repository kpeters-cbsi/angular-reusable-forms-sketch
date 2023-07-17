/** @format */

import { Component, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms"
import { FormFieldComponent } from "./form-field/form-field.component"
import { FormFieldSpec } from "./form-field-spec"
import { FormFieldArray } from "./form-field-array"
import { FormFieldArrayComponent } from "./form-field-array/form-field-array.component"
import { ObjectInputComponent } from "./object-input/object-input.component"
import { ObjectFormField } from "./object-form-field"

export type FieldValue = Record<string, any> | string | number
export type IFieldSpec<T extends FieldValue = FieldValue> = {
  key: string
  label: string
  readonly: boolean
  required: boolean
  value: T | null
}
@Component({
  selector: "app-dynamic-form",
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    FormFieldArrayComponent,
    ObjectInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
})
export class DynamicFormComponent implements OnInit {
  public form!: FormGroup

  @Input() public fields: IFieldSpec[] | null = []
  @Input() public onSubmit: (formValue: any) => void = () => {}
  @Input() public class: string = ""

  ngOnInit(): void {
    const group: any = {}
    this.fields.forEach((field) => {
      if (field instanceof FormFieldArray) {
        console.debug("Value:", { value: field.value, field })
        const formArray = new FormArray(
          field.value.map((item) => new FormControl(item))
        )
        if (field.required) {
          formArray.addValidators(Validators.required)
        }
        group[field.key] = formArray
      } else if (field instanceof FormFieldSpec) {
        group[field.key] = field.required
          ? new FormControl(field.value, Validators.required)
          : new FormControl(field.value)
      } else if (field instanceof ObjectFormField) {
        // I feel like this should be just another DynamicForm, but DynamicForm
        // doesn't implement ControlValueAccessor...
        group[field.key] = new FormControl(field.value)
      } else {
        throw new Error(`Unsupported component type ${field.constructor.name}`)
      }
    })
    console.debug("DynamicFormComponent::ngOnInit()", { group })
    this.form = new FormGroup(group)
    //
  }

  public _onSubmit() {
    console.debug("CALL _onSubmit()", { payload: this.payload })
    this.onSubmit(this.payload)
  }

  get payload(): string {
    return this.form.getRawValue()
  }

  fieldType(field: IFieldSpec) {
    const fieldType = field.constructor?.name
    // console.debug(`Field type of field "${field.key}"`, { fieldType, field })
    return fieldType
  }

  formControlOf(field: IFieldSpec): FormControl {
    return this.form.controls[field.key] as FormControl
  }
}
