import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLojistaComponent } from './cadastro-lojista.component';

describe('CadastroLojistaComponent', () => {
  let component: CadastroLojistaComponent;
  let fixture: ComponentFixture<CadastroLojistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroLojistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLojistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
