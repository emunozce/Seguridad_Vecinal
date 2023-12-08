import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { ApiQueriesService } from '../api-queries.service';
import { Direccion } from '../api_models';

@Component({
  selector: 'app-registro-direccion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registro-direccion.component.html',
  styleUrl: './registro-direccion.component.less'
})
export class RegistroDireccionComponent {
  constructor(private api: ApiQueriesService) { }

  direccion!: Direccion;

  direccion_form = new FormGroup({
    'calle': new FormControl('', Validators.required),
    'num_ext': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'num_int': new FormControl('', [Validators.pattern('^[0-9]*$')]),
    'fracc': new FormControl('', Validators.required),
    'cp': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'estado': new FormControl('', Validators.required),
  })

  send_to_api() {
    this.direccion = {
      id: 0,
      calle: this.direccion_form.get('calle')?.value ?? '',
      num_ext: this.direccion_form.get('num_ext')?.value ?? '',
      num_int: this.direccion_form.get('num_int')?.value ?? '',
      fracc: this.direccion_form.get('fracc')?.value ?? '',
      cp: this.direccion_form.get('cp')?.value ?? '',
      estado: this.direccion_form.get('estado')?.value ?? '',
    }

    this.api.addDireccion(this.direccion).subscribe({
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
