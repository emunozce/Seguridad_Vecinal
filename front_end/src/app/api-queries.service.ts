import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organizacion, Usr, Direccion, MediosContacto, ContactoEmergencia, InfoMedica } from './api_models';

@Injectable({
  providedIn: 'root'
})
export class ApiQueriesService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://192.168.1.8';  // FastAPI server URL


  //============================= Get Methods ==============================-

  // GET /orgs/all
  getOrgs(): Observable<Organizacion[]> {
    return this.http.get<Organizacion[]>(`${this.baseUrl}/orgs/all`);
  }

  // GET /usuarios
  getAllUsers(): Observable<Usr[]> {
    return this.http.get<Usr[]>(`${this.baseUrl}/usuarios`);
  }

  // GET /usuarios/full_data
  getAllUsersFullData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/full_data`);
  }

  // GET /usuario/{user_id}
  getUser(userId: number): Observable<Usr> {
    return this.http.get<Usr>(`${this.baseUrl}/usuario/${userId}`);
  }

  // GET /usuario/full_data/{user_id}
  getUserFullData(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario/full_data/${userId}`);
  }

  // GET /direcciones
  getAllDirecciones(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${this.baseUrl}/direcciones`);
  }

  // GET /direccion/{dir_id}
  getDireccion(dirId: number): Observable<Direccion> {
    return this.http.get<Direccion>(`${this.baseUrl}/direccion/${dirId}`);
  }

  // GET /medios_contacto
  getAllMediosContacto(): Observable<MediosContacto[]> {
    return this.http.get<MediosContacto[]>(`${this.baseUrl}/medios_contacto`);
  }

  // GET /medio_contacto/{medio_contacto_id}
  getMedioContacto(medioContactoId: number): Observable<MediosContacto> {
    return this.http.get<MediosContacto>(`${this.baseUrl}/medio_contacto/${medioContactoId}`);
  }

  // GET /contactos_emergencia
  getAllContactoEmergencia(): Observable<ContactoEmergencia[]> {
    return this.http.get<ContactoEmergencia[]>(`${this.baseUrl}/contactos_emergencia`);
  }

  // GET /contacto_emergencia/{contacto_emer_id}
  getContactoEmergencia(contactoEmerId: number): Observable<ContactoEmergencia> {
    return this.http.get<ContactoEmergencia>(`${this.baseUrl}/contacto_emergencia/${contactoEmerId}`);
  }

  // GET /infos_medica
  getAllInfoMedica(): Observable<InfoMedica[]> {
    return this.http.get<InfoMedica[]>(`${this.baseUrl}/infos_medica`);
  }

  // GET /info_medica/{info_med_id}
  getInfoMedica(infoMedId: number): Observable<InfoMedica> {
    return this.http.get<InfoMedica>(`${this.baseUrl}/info_medica/${infoMedId}`);
  }

  //========================================================================-

  //============================= Post Methods ==============================-

  // POST /usuario/add
  addUser(user: Usr): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario/add`, user);
  }

  // POST /direccion/add
  addDireccion(direccion: Direccion): Observable<any> {
    return this.http.post(`${this.baseUrl}/direccion/add`, direccion);
  }

  // POST /medios_contacto/add
  addMediosContacto(mediosContacto: MediosContacto): Observable<any> {
    return this.http.post(`${this.baseUrl}/medio_contacto/add`, mediosContacto);
  }

  // POST /contacto_emergencia/add
  addContactoEmergencia(contactoEmergencia: ContactoEmergencia): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacto_emer/add`, contactoEmergencia);
  }

  // POST /info_medica/add
  addInfoMedica(infoMedica: InfoMedica): Observable<any> {
    return this.http.post(`${this.baseUrl}/info_medica/add`, infoMedica);
  }
  //========================================================================-

  //============================= Put Methods ==============================-

  updateUser(userId: number, updatedUser: Usr): Observable<any> {
    return this.http.put(`${this.baseUrl}/usuario/update/${userId}`, updatedUser);
  }

  // PUT /direccion/update/{dir_id}
  updateDireccion(dirId: number, updatedDireccion: Direccion): Observable<any> {
    return this.http.put(`${this.baseUrl}/direccion/update/${dirId}`, updatedDireccion);
  }

  // PUT /medio_contacto/update/{medio_contacto_id}
  updateMedioContacto(medioContactoId: number, updatedMedioContacto: MediosContacto): Observable<any> {
    return this.http.put(`${this.baseUrl}/medio_contacto/update/${medioContactoId}`, updatedMedioContacto);
  }

  // PUT /contacto_emergencia/update/{contacto_emer_id}
  updateContactoEmergencia(contactoEmergenciaId: number, updatedContactoEmergencia: ContactoEmergencia): Observable<any> {
    return this.http.put(`${this.baseUrl}/contacto_emergencia/update/${contactoEmergenciaId}`, updatedContactoEmergencia);
  }

  // PUT /info_medica/update/{info_med_id}
  updateInfoMedica(infoMedicaId: number, updatedInfoMedica: InfoMedica): Observable<any> {
    return this.http.put(`${this.baseUrl}/info_medica/update/${infoMedicaId}`, updatedInfoMedica);
  }

  //========================================================================-

  //============================= Delete Methods ===========================-

  // DELETE /usuario/del/{user_id}
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuario/del/${userId}`);
  }

  // DELETE /usuario/del/all/{user_id}
  deleteUserAll(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuario/del/all/${userId}`);
  }

  // DELETE /direccion/del/{direccion_id}
  deleteDireccion(direccionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/direccion/del/${direccionId}`);
  }

  // DELETE /medio_contacto/del/{medios_contacto_id}
  deleteMediosContacto(mediosContactoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/medio_contacto/del/${mediosContactoId}`);
  }

  // DELETE /contacto_emergencia/del/{contacto_emerg_id}
  deleteContactoEmergencia(contactoEmergenciaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacto_emergencia/del/${contactoEmergenciaId}`);
  }

  // DELETE /info_medica/del/{info_medica_id}
  deleteInfoMedica(infoMedicaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/info_medica/del/${infoMedicaId}`);
  }
  //========================================================================-
}
