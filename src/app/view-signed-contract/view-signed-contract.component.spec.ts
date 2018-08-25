import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSignedContractComponent } from './view-signed-contract.component';

describe('ViewSignedContractComponent', () => {
  let component: ViewSignedContractComponent;
  let fixture: ComponentFixture<ViewSignedContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSignedContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSignedContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
