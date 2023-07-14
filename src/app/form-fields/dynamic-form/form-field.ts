/** @format */

import { FieldValue } from "./dynamic-form.component"
import { FormFieldBase, FormFieldBaseInit } from "./form-field-base"

export type FormFieldInit<T> = FormFieldBaseInit & {
  value?: T
  controlType: string
  type?: string
  options?: { key: string; value: string }[]
}
export class FormField<
  T extends FieldValue = FieldValue
> extends FormFieldBase {
  value: T | undefined
  controlType: string
  type: string
  options: { key: string; value: string }[]

  constructor(options: FormFieldInit<T>) {
    super(options)
    this.value = options.value
    this.controlType = options.controlType
    this.type = options.type || "text"
    this.options = options.options || []
  }
}
