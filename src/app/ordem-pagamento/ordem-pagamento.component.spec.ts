import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemPagamentoComponent } from './ordem-pagamento.component';

describe('OrdemPagamentoComponent', () => {
  let component: OrdemPagamentoComponent;
  let fixture: ComponentFixture<OrdemPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
