import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosdepagamentoComponent } from './dadosdepagamento.component';

describe('DadosdepagamentoComponent', () => {
  let component: DadosdepagamentoComponent;
  let fixture: ComponentFixture<DadosdepagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosdepagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosdepagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
