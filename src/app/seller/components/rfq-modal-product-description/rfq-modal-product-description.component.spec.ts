import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqModalProductDescriptionComponent } from './rfq-modal-product-description.component';

describe('RfqModalProductDescriptionComponent', () => {
  let component: RfqModalProductDescriptionComponent;
  let fixture: ComponentFixture<RfqModalProductDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqModalProductDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqModalProductDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
