import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSlideComponent } from './categoria-slide.component';

describe('CategoriaSlideComponent', () => {
  let component: CategoriaSlideComponent;
  let fixture: ComponentFixture<CategoriaSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
