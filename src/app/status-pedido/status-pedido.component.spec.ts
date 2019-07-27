import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPedidoComponent } from './status-pedido.component';

describe('StatusPedidoComponent', () => {
  let component: StatusPedidoComponent;
  let fixture: ComponentFixture<StatusPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
