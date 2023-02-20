import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardSkillCardComponent } from './hard-skill-card.component';

describe('HardSkillCardComponent', () => {
  let component: HardSkillCardComponent;
  let fixture: ComponentFixture<HardSkillCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardSkillCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardSkillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
