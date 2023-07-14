/** @format */

import { IFieldSpec } from "./dynamic-form.component"
export type FormFieldBaseInit = Omit<IFieldSpec, "readonly" | "required"> & {
  readonly?: boolean
  required?: boolean
}

export abstract class FormFieldBase implements IFieldSpec {
  key: string
  readonly: boolean
  required: boolean
  label: string

  constructor(options: FormFieldBaseInit) {
    this.key = options.key
    this.label = options.label
    this.readonly = !!options.readonly
    this.required = !!options.required
  }
}
