import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCompraIngredienteComponent } from './registrar-compra-ingrediente.component';

describe('RegistrarCompraIngredienteComponent', () => {
  let component: RegistrarCompraIngredienteComponent;
  let fixture: ComponentFixture<RegistrarCompraIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarCompraIngredienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCompraIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
