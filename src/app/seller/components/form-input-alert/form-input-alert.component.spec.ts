import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputAlertComponent } from './form-input-alert.component';

describe('FormInputAlertComponent', () => {
  let component: FormInputAlertComponent;
  let fixture: ComponentFixture<FormInputAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
