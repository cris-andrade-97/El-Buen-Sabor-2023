import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaPedidosComponent } from './grilla-pedidos.component';

describe('GrillaPedidosComponent', () => {
  let component: GrillaPedidosComponent;
  let fixture: ComponentFixture<GrillaPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
