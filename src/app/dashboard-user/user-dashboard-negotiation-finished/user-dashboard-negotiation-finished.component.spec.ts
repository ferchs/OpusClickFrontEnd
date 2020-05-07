import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardNegotiationFinishedComponent } from './user-dashboard-negotiation-finished.component';

describe('UserDashboardNegotiationFinishedComponent', () => {
  let component: UserDashboardNegotiationFinishedComponent;
  let fixture: ComponentFixture<UserDashboardNegotiationFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardNegotiationFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardNegotiationFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
