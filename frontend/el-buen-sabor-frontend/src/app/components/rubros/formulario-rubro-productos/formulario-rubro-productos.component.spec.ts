import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRubroProductosComponent } from './formulario-rubro-productos.component';

describe('FormularioRubroProductosComponent', () => {
  let component: FormularioRubroProductosComponent;
  let fixture: ComponentFixture<FormularioRubroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRubroProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRubroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
