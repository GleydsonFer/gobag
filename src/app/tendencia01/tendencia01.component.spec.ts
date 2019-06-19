import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tendencia01Component } from './tendencia01.component';

describe('Categoria01Component', () => {
  let component: Tendencia01Component;
  let fixture: ComponentFixture<Tendencia01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tendencia01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tendencia01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
