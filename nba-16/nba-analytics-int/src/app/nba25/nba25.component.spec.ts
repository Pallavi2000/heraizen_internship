import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba25Component } from './nba25.component';

describe('Nba25Component', () => {
  let component: Nba25Component;
  let fixture: ComponentFixture<Nba25Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
