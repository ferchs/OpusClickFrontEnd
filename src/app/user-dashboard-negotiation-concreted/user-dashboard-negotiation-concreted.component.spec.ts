import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardNegotiationConcretedComponent } from './user-dashboard-negotiation-concreted.component';

describe('UserDashboardNegotiationConcretedComponent', () => {
  let component: UserDashboardNegotiationConcretedComponent;
  let fixture: ComponentFixture<UserDashboardNegotiationConcretedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardNegotiationConcretedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardNegotiationConcretedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
