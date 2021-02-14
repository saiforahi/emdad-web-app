import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRegistrationFormComponent } from './buyer-Registration-modal-form.component';

describe('BuyerRegistrationFormComponent', () => {
  let component: BuyerRegistrationFormComponent;
  let fixture: ComponentFixture<BuyerRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
