import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlanPageComponent } from './subscription-plan-page.component';

describe('SubscriptionPlanPageComponent', () => {
  let component: SubscriptionPlanPageComponent;
  let fixture: ComponentFixture<SubscriptionPlanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPlanPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
