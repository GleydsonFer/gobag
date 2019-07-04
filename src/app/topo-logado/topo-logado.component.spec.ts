import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoLogadoComponent } from './topo-logado.component';

describe('TopoLogadoComponent', () => {
  let component: TopoLogadoComponent;
  let fixture: ComponentFixture<TopoLogadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoLogadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
