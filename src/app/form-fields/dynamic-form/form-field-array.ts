/** @format */

import { FieldValue, IFieldSpec } from "./dynamic-form.component"
import { FormFieldBase, FormFieldBaseInit } from "./form-field-base"
import { FormFieldSpec } from "./form-field-spec"
import { ObjectFormField } from "./object-form-field"

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
    fields?: { [Key in keyof T]: FormFieldSpec<T[Key]> }
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
  fields?: { [Key in keyof T]: FormFieldSpec<T[Key]> }

  constructor(options: FormFieldArrayInit<T>) {
    options.value ??= [] as T[]
    super(options)
    this.addLabel = options.addLabel || "Add Item"
    this.addIcon = options.addIcon
    this.addTooltip = options.addTooltip
    this.removeLabel = options.removeLabel || "Remove"
    this.removeIcon = options.removeIcon
    this.removeTooltip = options.removeTooltip
    this.type = options.type || "text"
    this.placeholder = this.placeholder
    this.fields = options.fields
  }
}
