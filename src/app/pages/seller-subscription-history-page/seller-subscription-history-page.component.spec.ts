import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSubscriptionHistoryPageComponent } from './seller-subscription-history-page.component';

describe('SellerSubscriptionHistoryPageComponent', () => {
  let component: SellerSubscriptionHistoryPageComponent;
  let fixture: ComponentFixture<SellerSubscriptionHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSubscriptionHistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSubscriptionHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
