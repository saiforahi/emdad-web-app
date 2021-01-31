import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuotations } from './manage-quotations-table.component';

describe('OrderDetailsModalComponent', () => {
  let component: ManageQuotations;
  let fixture: ComponentFixture<ManageQuotations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQuotations ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuotations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
