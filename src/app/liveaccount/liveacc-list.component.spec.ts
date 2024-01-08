import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveaccListComponent } from './liveacc-list.component';

describe('LiveaccListComponent', () => {
  let component: LiveaccListComponent;
  let fixture: ComponentFixture<LiveaccListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveaccListComponent]
    });
    fixture = TestBed.createComponent(LiveaccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
