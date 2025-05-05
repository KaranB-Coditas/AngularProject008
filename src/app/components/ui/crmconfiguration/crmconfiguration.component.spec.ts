import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmconfigurationComponent } from './crmconfiguration.component';

describe('CrmconfigurationComponent', () => {
  let component: CrmconfigurationComponent;
  let fixture: ComponentFixture<CrmconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmconfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
