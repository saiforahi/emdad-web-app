import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSignupFormComponent } from './seller-signup-form.component';

describe('SellerSignupFormComponent', () => {
  let component: SellerSignupFormComponent;
  let fixture: ComponentFixture<SellerSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSignupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
