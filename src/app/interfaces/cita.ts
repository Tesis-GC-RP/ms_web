import { Time } from "@angular/common"
import { Reporte } from "./reporte"
/*
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
*/
export class Cita {
    citaId: number                  = 0;
    citaDescripcion: string         = "";
    citaFecha: Date                 = new Date();
    citaHora: Time                  = {hours:0, minutes:0};
    pacienteId: number              = 0;
    pacienteNombres: string         = "";
    pacienteApellidos: string       = "";
    pacienteDni: string             = "";
    pacienteFechaNacimiento: Date   = new Date();
    pacienteEdad: number            = 0;
    pacienteCorreo: string          = "";
    pacienteTelefono: string        = "";
    pacienteSIS: number             = 0;
    pacienteGenero: string          = "";
    hospitalId: number              = 0;
    hospitalNombre: string          = "";
    doctorId: number                = 0;
    doctorNombres: string           = "";
    doctorApellidos: string         = "";
    doctorDni: string               = "";
    doctorEspecializacion: string   = "";
    reportes: Reporte[]             = Array<Reporte>();
}