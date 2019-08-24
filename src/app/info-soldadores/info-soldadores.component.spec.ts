import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSoldadoresComponent } from './info-soldadores.component';

describe('InfoSoldadoresComponent', () => {
  let component: InfoSoldadoresComponent;
  let fixture: ComponentFixture<InfoSoldadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSoldadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSoldadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
