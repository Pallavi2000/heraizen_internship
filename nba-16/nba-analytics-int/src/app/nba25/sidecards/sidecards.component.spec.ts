import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidecardsComponent } from './sidecards.component';

describe('SidecardsComponent', () => {
  let component: SidecardsComponent;
  let fixture: ComponentFixture<SidecardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidecardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
