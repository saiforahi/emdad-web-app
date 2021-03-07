import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceViewModalComponent } from './invoice-view-modal.component';

describe('InvoiceViewModalComponent', () => {
  let component: InvoiceViewModalComponent;
  let fixture: ComponentFixture<InvoiceViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceViewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
