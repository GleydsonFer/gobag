import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasDePrivacidadeComponent } from './politicas-de-privacidade.component';

describe('PoliticasDePrivacidadeComponent', () => {
  let component: PoliticasDePrivacidadeComponent;
  let fixture: ComponentFixture<PoliticasDePrivacidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticasDePrivacidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasDePrivacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
