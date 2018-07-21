import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAgreementModalComponent } from './no-agreement-modal.component';

describe('NoAgreementModalComponent', () => {
  let component: NoAgreementModalComponent;
  let fixture: ComponentFixture<NoAgreementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoAgreementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAgreementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
