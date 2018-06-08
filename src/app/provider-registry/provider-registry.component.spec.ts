import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRegistryComponent } from './provider-registry.component';

describe('ProviderRegistryComponent', () => {
  let component: ProviderRegistryComponent;
  let fixture: ComponentFixture<ProviderRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
