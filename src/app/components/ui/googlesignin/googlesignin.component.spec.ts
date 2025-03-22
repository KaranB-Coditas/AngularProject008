import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglesigninComponent } from './googlesignin.component';

describe('GooglesigninComponent', () => {
  let component: GooglesigninComponent;
  let fixture: ComponentFixture<GooglesigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GooglesigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooglesigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
