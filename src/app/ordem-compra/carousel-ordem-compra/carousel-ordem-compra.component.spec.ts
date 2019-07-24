import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOrdemCompraComponent } from './carousel-ordem-compra.component';

describe('CarouselOrdemCompraComponent', () => {
  let component: CarouselOrdemCompraComponent;
  let fixture: ComponentFixture<CarouselOrdemCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselOrdemCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselOrdemCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
