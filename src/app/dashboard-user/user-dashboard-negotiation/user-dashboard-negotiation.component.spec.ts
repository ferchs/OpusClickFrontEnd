import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardNegotiationComponent } from './user-dashboard-negotiation.component';

describe('UserDashboardNegotiationComponent', () => {
  let component: UserDashboardNegotiationComponent;
  let fixture: ComponentFixture<UserDashboardNegotiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardNegotiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardNegotiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
