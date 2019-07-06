import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Loja01Component } from './loja01.component';

describe('Loja01Component', () => {
  let component: Loja01Component;
  let fixture: ComponentFixture<Loja01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loja01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Loja01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
