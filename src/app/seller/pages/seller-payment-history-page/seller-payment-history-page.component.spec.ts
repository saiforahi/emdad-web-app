import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPaymentHistoryPageComponent } from './seller-payment-history-page.component';

describe('SellerPaymentHistoryPageComponent', () => {
  let component: SellerPaymentHistoryPageComponent;
  let fixture: ComponentFixture<SellerPaymentHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerPaymentHistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPaymentHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
