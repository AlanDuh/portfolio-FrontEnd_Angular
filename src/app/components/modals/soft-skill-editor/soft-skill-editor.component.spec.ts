import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftSkillEditorComponent } from './soft-skill-editor.component';

describe('SoftSkillEditorComponent', () => {
  let component: SoftSkillEditorComponent;
  let fixture: ComponentFixture<SoftSkillEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftSkillEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftSkillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
