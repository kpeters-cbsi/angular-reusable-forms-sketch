/** @format */

import { CommonModule } from "@angular/common"
import { Component, Input, OnInit } from "@angular/core"
import { ValidationErrors } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"

export type ErrorMessageFn = (err: any) => string
export type ErrorMessages = { [key: string]: string | ErrorMessageFn }
@Component({
  selector: "error-message-container",
  templateUrl: "./error-message-container.component.html",
  styleUrls: ["./error-message-container.component.css"],
  standalone: true,
  imports: [MatFormFieldModule, CommonModule],
})
export class ErrorMessageContainerComponent implements OnInit {
  @Input()
  errors?: ValidationErrors | null

  @Input({ required: true })
  errorMessages!: ErrorMessages

  constructor() {}

  ngOnInit() {
    console.debug("ErrorMessageContainerComponent::OnInit()", {
      errors: this.errors,
      errorMessages: this.errorMessages,
    })
  }

  getErrorMessage(key: string) {
    let errorMessage: string | undefined
    const error = this.errors?.[key]
    if (error) {
      if (this.errorMessages[key] instanceof Function) {
        // console.debug(`Call "${key}" function`, { arg: this.errors?.[key] });
        errorMessage = (this.errorMessages[key] as ErrorMessageFn)(
          this.errors?.[key]
        )
      } else {
        errorMessage = this.errorMessages[key] as string
      }
    }
    // console.debug(`Error for "${key}"`, { errorMessage, errors: this.errors });
    return errorMessage
  }
}
