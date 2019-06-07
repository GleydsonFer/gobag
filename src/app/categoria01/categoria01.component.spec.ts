import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoria01Component } from './categoria01.component';

describe('Categoria01Component', () => {
  let component: Categoria01Component;
  let fixture: ComponentFixture<Categoria01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categoria01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categoria01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
