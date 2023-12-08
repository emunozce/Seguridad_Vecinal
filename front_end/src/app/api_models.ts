// api-models.ts in Angular
export interface Usr {
    id: number;
    name: string;
    lastname: string;
    email: string;
    direccion_id: number;
    info_medica_id: number;
    medios_contacto_id: number;
    contacto_emerg_id: number;
}

export interface Direccion {
    id: number;
    calle: string;
    num_ext: string;
    num_int: string | null;
    fracc: string;
    cp: string;
    estado: string;
}

export interface MediosContacto {
    id: number;
    telefono_casa: string;
    telefono_personal: string;
}

export interface ContactoEmergencia {
    id: number;
    nombre: string;
    lastname: string;
    telefono_contacto: string;
}

export interface InfoMedica {
    id: number;
    tipo_sangre: string;
    enfermedades_cronicas: string | null;
}

export interface Organizacion {
    id: number;
    name: string;
    phone: string;
}