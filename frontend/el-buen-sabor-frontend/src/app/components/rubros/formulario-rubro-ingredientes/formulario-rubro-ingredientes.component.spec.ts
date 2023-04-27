import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRubroIngredientesComponent } from './formulario-rubro-ingredientes.component';

describe('FormularioRubroIngredientesComponent', () => {
  let component: FormularioRubroIngredientesComponent;
  let fixture: ComponentFixture<FormularioRubroIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRubroIngredientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRubroIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
