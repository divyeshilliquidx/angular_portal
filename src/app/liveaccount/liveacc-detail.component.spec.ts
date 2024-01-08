import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveaccDetailComponent } from './liveacc-detail.component';

describe('LiveaccDetailComponent', () => {
  let component: LiveaccDetailComponent;
  let fixture: ComponentFixture<LiveaccDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveaccDetailComponent]
    });
    fixture = TestBed.createComponent(LiveaccDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
