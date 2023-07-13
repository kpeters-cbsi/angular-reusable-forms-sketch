/** @format */

import {
  Component,
  Input,
  NgZone,
  ViewChild,
  Optional,
  Self,
} from "@angular/core"
import { FormsModule, NgControl } from "@angular/forms"
import { CommonModule } from "@angular/common"

import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { CdkTextareaAutosize } from "@angular/cdk/text-field"
import { TextFieldModule } from "@angular/cdk/text-field"
import { take } from "rxjs/operators"
import { BaseFormField } from "./base-form-field"
import {
  ErrorMessageContainerComponent,
  ErrorMessages,
} from "./error-message-container/error-message-container.component"
@Component({
  selector: "app-form-field",
  templateUrl: "./form-field.component.html",
  styles: [".mat-mdc-form-field { display: block; }"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ErrorMessageContainerComponent,
  ],
})
export class FormFieldComponent<T> extends BaseFormField {
  constructor(
    @Optional() @Self() public override controlDir: NgControl,
    private _ngZone: NgZone
  ) {
    super(controlDir)
  }

  @ViewChild("autosize") autosize!: CdkTextareaAutosize

  ngOnInit(): void {
    console.log("Entering FormFieldComponent::OnInit")
    // this.setComponentControl();

    this.placeholder ??= null
    this.errorMessages ??= {}
    this.required ??= !!this.required
    this.readonly ??= !!this.readonly
    this.value ??= null
    this.type ??= "text"
  }

  @Input()
  override value: T | null = null
  @Input()
  placeholder?: string | null

  @Input()
  readonly?: boolean = false

  @Input()
  type?: string = "text"

  @Input() override label!: string
  // giving the possibility to override the default error messages
  @Input() override errorMessages: ErrorMessages = {}

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true))
  }

  doChange(value: any) {
    console.debug("doChange()", { value })
    this.writeValue(value)
  }
}
