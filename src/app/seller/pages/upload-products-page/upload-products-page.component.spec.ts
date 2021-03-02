import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductsPageComponent } from './upload-products-page.component';

describe('UploadProductsPageComponent', () => {
  let component: UploadProductsPageComponent;
  let fixture: ComponentFixture<UploadProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProductsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
