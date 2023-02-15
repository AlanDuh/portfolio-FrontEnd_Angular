import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailContainerComponent } from './thumbnail-container.component';

describe('ThumbnailContainerComponent', () => {
  let component: ThumbnailContainerComponent;
  let fixture: ComponentFixture<ThumbnailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThumbnailContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
