import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardNegotiationPendingComponent } from './user-dashboard-negotiation-pending.component';

describe('UserDashboardNegotiationPendingComponent', () => {
  let component: UserDashboardNegotiationPendingComponent;
  let fixture: ComponentFixture<UserDashboardNegotiationPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardNegotiationPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardNegotiationPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
