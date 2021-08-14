import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceConfigurationComponent } from './performance-configuration.component';

describe('PerformanceConfigurationComponent', () => {
  let component: PerformanceConfigurationComponent;
  let fixture: ComponentFixture<PerformanceConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
