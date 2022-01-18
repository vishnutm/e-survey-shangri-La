import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionsComponent } from './add-edit-questions.component';

describe('AddEditQuestionsComponent', () => {
  let component: AddEditQuestionsComponent;
  let fixture: ComponentFixture<AddEditQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
