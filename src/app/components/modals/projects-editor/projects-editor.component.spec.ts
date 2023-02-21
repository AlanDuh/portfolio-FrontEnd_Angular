import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsEditorComponent } from './projects-editor.component';

describe('ProjectsEditorComponent', () => {
  let component: ProjectsEditorComponent;
  let fixture: ComponentFixture<ProjectsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
