import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtApiKeyComponent } from './crt-api-key.component';

describe('CrtApiKeyComponent', () => {
  let component: CrtApiKeyComponent;
  let fixture: ComponentFixture<CrtApiKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtApiKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
