import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderManageContractComponent } from './provider-manage-contract.component';

describe('ProviderManageContractComponent', () => {
  let component: ProviderManageContractComponent;
  let fixture: ComponentFixture<ProviderManageContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderManageContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderManageContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
