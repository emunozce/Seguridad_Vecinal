import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { FormGroup, Validators, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ApiQueriesService } from '../api-queries.service';
import { InfoMedica } from '../api_models';

@Component({
  selector: 'app-registro-info-medica',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registro-info-medica.component.html',
  styleUrl: './registro-info-medica.component.less'
})
export class RegistroInfoMedicaComponent {
  constructor(private api: ApiQueriesService) { }

  info_medica!: InfoMedica;

  info_medica_form = new FormGroup({
    'tipo_sangre': new FormControl('', [Validators.required]),
    'enfermedades_cronicas': new FormControl('', [Validators.required])
  })

  send_to_api() {
    this.info_medica = {
      id: 0,
      tipo_sangre: this.info_medica_form.get('tipo_sangre')?.value ?? '',
      enfermedades_cronicas: this.info_medica_form.get('enfermedades_cronicas')?.value ?? ''
    }
    this.api.addInfoMedica(this.info_medica).subscribe({
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
