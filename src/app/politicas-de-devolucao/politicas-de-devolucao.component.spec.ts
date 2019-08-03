import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasDeDevolucaoComponent } from './politicas-de-devolucao.component';

describe('PoliticasDeDevolucaoComponent', () => {
  let component: PoliticasDeDevolucaoComponent;
  let fixture: ComponentFixture<PoliticasDeDevolucaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticasDeDevolucaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasDeDevolucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
