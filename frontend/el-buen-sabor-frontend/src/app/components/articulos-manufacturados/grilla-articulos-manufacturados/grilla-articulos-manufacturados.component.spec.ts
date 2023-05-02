import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaArticulosManufacturadosComponent } from './grilla-articulos-manufacturados.component';

describe('GrillaArticulosManufacturadosComponent', () => {
  let component: GrillaArticulosManufacturadosComponent;
  let fixture: ComponentFixture<GrillaArticulosManufacturadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaArticulosManufacturadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaArticulosManufacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
