import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba25GraphComponent } from './nba25-graph.component';

describe('Nba25GraphComponent', () => {
  let component: Nba25GraphComponent;
  let fixture: ComponentFixture<Nba25GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba25GraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba25GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
