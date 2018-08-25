import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderViewContractComponent } from './provider-view-contract.component';

describe('ProviderViewContractComponent', () => {
  let component: ProviderViewContractComponent;
  let fixture: ComponentFixture<ProviderViewContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderViewContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderViewContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
