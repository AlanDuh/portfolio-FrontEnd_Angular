import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationExperiencesComponent } from './education-experiences.component';

describe('EducationExperiencesComponent', () => {
  let component: EducationExperiencesComponent;
  let fixture: ComponentFixture<EducationExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationExperiencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
