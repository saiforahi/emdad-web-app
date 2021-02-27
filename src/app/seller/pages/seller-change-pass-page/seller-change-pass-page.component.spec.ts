import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerChangePassPageComponent } from './seller-change-pass-page.component';

describe('SellerChangePassPageComponent', () => {
  let component: SellerChangePassPageComponent;
  let fixture: ComponentFixture<SellerChangePassPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerChangePassPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerChangePassPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
