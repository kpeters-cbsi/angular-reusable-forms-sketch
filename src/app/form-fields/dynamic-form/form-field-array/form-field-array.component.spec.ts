import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldArrayComponent } from './form-field-array.component';

describe('FormFieldArrayComponent', () => {
  let component: FormFieldArrayComponent;
  let fixture: ComponentFixture<FormFieldArrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldArrayComponent]
    });
    fixture = TestBed.createComponent(FormFieldArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
