import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { ApiQueriesService } from '../api-queries.service';
import { ContactoEmergencia } from '../api_models';

@Component({
  selector: 'app-registro-contacto-emergencia',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registro-contacto-emergencia.component.html',
  styleUrl: './registro-contacto-emergencia.component.less'
})
export class RegistroContactoEmergenciaComponent {
  constructor(private http: ApiQueriesService) { }

  contacto_emer!: ContactoEmergencia;

  contacto_emergencia_form = new FormGroup({
    'name': new FormControl('', [Validators.required,]),
    'lastname': new FormControl('', [Validators.required]),
    'telefono_contacto': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  });

  on_send() {

    this.contacto_emer = {
      id: 0,
      nombre: this.contacto_emergencia_form.get('name')?.value ?? '',
      lastname: this.contacto_emergencia_form.get('lastname')?.value ?? '',
      telefono_contacto: this.contacto_emergencia_form.get('lastname')?.value ?? ''
    };

    this.http.addContactoEmergencia(this.contacto_emer).subscribe({
      next: response => {
        console.log('POST request successful:', response);
        // Add any additional handling or navigation logic here
      },
      error: error => {
        console.error('POST request failed:', error);
        // Handle the error as needed
      }
    });
  }
}
