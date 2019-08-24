import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPintoresComponent } from './info-pintores.component';

describe('InfoPintoresComponent', () => {
  let component: InfoPintoresComponent;
  let fixture: ComponentFixture<InfoPintoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPintoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPintoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
