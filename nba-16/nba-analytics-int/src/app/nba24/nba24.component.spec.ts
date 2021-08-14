import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba24Component } from './nba24.component';

describe('Nba24Component', () => {
  let component: Nba24Component;
  let fixture: ComponentFixture<Nba24Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba24Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
