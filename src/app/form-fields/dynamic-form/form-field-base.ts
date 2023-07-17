/** @format */

import { IFieldSpec } from "./dynamic-form.component"
export type FormFieldBaseInit<T> = Omit<
  IFieldSpec<T>,
  "readonly" | "required" | "value"
> & {
  readonly?: boolean
  required?: boolean
  value?: T
}

export abstract class FormFieldBase<T> implements IFieldSpec<T> {
  key: string
  readonly: boolean
  required: boolean
  label: string
  value: T

  constructor(options: FormFieldBaseInit<T>) {
    this.key = options.key
    this.label = options.label
    this.readonly = !!options.readonly
    this.required = !!options.required
    this.value = options.value || null
  }
}
