import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ErrorMessageContainerComponent,
  ErrorMessages,
} from '../error-message-container/error-message-container.component';
import { FormFieldComponent } from '../form-field.component';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    ErrorMessageContainerComponent,
    MatIconModule,
    FormFieldComponent,
    FormArrayComponent,
  ],
})
export class FormArrayComponent<T> implements OnInit {
  @Input({ required: true })
  formArray!: FormArray<FormControl<T>>;

  @Input()
  readonly?: boolean;

  @Input()
  fieldType?: string;

  @Input()
  addLabel?: string = 'Un-yeet it';

  @Input()
  addIcon?: string;

  @Input()
  addTooltip?: string | null;

  @Input()
  removeLabel?: string = 'Yeet it';

  @Input()
  removeTooltip?: string | null;

  @Input()
  removeIcon?: string;

  @Input({ required: true })
  label!: string;

  @Input() errorMessages: ErrorMessages = {};

  formArrayName!: string;
  fg!: FormGroup;
  ngOnInit() {
    console.info('FormArrayComponent::onInit()', {
      parent: this.formArray.parent,
      array: this.formArray,
      parentIsAFormGroup: this.formArray.parent instanceof FormGroup,
    });
    this.addLabel ??= 'Add item';
    this.removeLabel ??= 'Remove item';
    const name = Object.keys(this.formGroup.controls).find(
      (name) => this.formGroup.get(name) === this.formArray
    );
    if (name) {
      console.info('FormArrayComponent::onInit found control name', { name });
      this.formArrayName = name;
    }
  }

  value!: T[];
  disabled = false;
  required = false;

  elementAt(index: number) {
    return this.formArray.at(index) as FormControl<T>;
  }
  addItem() {
    this.formArray.push(new FormControl());
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }

  get formGroup() {
    return this.formArray.parent as FormGroup<any>;
  }
}
