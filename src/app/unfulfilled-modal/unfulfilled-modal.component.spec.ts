import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfulfilledModalComponent } from './unfulfilled-modal.component';

describe('UnfulfilledModalComponent', () => {
  let component: UnfulfilledModalComponent;
  let fixture: ComponentFixture<UnfulfilledModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfulfilledModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfulfilledModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
