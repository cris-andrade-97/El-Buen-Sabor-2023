import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaIngredientesComponent } from './grilla-ingredientes.component';

describe('GrillaIngredientesComponent', () => {
  let component: GrillaIngredientesComponent;
  let fixture: ComponentFixture<GrillaIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaIngredientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
