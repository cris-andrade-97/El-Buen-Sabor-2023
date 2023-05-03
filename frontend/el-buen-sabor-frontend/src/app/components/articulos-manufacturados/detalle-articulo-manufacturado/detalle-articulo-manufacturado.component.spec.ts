import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArticuloManufacturadoComponent } from './detalle-articulo-manufacturado.component';

describe('DetalleArticuloManufacturadoComponent', () => {
  let component: DetalleArticuloManufacturadoComponent;
  let fixture: ComponentFixture<DetalleArticuloManufacturadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleArticuloManufacturadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArticuloManufacturadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
