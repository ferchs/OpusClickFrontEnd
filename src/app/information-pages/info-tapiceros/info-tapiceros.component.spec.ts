import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTapicerosComponent } from './info-tapiceros.component';

describe('InfoTapicerosComponent', () => {
  let component: InfoTapicerosComponent;
  let fixture: ComponentFixture<InfoTapicerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTapicerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTapicerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
