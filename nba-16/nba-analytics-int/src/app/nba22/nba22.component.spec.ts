import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba22Component } from './nba22.component';

describe('Nba22Component', () => {
  let component: Nba22Component;
  let fixture: ComponentFixture<Nba22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

