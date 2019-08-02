import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselOrdemDevolucaoComponent } from './carousel-ordem-devolucao.component';

describe('CarouselOrdemDevolucaoComponent', () => {
  let component: CarouselOrdemDevolucaoComponent;
  let fixture: ComponentFixture<CarouselOrdemDevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselOrdemDevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselOrdemDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
