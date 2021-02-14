import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSigninFormComponent } from './buyer-login-modal-form.component';

describe('BuyerSigninFormComponent', () => {
  let component: BuyerSigninFormComponent;
  let fixture: ComponentFixture<BuyerSigninFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSigninFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerSigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
