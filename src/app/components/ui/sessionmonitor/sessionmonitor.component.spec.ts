import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionmonitorComponent } from './sessionmonitor.component';

describe('SessionmonitorComponent', () => {
  let component: SessionmonitorComponent;
  let fixture: ComponentFixture<SessionmonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionmonitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionmonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
