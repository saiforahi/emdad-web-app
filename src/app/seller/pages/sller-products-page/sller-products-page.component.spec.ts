import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SllerProductsPageComponent } from './sller-products-page.component';

describe('SllerProductsPageComponent', () => {
  let component: SllerProductsPageComponent;
  let fixture: ComponentFixture<SllerProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SllerProductsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SllerProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
