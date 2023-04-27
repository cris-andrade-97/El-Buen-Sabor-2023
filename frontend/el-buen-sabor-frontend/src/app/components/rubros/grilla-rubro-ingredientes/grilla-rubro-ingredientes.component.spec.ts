import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaRubroIngredientesComponent } from './grilla-rubro-ingredientes.component';

describe('GrillaRubroIngredientesComponent', () => {
  let component: GrillaRubroIngredientesComponent;
  let fixture: ComponentFixture<GrillaRubroIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaRubroIngredientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaRubroIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
