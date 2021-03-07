import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInvoicesPageComponent } from './seller-invoices-page.component';

describe('SellerInvoicesPageComponent', () => {
  let component: SellerInvoicesPageComponent;
  let fixture: ComponentFixture<SellerInvoicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerInvoicesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerInvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
