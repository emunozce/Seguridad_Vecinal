import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Organizacion } from '../api_models';
import { ApiQueriesService } from '../api-queries.service';

declare var google: any;

@Component({
  selector: 'app-mostrar-info-organizaciones',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './mostrar-info-organizaciones.component.html',
  styleUrl: './mostrar-info-organizaciones.component.less'
})

export class MostrarInfoOrganizacionesComponent implements OnInit {
  constructor(private api_request: ApiQueriesService) { }

  organizaciones: Organizacion[] = [];

  ngOnInit(): void {
    this.api_request.getOrgs().subscribe({
      next: (data: Organizacion[]) => {
        // Store the retrieved organizations in your variable
        this.organizaciones = data;
      },
      error: (error) => {
        console.error('Error fetching organizations:', error);
      }
    });

    this.initMap();
  }

  initMap() {
    const myLatLng = { lat: 21.885509503063286, lng: -102.29270106521804 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: myLatLng,
    });

    new google.maps.Marker({
      position: { lat: 21.903224, lng: -102.275163 },
      map,
      title: "Proteccion Civil",
    });
    new google.maps.Marker({
      position: { lat: 21.908654696237637, lng: -102.31076460479073 },
      map,
      title: "DIF Municipal",
    });
    new google.maps.Marker({
      position: { lat: 21.87563427453103, lng: -102.25627618420394 },
      map,
      title: "Estacion De Bomberos Del Municipio De Aguascalientes",
    });

    new google.maps.Marker({
      position: { lat: 21.877167537070733, lng: -102.25778895008361 },
      map,
      title: "Policia Cibernetica",
    });

    new google.maps.Marker({
      position: { lat: 21.87828684964165, lng: -102.25707458531284 },
      map,
      title: "Secreataria de Seguridad Publica",
    });

    new google.maps.Marker({
      position: { lat: 21.896751179211076, lng: -102.29916503937712 },
      map,
      title: "Direccion De Asuntos Internos De Seguridad Publica",
    });

    new google.maps.Marker({
      position: { lat: 21.87829430896413, lng: -102.25707279304407 },
      map,
      title: "Secretaría de Seguridad Pública del Estado",
    });

    new google.maps.Marker({
      position: { lat: 21.87930336318533, lng: -102.28103582681771 },
      map,
      title: "Fiscalía General del Estado de Aguascalientes",
    });

    new google.maps.Marker({
      position: { lat: 21.88151237173585, lng: -102.28103925455757 },
      map,
      title: "Policia Ministerial",
    });
  }
}