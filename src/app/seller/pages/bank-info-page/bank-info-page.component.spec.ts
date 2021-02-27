import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoPageComponent } from './bank-info-page.component';

describe('BankInfoPageComponent', () => {
  let component: BankInfoPageComponent;
  let fixture: ComponentFixture<BankInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
