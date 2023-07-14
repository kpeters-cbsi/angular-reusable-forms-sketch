/** @format */

import { FormFieldArray } from "./form-field-array"

describe("FormArray", () => {
  it("should create an instance", () => {
    expect(
      new FormFieldArray({
        label: "label",
        key: "foo",
      })
    ).toBeTruthy()
  })
})
