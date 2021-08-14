import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba25HomeComponent } from './nba25-home.component';

describe('Nba25HomeComponent', () => {
  let component: Nba25HomeComponent;
  let fixture: ComponentFixture<Nba25HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba25HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba25HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
