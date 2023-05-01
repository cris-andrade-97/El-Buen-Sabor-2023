import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUnidadDeMedidaComponent } from './formulario-unidad-de-medida.component';

describe('FormularioUnidadDeMedidaComponent', () => {
  let component: FormularioUnidadDeMedidaComponent;
  let fixture: ComponentFixture<FormularioUnidadDeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioUnidadDeMedidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUnidadDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
