import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerQuotationViewComponent } from './buyer-quotation-view.component';

describe('BuyerQuotationViewComponent', () => {
  let component: BuyerQuotationViewComponent;
  let fixture: ComponentFixture<BuyerQuotationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerQuotationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerQuotationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
