import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba25TableComponent } from './nba25-table.component';

describe('Nba25TableComponent', () => {
  let component: Nba25TableComponent;
  let fixture: ComponentFixture<Nba25TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba25TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba25TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
