import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaUnidadDeMedidaComponent } from './grilla-unidad-de-medida.component';

describe('GrillaUnidadDeMedidaComponent', () => {
  let component: GrillaUnidadDeMedidaComponent;
  let fixture: ComponentFixture<GrillaUnidadDeMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaUnidadDeMedidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaUnidadDeMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
