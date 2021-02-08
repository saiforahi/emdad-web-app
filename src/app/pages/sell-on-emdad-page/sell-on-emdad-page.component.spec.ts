import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOnEmdadPageComponent } from './sell-on-emdad-page.component';

describe('SellOnEmdadPageComponent', () => {
  let component: SellOnEmdadPageComponent;
  let fixture: ComponentFixture<SellOnEmdadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellOnEmdadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOnEmdadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
