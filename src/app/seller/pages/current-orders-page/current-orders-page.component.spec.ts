import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrdersPageComponent } from './current-orders-page.component';

describe('CurrentOrdersPageComponent', () => {
  let component: CurrentOrdersPageComponent;
  let fixture: ComponentFixture<CurrentOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentOrdersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
