import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrucoesComponent } from './instrucoes.component';

describe('InstrucoesComponent', () => {
  let component: InstrucoesComponent;
  let fixture: ComponentFixture<InstrucoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrucoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
