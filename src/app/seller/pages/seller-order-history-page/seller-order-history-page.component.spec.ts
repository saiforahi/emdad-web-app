import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderHistoryPageComponent } from './seller-order-history-page.component';

describe('SellerOrderHistoryPageComponent', () => {
  let component: SellerOrderHistoryPageComponent;
  let fixture: ComponentFixture<SellerOrderHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerOrderHistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOrderHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
