import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaRubroProductosComponent } from './grilla-rubro-productos.component';

describe('GrillaRubroProductosComponent', () => {
  let component: GrillaRubroProductosComponent;
  let fixture: ComponentFixture<GrillaRubroProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaRubroProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaRubroProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
