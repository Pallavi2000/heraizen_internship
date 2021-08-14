import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba31Component } from './nba31.component';

describe('Nba31Component', () => {
  let component: Nba31Component;
  let fixture: ComponentFixture<Nba31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
