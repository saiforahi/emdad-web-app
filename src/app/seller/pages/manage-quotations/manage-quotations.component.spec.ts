import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQuotationsComponent } from './manage-quotations.component';

describe('ManageQuotationsComponent', () => {
  let component: ManageQuotationsComponent;
  let fixture: ComponentFixture<ManageQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageQuotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
