import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarrinhoCompraComponent } from './item-carrinho-compra.component';

describe('CarouselOrdemCompraComponent', () => {
  let component: ItemCarrinhoCompraComponent;
  let fixture: ComponentFixture<ItemCarrinhoCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCarrinhoCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCarrinhoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
