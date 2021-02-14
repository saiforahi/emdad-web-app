import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyProfilePageComponent } from './verify-profile-page.component';

describe('VerifyProfilePageComponent', () => {
  let component: VerifyProfilePageComponent;
  let fixture: ComponentFixture<VerifyProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
