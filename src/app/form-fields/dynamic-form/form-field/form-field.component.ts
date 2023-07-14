/** @format */

import { Component, Input, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TextFieldModule } from "@angular/cdk/text-field"
import { ReactiveFormsModule, FormGroup } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatIconModule } from "@angular/material/icon"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { FormField } from "../form-field"

@Component({
  selector: "app-form-field",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: "./form-field.component.html",
  styleUrls: ["./form-field.component.scss"],
})
export class FormFieldComponent<T> implements OnInit {
  @Input({ required: true }) field!: FormField<T>
  @Input({ required: true }) form!: FormGroup

  ngOnInit(): void {
    // console.debug("FormFieldComponent::ngOnInit()", {
    //   field: this.field,
    //   form: this.form,
    //   controls: this.form?.controls,
    //   key: this.field.key,
    // })
  }
  get isValid() {
    return this.form.controls[this.field.key].valid
  }
}
