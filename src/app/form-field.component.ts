import {
  Component,
  Input,
  NgZone,
  ViewChild,
  Optional,
  Self,
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { BaseFormField } from './base-form-field';
import { ErrorMessageContainerComponent } from './error-message-container/error-message-container.component';
@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
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
    @Optional() @Self() public controlDir: NgControl,
    private _ngZone: NgZone
  ) {
    super(controlDir);
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    console.log('Entering FormFieldComponent::OnInit');
    // this.setComponentControl();

    this.placeholder ??= null;
    this.errorMessages ??= {};
    this.required ??= !!this.required;
    this.readonly ??= !!this.readonly;
    this.value ??= null;
    this.type ??= 'text';
  }

  @Input({ required: true })
  label: string = '';

  @Input()
  placeholder?: string | null;

  @Input()
  required: boolean = false;

  @Input()
  readonly?: boolean = false;

  @Input()
  value: T | null = null;

  @Input()
  type: string = 'text';

  @Input()
  errorMessages: Record<string, string> = {};

  disabled = false;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  doChange(value: T) {
    this.writeValue(value);
  }
}
