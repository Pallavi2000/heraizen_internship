import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nba25ModalComponent } from './nba25-modal.component';

describe('Nba25ModalComponent', () => {
  let component: Nba25ModalComponent;
  let fixture: ComponentFixture<Nba25ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nba25ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nba25ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
