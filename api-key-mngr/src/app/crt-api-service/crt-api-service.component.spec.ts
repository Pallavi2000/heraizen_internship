import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtApiServiceComponent } from './crt-api-service.component';

describe('CrtApiServiceComponent', () => {
  let component: CrtApiServiceComponent;
  let fixture: ComponentFixture<CrtApiServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtApiServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtApiServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
