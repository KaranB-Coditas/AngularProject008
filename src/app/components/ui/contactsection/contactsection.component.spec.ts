import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsectionComponent } from './contactsection.component';

describe('ContactsectionComponent', () => {
  let component: ContactsectionComponent;
  let fixture: ComponentFixture<ContactsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
