import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSignupFormComponent } from './buyer-signup-form.component';

describe('BuyerSignupFormComponent', () => {
  let component: BuyerSignupFormComponent;
  let fixture: ComponentFixture<BuyerSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSignupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
