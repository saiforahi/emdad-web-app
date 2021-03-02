import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBreadcrumbsComponent } from './seller-breadcrumbs.component';

describe('SellerBreadcrumbsComponent', () => {
  let component: SellerBreadcrumbsComponent;
  let fixture: ComponentFixture<SellerBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerBreadcrumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
