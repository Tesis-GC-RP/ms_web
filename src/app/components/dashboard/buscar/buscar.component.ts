import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cita } from 'src/app/interfaces/cita';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { ResponseDTO } from 'src/app/interfaces/responseDTO';
import { CitaService } from 'src/app/services/cita.service';
import { DescargasService } from 'src/app/services/descargas.service';
import { PacienteService } from 'src/app/services/paciente.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  especializaciones = [
    {value: 'Ninguna'},
    {value: 'Cardiología'},
    {value: 'Dermatología'},
    {value: 'Neurología'},
    {value: 'Gastroenterología'},
    {value: 'Nutrición'},
    {value: 'Odontología'},
    {value: 'Oftalmología'},
    {value: 'Pediatría'},
    {value: 'Psicología'},
    {value: 'Urología'}];

  especializacionControl = new FormControl(this.especializaciones[0].value);

  constructor(private _citaService:CitaService, 
    private fb: FormBuilder, 
    private _descargasService: DescargasService, 
    private _snackBar: MatSnackBar,
    private _pacienteService:PacienteService,
    public _dialog: MatDialog) { 
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

  subirReporte(){
  }

  patientNotFound(){
    this._snackBar.open("No existe un paciente cono el DNI indicado",'', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })  
  }

  openDialog(cita: Cita): void {
    console.log("Abriendo Dialog.")
    const dialogRef = this._dialog.open(CitaDetailDialog, {
      width: '600px',
      height: '500px',
      data: cita,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result!= null){
        const index = this.citas.findIndex( cita => cita.citaId == result.citaId);
        this.citas[index] = result;
      }
    });
  }
}


@Component({
  selector: 'edit-cita-dialog',
  templateUrl: './edit-cita-dialog.html',
})
export class CitaDetailDialog {

  sending: boolean = false;
  newFiles: File[] = [];
  nuevaDescripcion : string = "";

  constructor(
    public dialogRef: MatDialogRef<CitaDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Cita,
    private _citaService:CitaService,
    private _snackbar:MatSnackBar
  ) {
    File
    this.sending = false;
    this.nuevaDescripcion = data.citaDescripcion;
  }

  onFileChange(event:any) {
    this.newFiles = Array<File>();
    const files : FileList = event.target.files;
    for (var i = 0; i < files.length; i++) { 
        this.newFiles.push(files.item(i)!);
    }
  }

  actualizarDescripcion(){
    this._citaService.actualizarDescripcion(sessionStorage.getItem("Token")!,this.data.citaId,this.nuevaDescripcion).subscribe(data => {
      const response = <ResponseDTO<Cita>> data.body;
      console.log(response);
      if(response.errorCode != 0){
        return false;
      }
      this.data = response.data;
      return true;
    })
    return false;
  }

  enviarCambios(){
    this.sending = true;
    this._citaService.actualizarDescripcion(sessionStorage.getItem("Token")!,this.data.citaId,this.nuevaDescripcion).subscribe(data => {
      const response = <ResponseDTO<Cita>> data.body;
      console.log(response);
      if(response.errorCode != 0){
        return ;
      }
      this.data = response.data;
      
      if(this.newFiles.length > 0){
        this.subirReportes();
      } else {
        this.sending = false;
        this.dialogRef.close(this.data);
      }
    })
  
  }

  subirReportes(){
    this._citaService.subirReportes(sessionStorage.getItem("Token")!, this.newFiles, this.data.citaId).subscribe(data => {
      const response = <ResponseDTO<Cita>> data.body;
      console.log(response);
      if(response.errorCode != 0){
        return ;
      }
      this.data = response.data;
      this.dialogRef.close(this.data);
      this.sending = false;
    });
  }


  eliminarReporte(reporteId: string){

      if(confirm("Esta seguro de eliminar este archivo")) {
        this.sending = true;
        this._citaService.eliminarReporte(sessionStorage.getItem("Token")!, reporteId).subscribe(data => {
          const response = data.body;
          if(response['result'] == "ok"){
            this.data.reportes = this.data.reportes.filter(reporte => reporte.reporteId !== reporteId);
          } else {
            this.errorRequest();
          }
          this.sending = false;
        })
      } else {
        return;
      }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  
  errorRequest(){
    this._snackbar.open("Ocurrio un error al actualizar la cita",'', {
      duration: 2000,
      horizontalPosition: 'center',
      panelClass: ['red-snackbar'],
    })  
  }
}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: Cita[], filter: string): any {
      if (!items || !filter) {
          return items;
      }
      if( filter == "Ninguna") return items;
      return items.filter(item => item.doctorEspecializacion.indexOf(filter) !== -1);
  }
}