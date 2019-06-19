import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tendencia03Component } from './tendencia03.component';

describe('Categoria03Component', () => {
  let component: Tendencia03Component;
  let fixture: ComponentFixture<Tendencia03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tendencia03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tendencia03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
