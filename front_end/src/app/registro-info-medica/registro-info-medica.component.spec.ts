import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInfoMedicaComponent } from './registro-info-medica.component';

describe('RegistroInfoMedicaComponent', () => {
  let component: RegistroInfoMedicaComponent;
  let fixture: ComponentFixture<RegistroInfoMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroInfoMedicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroInfoMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
