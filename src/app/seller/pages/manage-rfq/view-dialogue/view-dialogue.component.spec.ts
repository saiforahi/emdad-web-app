import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDialogueComponent } from './view-dialogue.component';

describe('ViewDialogueComponent', () => {
  let component: ViewDialogueComponent;
  let fixture: ComponentFixture<ViewDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
