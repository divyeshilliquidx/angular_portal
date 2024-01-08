import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveaccountComponent } from './liveaccount.component';

describe('LiveaccountComponent', () => {
  let component: LiveaccountComponent;
  let fixture: ComponentFixture<LiveaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveaccountComponent]
    });
    fixture = TestBed.createComponent(LiveaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
