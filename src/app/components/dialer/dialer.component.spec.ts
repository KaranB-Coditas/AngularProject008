import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialerComponent } from './dialer.component';

describe('DialerComponent', () => {
  let component: DialerComponent;
  let fixture: ComponentFixture<DialerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
