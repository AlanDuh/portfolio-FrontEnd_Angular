import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducExpCardComponent } from './educ-exp-card.component';

describe('EducExpCardComponent', () => {
  let component: EducExpCardComponent;
  let fixture: ComponentFixture<EducExpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducExpCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducExpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
