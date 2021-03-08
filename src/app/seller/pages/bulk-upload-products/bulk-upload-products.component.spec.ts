import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadProductsComponent } from './bulk-upload-products.component';

describe('BulkUploadProductsComponent', () => {
  let component: BulkUploadProductsComponent;
  let fixture: ComponentFixture<BulkUploadProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
