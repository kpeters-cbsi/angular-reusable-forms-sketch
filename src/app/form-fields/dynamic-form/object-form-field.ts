/** @format */

import { FieldValue } from "./dynamic-form.component"
import { FormFieldSpec } from "./form-field-spec"
import { FormFieldBase, FormFieldBaseInit } from "./form-field-base"

export type Value = { [key: string]: FieldValue }
interface ObjectFormFieldInit<T extends Value> extends FormFieldBaseInit<T> {
  fields?: { [Key in keyof T]: FormFieldSpec<T[Key]> }
}

export class ObjectFormField<T extends Value> extends FormFieldBase<T> {
  fields!: { [Key in keyof T]: FormFieldSpec<T[Key]> }

  constructor(options: ObjectFormFieldInit<T>) {
    super({ ...options, value: options.value || ({} as T) })
    this.fields ??= Object.entries(options.value).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: new FormFieldSpec({
          label: key.slice(0, 1).toUpperCase() + key.slice(1),
          value,
          key,
        }),
      }),
      {} as NonNullable<ObjectFormFieldInit<T>["fields"]>
    )
    console.debug(`ObjectFormField::constructor`, {
      fields: this.fields,
      value: this.value,
    })
  }
}
