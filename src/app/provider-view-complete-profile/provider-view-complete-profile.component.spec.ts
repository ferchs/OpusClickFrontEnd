import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderViewCompleteProfileComponent } from './provider-view-complete-profile.component';

describe('ProviderViewCompleteProfileComponent', () => {
  let component: ProviderViewCompleteProfileComponent;
  let fixture: ComponentFixture<ProviderViewCompleteProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderViewCompleteProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderViewCompleteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
