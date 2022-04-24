import { HttpResponse } from "@angular/common/http"

export interface LoginResponse {
    usuario: Usuario
}
interface Usuario {
    usuarioId:      number,
    nombres:        string,
    apellidos:      string,
    dni:            string,
    fechaNacimiento: string,
    edad:           number,
    correo:         string,
    telefono:       string,
    rol:            string,
    imagen:         Imagen,
    sexo:           string,
    hospital:       Hospital
}


interface Hospital {
    hospitalId:     number,
    nombre:         string,
    latitud:        number,
    longitud:       number,
    imagenUrl:      string
}

interface Imagen {
    imagenId:     number,
    url:         string,
}