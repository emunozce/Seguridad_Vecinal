import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from "@angular/forms";
import { ApiQueriesService } from '../api-queries.service';
import { Usr } from '../api_models';

@Component({
  selector: 'app-registro-usr',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registro-usr.component.html',
  styleUrl: './registro-usr.component.less'
})
export class RegistroUsrComponent {
  constructor(private api: ApiQueriesService) { }

  usr!: Usr;

  user_form = new FormGroup({
    'name': new FormControl('', [Validators.required,]),
    'lastname': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
  });

  send_to_api() {
    this.usr = {
      id: 0,
      name: this.user_form.get('name')?.value ?? '',
      lastname: this.user_form.get('lastname')?.value ?? '',
      email: this.user_form.get('email')?.value ?? '',
      direccion_id: 0,
      info_medica_id: 0,
      medios_contacto_id: 0,
      contacto_emerg_id: 0
    }
    this.api.addUser(this.usr).subscribe({
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