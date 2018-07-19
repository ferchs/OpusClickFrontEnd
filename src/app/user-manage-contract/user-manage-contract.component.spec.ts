import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageContractComponent } from './user-manage-contract.component';

describe('UserManageContractComponent', () => {
  let component: UserManageContractComponent;
  let fixture: ComponentFixture<UserManageContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
