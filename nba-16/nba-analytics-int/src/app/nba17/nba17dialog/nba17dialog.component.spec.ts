import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba17dialogComponent } from './nba17dialog.component';

describe('Nba17dialogComponent', () => {
  let component: Nba17dialogComponent;
  let fixture: ComponentFixture<Nba17dialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba17dialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba17dialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
