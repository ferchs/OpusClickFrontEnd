import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsContractModalComponent } from './details-contract-modal.component';

describe('DetailsContractModalComponent', () => {
  let component: DetailsContractModalComponent;
  let fixture: ComponentFixture<DetailsContractModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsContractModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContractModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
