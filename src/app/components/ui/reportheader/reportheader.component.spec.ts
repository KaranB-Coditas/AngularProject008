import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportheaderComponent } from './reportheader.component';

describe('ReportheaderComponent', () => {
  let component: ReportheaderComponent;
  let fixture: ComponentFixture<ReportheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
