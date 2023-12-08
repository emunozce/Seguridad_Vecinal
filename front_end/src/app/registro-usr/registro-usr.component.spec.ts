import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsrComponent } from './registro-usr.component';

describe('RegistroUsrComponent', () => {
  let component: RegistroUsrComponent;
  let fixture: ComponentFixture<RegistroUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
