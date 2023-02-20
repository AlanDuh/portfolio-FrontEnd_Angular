import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardSkillEditorComponent } from './hard-skill-editor.component';

describe('HardSkillEditorComponent', () => {
  let component: HardSkillEditorComponent;
  let fixture: ComponentFixture<HardSkillEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardSkillEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardSkillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
