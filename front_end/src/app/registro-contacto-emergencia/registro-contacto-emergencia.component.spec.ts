import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroContactoEmergenciaComponent } from './registro-contacto-emergencia.component';

describe('RegistroContactoEmergenciaComponent', () => {
  let component: RegistroContactoEmergenciaComponent;
  let fixture: ComponentFixture<RegistroContactoEmergenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroContactoEmergenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroContactoEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
