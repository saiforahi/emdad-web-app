import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorModalComponent } from './add-color-modal.component';

describe('AddColorModalComponent', () => {
  let component: AddColorModalComponent;
  let fixture: ComponentFixture<AddColorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
