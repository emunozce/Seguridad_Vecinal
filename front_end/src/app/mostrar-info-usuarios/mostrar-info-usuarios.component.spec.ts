import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarInfoUsuariosComponent } from './mostrar-info-usuarios.component';

describe('MostrarInfoUsuariosComponent', () => {
  let component: MostrarInfoUsuariosComponent;
  let fixture: ComponentFixture<MostrarInfoUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarInfoUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarInfoUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
