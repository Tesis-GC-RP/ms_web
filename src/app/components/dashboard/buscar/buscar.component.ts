import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cita } from 'src/app/interfaces/cita';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { ResponseDTO } from 'src/app/interfaces/responseDTO';
import { CitaService } from 'src/app/services/cita.service';
import { DescargasService } from 'src/app/services/descargas.service';
import { PacienteService } from 'src/app/services/paciente.service';

export interface Section {
  name: string;
  updated: Date;
}


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form : FormGroup;

  pacienteExiste : boolean;
  tieneCitas : boolean;

  pacienteNombreCompleto : String;
  pacienteGenero : String;
  pacienteDNI : String;
  pacienteFechaNacimiento : String;
  pacienteEdad:String;
  pacienteCorreo :String;
  pacienteTelefono:String;
  pacienteSIS :String;

  citas : Cita[] = [];

  constructor(private _citaService:CitaService, 
    private fb: FormBuilder, 
    private _descargasService: DescargasService, 
    private _snackBar: MatSnackBar,
    private _pacienteService:PacienteService) { 
    this.form = this.fb.group({
      dni: ['']
    });
    this.pacienteNombreCompleto = "";
    this.pacienteGenero = "";
    this.pacienteDNI = "";
    this.pacienteFechaNacimiento = "";
    this.pacienteEdad = "";
    this.pacienteCorreo  = "";
    this.pacienteTelefono = "";
    this.pacienteSIS = "";
    this.pacienteExiste = false;
    this.tieneCitas = false;
  }

  ngOnInit(): void {
    this.citas = [];
  }

  getPaciente(){
    const dni = this.form.value.dni;
    this._pacienteService.getPaciente(sessionStorage.getItem("Token")!,dni).subscribe(data => {
      const response = <ResponseDTO<LoginResponse>> data.body;
      console.log(response);
      if(response.errorCode != 0){
        if(response.errorCode == 1){
          this.patientNotFound();
          return;
        }
        return;
      }
      let paciente = response.data.usuario;
      this.pacienteGenero = paciente.sexo == "F"? "Femenino": "Masculino";
      this.pacienteNombreCompleto = paciente.nombres + " " + paciente.apellidos; 
      this.pacienteDNI = paciente.dni;
      this.pacienteCorreo = paciente.correo;
      this.pacienteEdad = paciente.edad.toString();
      this.pacienteFechaNacimiento = paciente.fechaNacimiento;
      this.pacienteTelefono = paciente.telefono;
      this.pacienteSIS = data.body.data['sis'] == 1 ? "SI":"NO";
      this.pacienteExiste = true;
      this.getCitas();
    })
  }

  getCitas(){
    this.citas = []
    const dni = this.form.value.dni;
    this._citaService.getCitas(sessionStorage.getItem("Token")!,dni).subscribe(data => {
      const response = <ResponseDTO<Cita[]>> data.body;
      console.log(response);
      if(response.errorCode != 0){
        return;
      }
      for (let item of response.data) {
        this.citas.push(item);
      }
      if(this.citas.length > 0){
        this.tieneCitas = true;
      } else {
        this.tieneCitas = false;
      }
    })
  }


  descargar(url:string, nombre:string){
    this._descargasService.descargar(url, url).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = nombre;
      a.click();
      URL.revokeObjectURL(objectUrl);
    })
  }

  patientNotFound(){
    this._snackBar.open("No existe un paciente cono el DNI indicado",'', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })  
  }
}
