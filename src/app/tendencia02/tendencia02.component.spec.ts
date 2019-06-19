import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tendencia02Component } from './tendencia02.component';

describe('Categoria02Component', () => {
  let component: Tendencia02Component;
  let fixture: ComponentFixture<Tendencia02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tendencia02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tendencia02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
