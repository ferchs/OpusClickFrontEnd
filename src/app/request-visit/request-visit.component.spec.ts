import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVisitComponent } from './request-visit.component';

describe('RequestVisitComponent', () => {
  let component: RequestVisitComponent;
  let fixture: ComponentFixture<RequestVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
