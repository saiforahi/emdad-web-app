import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitModalComponent } from './add-unit-modal.component';

describe('AddUnitModalComponent', () => {
  let component: AddUnitModalComponent;
  let fixture: ComponentFixture<AddUnitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
