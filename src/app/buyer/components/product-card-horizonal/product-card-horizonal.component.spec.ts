import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardHorizonalComponent } from './product-card-horizonal.component';

describe('ProductCardHorizonalComponent', () => {
  let component: ProductCardHorizonalComponent;
  let fixture: ComponentFixture<ProductCardHorizonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardHorizonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardHorizonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
