import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsectionComponent } from './listsection.component';

describe('ListsectionComponent', () => {
  let component: ListsectionComponent;
  let fixture: ComponentFixture<ListsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
