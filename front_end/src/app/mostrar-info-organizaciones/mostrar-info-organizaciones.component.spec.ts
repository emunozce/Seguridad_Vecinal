import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarInfoOrganizacionesComponent } from './mostrar-info-organizaciones.component';

describe('MostrarInfoOrganizacionesComponent', () => {
  let component: MostrarInfoOrganizacionesComponent;
  let fixture: ComponentFixture<MostrarInfoOrganizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarInfoOrganizacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarInfoOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
