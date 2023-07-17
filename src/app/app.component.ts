/** @format */

import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from "@angular/forms"
import { FormFieldComponent } from "./form-field.component"
import { MatCardModule } from "@angular/material/card"
import { MatTabsModule } from "@angular/material/tabs"
import { TextFieldModule } from "@angular/cdk/text-field"
import { FormArrayComponent } from "./form-array-component/form-array.component"
import {
  DynamicFormComponent,
  IFieldSpec,
} from "./form-fields/dynamic-form/dynamic-form.component"
import { FormFieldSpec } from "./form-fields/dynamic-form/form-field-spec"
import { FormFieldArray } from "./form-fields/dynamic-form/form-field-array"
import { ObjectFormField } from "./form-fields/dynamic-form/object-form-field"
type MyObject = {
  Key: string
  Value: string
}
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    MatCardModule,
    TextFieldModule,
    FormArrayComponent,
    DynamicFormComponent,
    MatTabsModule,
  ],
})
export class AppComponent implements OnInit {
  form = new FormGroup({
    quantity: new FormControl<Number | null>(null),
    type: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    textarea: new FormControl<string | null>(null),
    array: new FormArray<FormControl<string | null>>([], {
      validators: [Validators.minLength(2), Validators.maxLength(4)],
    }),
  })

  fields!: IFieldSpec[]
  formValue?: Record<string, any>

  ngOnInit() {
    console.info("AppComponent::OnInit()", { array: this.array })
    this.array.controls.push(new FormControl("") as FormControl<string>)

    this.fields = [
      new FormFieldSpec<Number>({
        label: "Numeric Field",
        key: "number",
        value: 37,
        required: true,
        controlType: "text",
        type: "number",
      }),
      new FormFieldSpec<string>({
        label: "Text Field",
        key: "text",
        value: "Foo bar baz",
        required: true,
        controlType: "text",
      }),
      new FormFieldSpec<string>({
        label: "Textarea",
        key: "textarea",
        value:
          "Lorem ipsum dolor sic amet\nQuot erat demonstradum\nSolve et coagula",
        controlType: "textarea",
      }),
      new ObjectFormField<MyObject>({
        label: "Object",
        key: "object",
        value: {
          Key: "Argle",
          Value: "Bargle",
        },
        fields: {
          Key: new FormFieldSpec<string>({
            label: "Key",
            key: "Key",
          }),
          Value: new FormFieldSpec<string>({
            label: "Value",
            key: "Value",
          }),
        },
      }),
      new FormFieldArray<string>({
        label: "string Array",
        key: "stringarray",
        type: "text",
        value: ["Foo", "Bar"],
      }),

      // new FormFieldArray<MyObject>({
      //   label: "Object Array",
      //   key: "objarray",
      //   items: [
      //     {
      //       Key: "Key 1",
      //       Value: "Value 1",
      //     },
      //     {
      //       Key: "Key 2",
      //       Value: "Value 2",
      //     },
      //   ],
      // }),
    ]
  }

  onSubmit(formValue: Record<string, any>) {
    console.debug("Stumbit", { formValue })
    this.formValue = formValue
  }

  readonly errorMessages = {
    required: "This field is required",
    minlength: ({
      requiredLength,
      actualLength,
    }: {
      requiredLength: number
      actualLength: number
    }) =>
      `There are only ${actualLength} items. There must be at least ${requiredLength}`,
    maxlength: ({
      requiredLength,
      actualLength,
    }: {
      requiredLength: number
      actualLength: number
    }) =>
      `There are only ${actualLength} items. There must be at most ${requiredLength}`,
  }
  get quantity() {
    return this.form.get("quantity") as FormControl<Number | null>
  }
  get type() {
    return this.form.get("type") as FormControl<string | null>
  }
  get textarea() {
    return this.form.get("textarea") as FormControl<string | null>
  }
  get array() {
    return this.form.get("array") as FormArray<FormControl<string>>
  }
}
