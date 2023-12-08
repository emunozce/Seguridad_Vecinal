import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiQueriesService } from '../api-queries.service';
import { ContactoEmergencia, Direccion, InfoMedica, MediosContacto, Usr } from '../api_models';

@Component({
  selector: 'app-mostrar-info-usuarios',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './mostrar-info-usuarios.component.html',
  styleUrl: './mostrar-info-usuarios.component.less'
})
export class MostrarInfoUsuariosComponent implements OnInit {
  constructor(private api: ApiQueriesService) { }

  usuarios: Usr[] = [];
  direcciones: Direccion[] = [];
  medios_contacto: MediosContacto[] = [];
  contactos_emergencia: ContactoEmergencia[] = [];
  infos_medica: InfoMedica[] = [];


  ngOnInit(): void {
    this.api.getAllUsers().subscribe({
      next: (data: Usr[]) => {
        // Store the retrieved organizations in your variable
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error fetching organizations:', error);
      }
    });

    this.api.getAllDirecciones().subscribe({
      next: (data: Direccion[]) => {
        // Store the retrieved organizations in your variable
        this.direcciones = data;
      },
      error: (error) => {
        console.error('Error fetching organizations:', error);
      }
    });

    this.api.getAllMediosContacto().subscribe({
      next: (data: MediosContacto[]) => {
        // Store the retrieved organizations in your variable
        this.medios_contacto = data;
      },
      error: (error) => {
        console.error('Error fetching organizations:', error);
      }
    });

    this.api.getAllContactoEmergencia().subscribe({
      next: (data: ContactoEmergencia[]) => {
        // Store the retrieved organizations in your variable
        this.contactos_emergencia = data;
      },
      error: (error) => {
        console.error('Error fetching organizations:', error);
      }
    });

    this.api.getAllInfoMedica().subscribe({
      next: (data: InfoMedica[]) => {
        // Store the retrieved organizations in your variable
        this.infos_medica = data;
      },
      error: (error) => {
        console.error('Error fetching organizations:', error);
      }
    });
  }
}
