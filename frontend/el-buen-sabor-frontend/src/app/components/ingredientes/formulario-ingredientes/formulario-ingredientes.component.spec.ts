import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioIngredientesComponent } from './formulario-ingredientes.component';

describe('FormularioIngredientesComponent', () => {
  let component: FormularioIngredientesComponent;
  let fixture: ComponentFixture<FormularioIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioIngredientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
