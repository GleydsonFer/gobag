import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoria02Component } from './categoria02.component';

describe('Categoria02Component', () => {
  let component: Categoria02Component;
  let fixture: ComponentFixture<Categoria02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categoria02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categoria02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
