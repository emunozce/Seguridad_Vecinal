import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MediosContacto } from '../api_models';
import { ApiQueriesService } from '../api-queries.service';

@Component({
  selector: 'app-registro-medio-contacto',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registro-medio-contacto.component.html',
  styleUrl: './registro-medio-contacto.component.less'
})
export class RegistroMedioContactoComponent {
  constructor(private api: ApiQueriesService) { }

  medio_contacto!: MediosContacto;

  medio_contacto_form = new FormGroup({
    'telefono_casa': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    'telefono_personal': new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  });

  send_to_api() {
    this.medio_contacto = {
      id: 0,
      telefono_casa: this.medio_contacto_form.get('telefono_casa')?.value ?? '',
      telefono_personal: this.medio_contacto_form.get('telefono_personal')?.value ?? ''
    }
    this.api.addMediosContacto(this.medio_contacto).subscribe({
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
