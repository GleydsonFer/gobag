import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharPedidoComponent } from './acompanhar-pedido.component';

describe('AcompanharPedidoComponent', () => {
  let component: AcompanharPedidoComponent;
  let fixture: ComponentFixture<AcompanharPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcompanharPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanharPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
