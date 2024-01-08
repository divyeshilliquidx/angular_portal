import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveaccEditComponent } from './liveacc-edit.component';

describe('LiveaccEditComponent', () => {
  let component: LiveaccEditComponent;
  let fixture: ComponentFixture<LiveaccEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveaccEditComponent]
    });
    fixture = TestBed.createComponent(LiveaccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
