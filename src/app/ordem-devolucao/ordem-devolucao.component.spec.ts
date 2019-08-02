import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemDevolucaoComponent } from './ordem-devolucao.component';

describe('OrdemDevolucaoComponent', () => {
  let component: OrdemDevolucaoComponent;
  let fixture: ComponentFixture<OrdemDevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemDevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
