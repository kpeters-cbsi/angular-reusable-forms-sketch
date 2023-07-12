import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'error-message-container',
  templateUrl: './error-message-container.component.html',
  styleUrls: ['./error-message-container.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, CommonModule],
})
export class ErrorMessageContainerComponent implements OnInit {
  @Input({ required: true })
  control!: FormControl;

  @Input({ required: true })
  errorMessages!: Record<string, string>;

  constructor() {}

  ngOnInit() {}
}
