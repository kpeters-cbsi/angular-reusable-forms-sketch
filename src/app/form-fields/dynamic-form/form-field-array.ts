/** @format */

import { FieldValue } from "./dynamic-form.component"
import { FormFieldBase, FormFieldBaseInit } from "./form-field-base"

export type FormFieldArrayInit<T> = FormFieldBaseInit & {
  type?: string
  addLabel?: string
  addIcon?: string
  addTooltip?: string
  removeLabel?: string
  removeIcon?: string
  removeTooltip?: string
  items?: T[]
  placeholder?: string
}
export class FormFieldArray<
  T extends FieldValue = FieldValue
> extends FormFieldBase {
  readonly: boolean
  label: string
  key: string
  addLabel: string
  addIcon?: string
  addTooltip?: string
  removeLabel: string
  removeIcon?: string
  removeTooltip?: string
  items: T[]
  required: boolean
  type: string
  placeholder?: string

  constructor(options: FormFieldArrayInit<T>) {
    super(options)
    this.addLabel = options.addLabel || "Add Item"
    this.addIcon = options.addIcon
    this.addTooltip = options.addTooltip
    this.removeLabel = options.removeLabel || "Remove Item"
    this.removeIcon = options.removeIcon
    this.removeTooltip = options.removeTooltip
    this.items = options.items || []
    this.type = options.type || "text"
    this.placeholder = this.placeholder
  }
}
