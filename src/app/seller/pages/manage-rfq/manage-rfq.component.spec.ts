import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRfqComponent } from './manage-rfq.component';

describe('ManageRfqComponent', () => {
  let component: ManageRfqComponent;
  let fixture: ComponentFixture<ManageRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRfqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
