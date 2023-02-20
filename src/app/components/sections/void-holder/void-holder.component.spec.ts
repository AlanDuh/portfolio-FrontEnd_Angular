import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidHolderComponent } from './void-holder.component';

describe('VoidHolderComponent', () => {
  let component: VoidHolderComponent;
  let fixture: ComponentFixture<VoidHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoidHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoidHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
