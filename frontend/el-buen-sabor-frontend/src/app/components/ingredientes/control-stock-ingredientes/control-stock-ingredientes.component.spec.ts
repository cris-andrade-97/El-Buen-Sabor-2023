import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlStockIngredientesComponent } from './control-stock-ingredientes.component';

describe('ControlStockIngredientesComponent', () => {
  let component: ControlStockIngredientesComponent;
  let fixture: ComponentFixture<ControlStockIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlStockIngredientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlStockIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
