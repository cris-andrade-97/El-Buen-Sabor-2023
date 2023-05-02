import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioArticulosManufacturadosComponent } from './formulario-articulos-manufacturados.component';

describe('FormularioArticulosManufacturadosComponent', () => {
  let component: FormularioArticulosManufacturadosComponent;
  let fixture: ComponentFixture<FormularioArticulosManufacturadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioArticulosManufacturadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioArticulosManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
