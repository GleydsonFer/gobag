import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoria03Component } from './categoria03.component';

describe('Categoria03Component', () => {
  let component: Categoria03Component;
  let fixture: ComponentFixture<Categoria03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Categoria03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Categoria03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
