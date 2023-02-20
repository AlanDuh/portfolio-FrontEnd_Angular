import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftSkillCardComponent } from './soft-skill-card.component';

describe('SoftSkillCardComponent', () => {
  let component: SoftSkillCardComponent;
  let fixture: ComponentFixture<SoftSkillCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftSkillCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftSkillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
