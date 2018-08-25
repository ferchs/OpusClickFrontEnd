import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpecifyContractComponent } from './user-specify-contract.component';

describe('UserSpecifyContractComponent', () => {
  let component: UserSpecifyContractComponent;
  let fixture: ComponentFixture<UserSpecifyContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSpecifyContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSpecifyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
