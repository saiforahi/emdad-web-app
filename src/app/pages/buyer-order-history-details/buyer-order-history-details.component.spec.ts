import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderHistoryDetailsComponent } from './buyer-order-history-details.component';

describe('BuyerOrderHistoryDetailsComponent', () => {
  let component: BuyerOrderHistoryDetailsComponent;
  let fixture: ComponentFixture<BuyerOrderHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerOrderHistoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerOrderHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
