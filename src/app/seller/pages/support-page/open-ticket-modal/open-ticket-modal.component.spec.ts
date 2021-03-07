import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTicketModalComponent } from './open-ticket-modal.component';

describe('OpenTicketModalComponent', () => {
  let component: OpenTicketModalComponent;
  let fixture: ComponentFixture<OpenTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
