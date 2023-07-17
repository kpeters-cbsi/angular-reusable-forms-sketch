/** @format */

import { FieldValue } from "./dynamic-form.component"
import { FormFieldBase, FormFieldBaseInit } from "./form-field-base"

export type FormFieldInit<T> = FormFieldBaseInit<T> & {
  controlType?: string
  type?: string
  options?: { key: string; value: string }[]
}
export class FormFieldSpec<
  T extends FieldValue = FieldValue
> extends FormFieldBase<T> {
  controlType: string
  type: string
  options: { key: string; value: string }[]

  constructor(options: FormFieldInit<T>) {
    super(options)
    this.controlType = options.controlType || "text"
    this.type = options.type || "text"
    this.options = options.options || []
  }
}
