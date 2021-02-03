import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewModalComponent } from './product-review-modal.component';

describe('ProductReviewModalComponent', () => {
  let component: ProductReviewModalComponent;
  let fixture: ComponentFixture<ProductReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
