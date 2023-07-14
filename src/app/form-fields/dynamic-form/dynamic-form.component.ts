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
import { FormField } from "./form-field"
import { FormFieldArray } from "./form-field-array"
import { FormFieldArrayComponent } from "./form-field-array/form-field-array.component"

export type FieldValue = Record<string, any> | string | number
export type IFieldSpec = {
  key: string
  label: string
  readonly: boolean
  required: boolean
}
@Component({
  selector: "app-dynamic-form",
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    FormFieldArrayComponent,
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
        const formArray = new FormArray(
          field.items.map((item) => new FormControl(item))
        )
        if (field.required) {
          formArray.addValidators(Validators.required)
        }
        group[field.key] = formArray
      } else if (field instanceof FormField) {
        group[field.key] = field.required
          ? new FormControl(field.value, Validators.required)
          : new FormControl(field.value)
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

  public isArray(field: IFieldSpec) {
    return field instanceof FormFieldArray
  }
}
