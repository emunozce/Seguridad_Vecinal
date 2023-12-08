import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMedioContactoComponent } from './registro-medio-contacto.component';

describe('RegistroMedioContactoComponent', () => {
  let component: RegistroMedioContactoComponent;
  let fixture: ComponentFixture<RegistroMedioContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMedioContactoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroMedioContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
