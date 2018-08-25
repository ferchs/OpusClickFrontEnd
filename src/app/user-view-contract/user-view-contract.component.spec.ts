import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewContractComponent } from './user-view-contract.component';

describe('UserViewContractComponent', () => {
  let component: UserViewContractComponent;
  let fixture: ComponentFixture<UserViewContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
