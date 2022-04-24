import { Time } from "@angular/common"
import { Reporte } from "./reporte"

export interface Cita {
    citaId: number,
    citaDescripcion: string,
    citaFecha: Date,
    citaHora: Time,
    pacienteId: number,
    pacienteNombres: string,
    pacienteApellidos: string,
    pacienteDni: string,
    pacienteFechaNacimiento: Date,
    pacienteEdad: number,
    pacienteCorreo: string,
    pacienteTelefono: string,
    pacienteSIS: number,
    pacienteGenero: string,
    hospitalId: number,
    hospitalNombre: string,
    doctorId: number,
    doctorNombres: string,
    doctorApellidos: string,
    doctorDni: string,
    doctorEspecializacion: string,
    reportes: Reporte[]
}