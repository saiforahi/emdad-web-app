import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCategoryFilterComponent } from './prod-category-filter.component';

describe('ProdCategoryFilterComponent', () => {
  let component: ProdCategoryFilterComponent;
  let fixture: ComponentFixture<ProdCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdCategoryFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
