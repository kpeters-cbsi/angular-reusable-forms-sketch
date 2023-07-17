/** @format */

import { FieldValue } from "./dynamic-form.component"
import { FormFieldBase, FormFieldBaseInit } from "./form-field-base"

export type FormFieldArrayInit<T extends FieldValue = FieldValue> =
  FormFieldBaseInit<T[]> & {
    type?: string
    addLabel?: string
    addIcon?: string
    addTooltip?: string
    removeLabel?: string
    removeIcon?: string
    removeTooltip?: string
    placeholder?: string
  }
export class FormFieldArray<
  T extends FieldValue = FieldValue
> extends FormFieldBase<T[]> {
  readonly: boolean
  label: string
  key: string
  addLabel: string
  addIcon?: string
  addTooltip?: string
  removeLabel: string
  removeIcon?: string
  removeTooltip?: string
  required: boolean
  type: string
  placeholder?: string

  constructor(options: FormFieldArrayInit<T>) {
    super({ ...options, value: options.value || ([] as T[]) })
    this.addLabel = options.addLabel || "Add Item"
    this.addIcon = options.addIcon
    this.addTooltip = options.addTooltip
    this.removeLabel = options.removeLabel || "Remove"
    this.removeIcon = options.removeIcon
    this.removeTooltip = options.removeTooltip
    this.type = options.type || "text"
    this.placeholder = this.placeholder
  }
}
