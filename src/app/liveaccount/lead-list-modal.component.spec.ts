import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadListModalComponent } from './lead-list-modal.component';

describe('LeadListModalComponent', () => {
  let component: LeadListModalComponent;
  let fixture: ComponentFixture<LeadListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadListModalComponent]
    });
    fixture = TestBed.createComponent(LeadListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
