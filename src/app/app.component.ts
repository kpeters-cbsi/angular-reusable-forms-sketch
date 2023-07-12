import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';
import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    MatCardModule,
    TextFieldModule,
  ],
})
export class AppComponent {
  form = new FormGroup({
    quantity: new FormControl<Number | null>(null),
    type: new FormControl<String | null>(null),
    textarea: new FormControl<String | null>(null),
  });

  get quantity() {
    return this.form.get('quantity') as FormControl<Number | null>;
  }
  get type() {
    return this.form.get('type') as FormControl<String | null>;
  }
  get textarea() {
    return this.form.get('textarea') as FormControl<String | null>;
  }
}
