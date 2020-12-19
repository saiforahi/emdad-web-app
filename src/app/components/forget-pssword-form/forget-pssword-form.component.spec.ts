import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPsswordFormComponent } from './forget-pssword-form.component';

describe('ForgetPsswordFormComponent', () => {
  let component: ForgetPsswordFormComponent;
  let fixture: ComponentFixture<ForgetPsswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPsswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPsswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
