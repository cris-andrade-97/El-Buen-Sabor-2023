import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemArticuloManufacturadoComponent } from './item-articulo-manufacturado.component';

describe('ItemArticuloManufacturadoComponent', () => {
  let component: ItemArticuloManufacturadoComponent;
  let fixture: ComponentFixture<ItemArticuloManufacturadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemArticuloManufacturadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemArticuloManufacturadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
