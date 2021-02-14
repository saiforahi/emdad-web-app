import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTicketPageComponent } from './open-ticket-page.component';

describe('OpenTicketPageComponent', () => {
  let component: OpenTicketPageComponent;
  let fixture: ComponentFixture<OpenTicketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTicketPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
