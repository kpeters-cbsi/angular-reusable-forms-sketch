/** @format */

import { Component, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormFieldArray } from "../form-field-array"
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { FormFieldComponent } from "../form-field/form-field.component"
import { MatCardModule } from "@angular/material/card"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { ObjectFormField, Value } from "../object-form-field"
import { ObjectInputComponent } from "../object-input/object-input.component"

@Component({
  selector: "app-form-field-array",
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ObjectInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./form-field-array.component.html",
  styleUrls: ["./form-field-array.component.scss"],
})
export class FormFieldArrayComponent<T> implements OnInit {
  @Input({ required: true }) array!: FormFieldArray<T>
  @Input({ required: true }) form!: FormGroup

  ngOnInit(): void {
    console.debug("FormFieldArrayComponent::ngOnInit()", {
      controls: this.formArray.controls,
      formArray: this.form.controls[this.key].constructor.name,
      equalParents: this.formArray.parent === this.form,
      fields: this.fields,
    })
  }

  get isValid() {
    return this.form.controls[this.array.key].valid
  }

  elementAt(index: number) {
    return this.formArray.at(index) as FormControl<T>
  }

  addItem() {
    this.formArray.push(new FormControl())
  }

  removeItem(index: number) {
    this.formArray.removeAt(index)
  }

  get control() {
    return this.form.controls[this.key]
  }

  get formArray() {
    return this.control as FormArray<FormControl<T>>
  }

  get key() {
    return this.array.key
  }

  get addLabel() {
    return this.array.addLabel
  }

  get addIcon() {
    return this.array.addIcon
  }

  get addTooltip() {
    return this.array.addTooltip
  }

  get removeLabel() {
    return this.array.removeLabel
  }

  get removeTooltip() {
    return this.array.removeTooltip
  }

  get removeIcon() {
    return this.array.removeIcon
  }

  get fieldType() {
    return this.array.type
  }

  get placeholder() {
    return this.array.placeholder || `Value for ${this.key}`
  }

  get label() {
    return this.array.label
  }

  get fields() {
    return new ObjectFormField({
      key: `${this.key}_obj`,
      label: "",
      fields: this.array.fields,
      value: this.array.value[0] as Value,
    })
  }

  trackBy(idx: number) {
    return idx
  }

  constructorOf(item: any) {
    return typeof item === "object" ? item.constructor.name : typeof item
  }

  itemIsObject(i: number) {
    return typeof this.array.value[i] === "object"
  }
}
