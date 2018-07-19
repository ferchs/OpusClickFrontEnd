import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptVisitModalComponent } from './accept-visit-modal.component';

describe('AcceptVisitModalComponent', () => {
  let component: AcceptVisitModalComponent;
  let fixture: ComponentFixture<AcceptVisitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptVisitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptVisitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
