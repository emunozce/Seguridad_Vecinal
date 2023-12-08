import { Routes } from '@angular/router';
import { RegistroUsrComponent } from './registro-usr/registro-usr.component';
import { RegistroInfoMedicaComponent } from './registro-info-medica/registro-info-medica.component';
import { RegistroContactoEmergenciaComponent } from './registro-contacto-emergencia/registro-contacto-emergencia.component';
import { RegistroMedioContactoComponent } from './registro-medio-contacto/registro-medio-contacto.component';
import { RegistroDireccionComponent } from './registro-direccion/registro-direccion.component';
import { MostrarInfoOrganizacionesComponent } from './mostrar-info-organizaciones/mostrar-info-organizaciones.component';
import { MostrarInfoUsuariosComponent } from './mostrar-info-usuarios/mostrar-info-usuarios.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'mostrar_usrs', component: MostrarInfoUsuariosComponent },
    { path: 'mostrar_orgs', component: MostrarInfoOrganizacionesComponent },
    { path: 'registro_usr', component: RegistroUsrComponent },
    { path: 'registro_dir', component: RegistroDireccionComponent },
    { path: 'registro_medios_contacto', component: RegistroMedioContactoComponent },
    { path: 'registro_contacto_emergencia', component: RegistroContactoEmergenciaComponent },
    { path: 'registro_info_medica', component: RegistroInfoMedicaComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' }
];
