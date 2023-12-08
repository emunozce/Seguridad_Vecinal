from pathlib import Path
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Instancia de nuestra API
app = FastAPI()

origins = [
    "http://localhost:4200",
    # Add other allowed origins as needed
]

app.add_middleware(
    CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"]
)

path_usr_file = "/mnt/usuarios.json"
path_dir_file = "/mnt/direccion.json"
path_info_medica_file = "/mnt/info_medica.json"
path_medios_contacto_file = "/mnt/medios_contacto.json"
path_contacto_emerg_file = "/mnt/contacto_emergencia.json"
path_organizaciones_file = "/mnt/organizaciones.json"
# path_organizaciones_file = "/mnt/organizaciones.json"

# BaseModel se encarga de transformar las clases en formato JSON
# Preferentemente usar tipado en las variables


class Usr(BaseModel):
    id: int
    name: str
    lastname: str
    email: str
    direccion_id: int
    info_medica_id: int
    medios_contacto_id: int
    contacto_emerg_id: int


class Direccion(BaseModel):
    id: int
    calle: str
    num_ext: str
    num_int: str | None
    fracc: str
    cp: str
    estado: str


class MediosContacto(BaseModel):
    id: int
    telefono_casa: str
    telefono_personal: str


class ContactoEmergencia(BaseModel):
    id: int
    nombre: str
    lastname: str
    telefono_contacto: str


class InfoMedica(BaseModel):
    id: int
    tipo_sangre: str
    enfermedades_cronicas: str | None


class Organizacion(BaseModel):
    id: int
    name: str
    phone: str


################### Global Functions ########################


# Checar si un archivo esta vacio.
def is_file_empty(file_path: Path):
    return file_path.stat().st_size == 0


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#


#################### GET Functions ##########################


def read_data_from_file(file_path: Path):
    if is_file_empty(file_path):
        return []
    data_js = file_path.read_text("utf-8")
    return json.loads(data_js)


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

#################### POST functions #########################


def set_usuarios_file(data: Usr):
    path = Path(path_usr_file)
    # Si el archivo esta vacio, por defecto poner los id de todo en 1
    ls = []

    if not is_file_empty(path):
        # Si el archivo no esta vacio, iterar por la lista y encontrar
        # el id mas grande (logicamente el registro mas reciente), y sumarle 1.
        # Esto garantiza que no se repitan los id.
        data_js = path.read_text("utf-8")
        ls = json.loads(data_js)

    max_id = max((item["id"] for item in ls), default=1)
    index = max_id + 1
    data.id = index
    data.info_medica_id = index
    data.direccion_id = index
    data.contacto_emerg_id = index
    data.medios_contacto_id = index
    ls.append(data.__dict__)
    path.write_text(json.dumps(ls), "utf-8")


def set_direccion_file(data: Direccion):
    path = Path(path_dir_file)
    ls = []

    if not is_file_empty(path):
        data_js = path.read_text("utf-8")
        ls = json.loads(data_js)

    max_id = max((item["id"] for item in ls), default=1)
    index = max_id + 1
    data.id = index
    ls.append(data.__dict__)
    path.write_text(json.dumps(ls), "utf-8")


def set_medios_contacto_file(data: MediosContacto):
    path = Path(path_medios_contacto_file)
    ls = []

    if not is_file_empty(path):
        data_js = path.read_text("utf-8")
        ls = json.loads(data_js)

    max_id = max((item["id"] for item in ls), default=1)
    index = max_id + 1
    data.id = index
    ls.append(data.__dict__)
    path.write_text(json.dumps(ls), "utf-8")


def set_contacto_emerg_file(data: ContactoEmergencia):
    path = Path(path_contacto_emerg_file)
    ls = []

    if not is_file_empty(path):
        data_js = path.read_text("utf-8")
        ls = json.loads(data_js)

    max_id = max((item["id"] for item in ls), default=1)
    index = max_id + 1
    data.id = index
    ls.append(data.__dict__)
    path.write_text(json.dumps(ls), "utf-8")


def set_info_medica_file(data: InfoMedica):
    path = Path(path_info_medica_file)
    ls = []

    if not is_file_empty(path):
        data_js = path.read_text("utf-8")
        ls = json.loads(data_js)

    max_id = max((item["id"] for item in ls), default=1)
    index = max_id + 1
    data.id = index
    ls.append(data.__dict__)
    path.write_text(json.dumps(ls), "utf-8")


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

#################### PUT functions ##########################


def write_data_to_file(file_path: Path, data):
    file_path.write_text(json.dumps(data), "utf-8")


def update_item_fields(existing_item, updated_item):
    for field, value in updated_item.model_dump().items():
        if field != "id":
            existing_item[field] = value


def update_item_fields_usrs(existing_item, updated_item):
    for field, value in updated_item.model_dump().items():
        if (
            field != "id"
            or field != "direccion_id"
            or field != "info_medica_id"
            or field != "medios_contacto_id"
            or field != "contacto_emerg_id"
        ):
            existing_item[field] = value


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

#################### DELETE functions #######################


def delete_item_by_id(items, item_id):
    for i, item in enumerate(items):
        if item["id"] == item_id:
            del items[i]
            return True
    return False


def delete_related_data(file_path, reference_key, user_id):
    items = read_data_from_file(file_path)
    updated_items = [item for item in items if item[reference_key] != user_id]
    write_data_to_file(file_path, updated_items)


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# PETICIONES HTTP =>
# Se usan con el protocolo HTTP, un estandar.
# GET => Obtener elementos
# POST => Agregar elementos
# PUT => Actualizar elementos
# DELETE => Borrar elmentos


# Siempre que llamamos a un servidor,
# se tiene que llamar una funcion de manera asincrona, es decir,
# la app no puede seguir hasta que se reciba la respuesta del servidor


#################### GET methods ##########################


# Regresar un BaseModel, para mas dinamismo.
# @app.get("/users/", status_code=201)
# async def get_users():
#     usr_list.sort(key=lambda user: user.id)  # Sortea la lista por id
#     return usr_list


# # Llamar por el Path de la URL
# @app.get("/user/{id}")
# async def get_user_by_id_path(id: int):
#     return search_user(id)


# # Llamar por Query (?id=1)
# @app.get("/userquery/")
# async def get_user_by_id_query(id: int):
#     return search_user(id)


@app.get("/orgs/all")
async def get_orgs():
    path = Path(path_organizaciones_file)
    orgs = read_data_from_file(path)
    return orgs


@app.get("/usuarios")
async def get_all_users():
    path = Path(path_usr_file)
    users = read_data_from_file(path)
    return users


@app.get("/usuarios/full_data")
async def get_all_users_full_data():
    users_path = Path(path_usr_file)
    direcciones_path = Path(path_dir_file)
    medios_contacto_path = Path(path_medios_contacto_file)
    contacto_emergencia_path = Path(path_contacto_emerg_file)
    info_medica_path = Path(path_info_medica_file)

    users = read_data_from_file(users_path)
    direcciones = read_data_from_file(direcciones_path)
    medios_contacto = read_data_from_file(medios_contacto_path)
    contacto_emergencia = read_data_from_file(contacto_emergencia_path)
    info_medica = read_data_from_file(info_medica_path)

    all_users_full_data = []

    for user in users:
        # Retrieve associated data for each user
        direccion_id = user.get("direccion_id")
        medios_contacto_id = user.get("medios_contacto_id")
        contacto_emergencia_id = user.get("contacto_emerg_id")
        info_medica_id = user.get("info_medica_id")

        user_full_data = {
            "user": user,
            "direccion": next((d for d in direcciones if d["id"] == direccion_id), {}),
            "medios_contacto": next(
                (mc for mc in medios_contacto if mc["id"] == medios_contacto_id), {}
            ),
            "contacto_emergencia": next(
                (
                    ce
                    for ce in contacto_emergencia
                    if ce["id"] == contacto_emergencia_id
                ),
                {},
            ),
            "info_medica": next(
                (im for im in info_medica if im["id"] == info_medica_id), {}
            ),
        }

        all_users_full_data.append(user_full_data)

    return all_users_full_data


@app.get("/usuario/{user_id}")
async def get_user(user_id: int):
    path = Path(path_usr_file)
    if is_file_empty(path):
        raise HTTPException(status_code=404, detail="User not found")

    data_js = path.read_text("utf-8")
    users = json.loads(data_js)

    for user in users:
        if user["id"] == user_id:
            return user

    raise HTTPException(status_code=404, detail="User not found")


@app.get("/usuario/full_data/{user_id}")
async def get_user_full_data(user_id: int):
    users_path = Path(path_usr_file)
    direcciones_path = Path(path_dir_file)
    medios_contacto_path = Path(path_medios_contacto_file)
    contacto_emergencia_path = Path(path_contacto_emerg_file)
    info_medica_path = Path(path_info_medica_file)

    users = read_data_from_file(users_path)

    user = None
    user_found = False
    for u in users:
        if u["id"] == user_id:
            user = u
            user_found = True
            break

    if not user_found or user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Retrieve associated data
    direccion_id = user["direccion_id"]
    medios_contacto_id = user["medios_contacto_id"]
    contacto_emergencia_id = user["contacto_emerg_id"]
    info_medica_id = user["info_medica_id"]

    direcciones = read_data_from_file(direcciones_path)
    medios_contacto = read_data_from_file(medios_contacto_path)
    contacto_emergencia = read_data_from_file(contacto_emergencia_path)
    info_medica = read_data_from_file(info_medica_path)

    user_full_data = {
        "user": user,
        "direccion": next((d for d in direcciones if d["id"] == direccion_id), {}),
        "medios_contacto": next(
            (mc for mc in medios_contacto if mc["id"] == medios_contacto_id), {}
        ),
        "contacto_emergencia": next(
            (ce for ce in contacto_emergencia if ce["id"] == contacto_emergencia_id), {}
        ),
        "info_medica": next(
            (im for im in info_medica if im["id"] == info_medica_id), {}
        ),
    }

    return user_full_data


@app.get("/direcciones")
async def get_all_direcciones():
    path = Path(path_dir_file)
    direcciones = read_data_from_file(path)
    return direcciones


@app.get("/direccion/{dir_id}")
async def get_dir(dir_id: int):
    path = Path(path_dir_file)
    if is_file_empty(path):
        raise HTTPException(status_code=404, detail="User not found")

    data_js = path.read_text("utf-8")
    dirs = json.loads(data_js)

    for direc in dirs:
        if direc["id"] == dir_id:
            return direc

    raise HTTPException(status_code=404, detail="User not found")


@app.get("/medios_contacto")
async def get_all_medios_contacto():
    path = Path(path_medios_contacto_file)
    medios_contacto = read_data_from_file(path)
    return medios_contacto


@app.get("/medio_contacto/{medio_contacto_id}")
async def get_medio_con(medio_contacto_id: int):
    path = Path(path_medios_contacto_file)
    if is_file_empty(path):
        raise HTTPException(status_code=404, detail="User not found")

    data_js = path.read_text("utf-8")
    medios_con = json.loads(data_js)

    for medio_con in medios_con:
        if medio_con["id"] == medio_contacto_id:
            return medio_con

    raise HTTPException(status_code=404, detail="User not found")


@app.get("/contactos_emergencia")
async def get_all_contacto_emergencia():
    path = Path(path_contacto_emerg_file)
    contacto_emergencia = read_data_from_file(path)
    return contacto_emergencia


@app.get("/contacto_emergencia/{contacto_emer_id}")
async def get_contacto_emer(contacto_emer_id: int):
    path = Path(path_contacto_emerg_file)
    if is_file_empty(path):
        raise HTTPException(status_code=404, detail="User not found")

    data_js = path.read_text("utf-8")
    contacts_emer = json.loads(data_js)

    for contact_emer in contacts_emer:
        if contact_emer["id"] == contacto_emer_id:
            return contact_emer

    raise HTTPException(status_code=404, detail="User not found")


@app.get("/infos_medica")
async def get_all_info_medica():
    path = Path(path_info_medica_file)
    info_medica = read_data_from_file(path)
    return info_medica


@app.get("/info_medica/{info_med_id}")
async def get_info_med(info_med_id: int):
    path = Path(path_info_medica_file)
    if is_file_empty(path):
        raise HTTPException(status_code=404, detail="User not found")

    data_js = path.read_text("utf-8")
    infos_med = json.loads(data_js)

    for info in infos_med:
        if info["id"] == info_med_id:
            return info

    raise HTTPException(status_code=404, detail="User not found")


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

#################### POST methods #########################


# POST => Recibe un JSON para actualizar los datos, de nuevo,
# BaseModel se encarga de transformar el JSON a un objeto de tipo User
# @app.post("/user/")
# async def add_usr(user: Usr):
#     if isinstance(search_user(user.id), Usr):
#         return {"error": "El usuario ya existe!"}
#     else:
#         usr_list.append(user)
#         return NULL


@app.post("/usuario/add", status_code=201)
async def create_user(user: Usr):
    set_usuarios_file(user)
    return {"message": "User created successfully", "user_id": user.id}


@app.post("/direccion/add", status_code=201)
async def create_dir(direc: Direccion):
    set_direccion_file(direc)
    return {"message": "Direccion created successfully", "dir_id": direc.id}


@app.post("/medio_contacto/add", status_code=201)
async def create_medio_contacto(m_c: MediosContacto):
    set_medios_contacto_file(m_c)
    return {"message": "Medio_Contacto created successfully", "m_c_id": m_c.id}


@app.post("/contacto_emer/add", status_code=201)
async def create_contacto_emerg(contacto_emer: ContactoEmergencia):
    set_contacto_emerg_file(contacto_emer)
    return {"message": "Contacto_Emer created successfully", "c_e_id": contacto_emer.id}


@app.post("/info_medica/add", status_code=201)
async def create_info_medica(info: InfoMedica):
    set_info_medica_file(info)
    return {"message": "Info_medica created successfully", "info_id": info.id}


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

#################### PUT methods  ##########################


# PUT => Recibe un json para actualizar un elemento del array.


@app.put("/usuario/update/{user_id}")
async def update_user(user_id: int, updated_user: Usr):
    path = Path(path_usr_file)
    users = read_data_from_file(path)

    user_found = False
    for i, user in enumerate(users):
        if user["id"] == user_id:
            update_item_fields_usrs(users[i], updated_user)
            user_found = True
            break

    if not user_found:
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, users)
    return {"message": f"User with ID {user_id} updated successfully"}


@app.put("/direccion/update/{dir_id}")
async def update_direccion(dir_id: int, updated_dir: Direccion):
    path = Path(path_dir_file)
    dirs = read_data_from_file(path)

    dir_found = False
    for i, direc in enumerate(dirs):
        if direc["id"] == dir_id:
            update_item_fields(dirs[i], updated_dir)
            dir_found = True
            break

    if not dir_found:
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, dirs)
    return {"message": f"Direccion with ID {dir_id} updated successfully"}


@app.put("/medio_contacto/update/{medio_contacto_id}")
async def update_medio_contacto(
    medio_contacto_id: int, updated_medio_contacto: MediosContacto
):
    path = Path(path_medios_contacto_file)
    medios_contacto = read_data_from_file(path)

    medio_contacto_found = False
    for i, md in enumerate(medios_contacto):
        if md["id"] == medio_contacto_id:
            update_item_fields(medios_contacto[i], updated_medio_contacto)
            medio_contacto_found = True
            break

    if not medio_contacto_found:
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, medios_contacto)
    return {
        "message": f"Medio_contacto with ID {medio_contacto_id} updated successfully"
    }


@app.put("/contacto_emergencia/update/{contacto_emer_id}")
async def update_contacto_emergencia(
    contacto_emer_id: int, updated_contacto_emer: ContactoEmergencia
):
    path = Path(path_contacto_emerg_file)
    contactos_emergencia = read_data_from_file(path)

    contacto_emer_found = False
    for i, ce in enumerate(contactos_emergencia):
        if ce["id"] == contacto_emer_id:
            update_item_fields(contactos_emergencia[i], updated_contacto_emer)
            contacto_emer_found = True
            break

    if not contacto_emer_found:
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, contactos_emergencia)
    return {
        "message": f"Contacto_emergencia with ID {contacto_emer_id} updated successfully"
    }


@app.put("/info_medica/update/{info_med_id}")
async def update_info_medica(info_med_id: int, updated_info_med: InfoMedica):
    path = Path(path_info_medica_file)
    infos_med = read_data_from_file(path)

    info_med_found = False
    for i, info_med in enumerate(infos_med):
        if info_med["id"] == info_med_id:
            update_item_fields(infos_med[i], updated_info_med)
            info_med_found = True
            break

    if not info_med_found:
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, infos_med)
    return {"message": f"Info_medica with ID {info_med_id} updated successfully"}


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

#################### DELETE methods #######################


@app.delete("/usuario/del/{user_id}")
async def delete_user(user_id: int):
    path = Path(path_usr_file)
    users = read_data_from_file(path)

    if not delete_item_by_id(users, user_id):
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, users)
    return {"message": f"User with ID {user_id} deleted successfully"}


@app.delete("/usuario/del/all/{user_id}")
async def delete_user_all(user_id: int):
    path = Path(path_usr_file)
    users = read_data_from_file(path)

    if not delete_item_by_id(users, user_id):
        raise HTTPException(status_code=404, detail="User not found")

    write_data_to_file(path, users)

    # Delete related data in other files
    delete_related_data(Path(path_dir_file), "id", user_id)
    delete_related_data(Path(path_medios_contacto_file), "id", user_id)
    delete_related_data(Path(path_contacto_emerg_file), "id", user_id)
    delete_related_data(Path(path_info_medica_file), "id", user_id)

    return {"message": f"User with ID {user_id} and related data deleted successfully"}


@app.delete("/direccion/del/{direccion_id}")
async def delete_direccion(direccion_id: int):
    path = Path(path_dir_file)
    direcciones = read_data_from_file(path)

    if not delete_item_by_id(direcciones, direccion_id):
        raise HTTPException(status_code=404, detail="Direccion not found")

    write_data_to_file(path, direcciones)
    return {"message": f"Direccion with ID {direccion_id} deleted successfully"}


@app.delete("/medio_contacto/del/{medios_contacto_id}")
async def delete_medios_contacto(medios_contacto_id: int):
    path = Path(path_medios_contacto_file)
    medios_contacto = read_data_from_file(path)

    if not delete_item_by_id(medios_contacto, medios_contacto_id):
        raise HTTPException(status_code=404, detail="Medios_contacto not found")

    write_data_to_file(path, medios_contacto)
    return {
        "message": f"Medios_contacto with ID {medios_contacto_id} deleted successfully"
    }


@app.delete("/contacto_emergencia/del/{contacto_emerg_id}")
async def delete_contacto_emergencia(contacto_emerg_id: int):
    path = Path(path_contacto_emerg_file)
    contacto_emergencia = read_data_from_file(path)

    if not delete_item_by_id(contacto_emergencia, contacto_emerg_id):
        raise HTTPException(status_code=404, detail="Contacto_emergencia not found")

    write_data_to_file(path, contacto_emergencia)
    return {
        "message": f"Contacto_emergencia with ID {contacto_emerg_id} deleted successfully"
    }


@app.delete("/info_medica/del/{info_medica_id}")
async def delete_info_medica(info_medica_id: int):
    path = Path("../../nfo_medica.json")
    info_medica = read_data_from_file(path)

    if not delete_item_by_id(info_medica, info_medica_id):
        raise HTTPException(status_code=404, detail="Info_medica not found")

    write_data_to_file(path, info_medica)
    return {"message": f"Info_medica with ID {info_medica_id} deleted successfully"}


# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
