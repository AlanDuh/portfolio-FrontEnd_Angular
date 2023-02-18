import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducExpEditorComponent } from './educ-exp-editor.component';

describe('EducExpEditorComponent', () => {
  let component: EducExpEditorComponent;
  let fixture: ComponentFixture<EducExpEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducExpEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducExpEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
