import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationViewModalComponent } from './quotation-view-modal.component';

describe('QuotationViewModalComponent', () => {
  let component: QuotationViewModalComponent;
  let fixture: ComponentFixture<QuotationViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
