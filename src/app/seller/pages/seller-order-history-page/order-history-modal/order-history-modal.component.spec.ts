import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryModalComponent } from './order-history-modal.component';

describe('OrderHistoryModalComponent', () => {
  let component: OrderHistoryModalComponent;
  let fixture: ComponentFixture<OrderHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHistoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
