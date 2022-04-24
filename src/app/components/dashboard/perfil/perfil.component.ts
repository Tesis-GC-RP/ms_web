import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioNombreCompleto : String;
  usuarioGenero : String;
  usuarioDNI : String;
  usuarioFechaNacimiento : String;
  usuarioEdad:String;
  usuarioCorreo :String;
  usuarioTelefono:String;
  usuarioSIS :String;
  usuarioImagen: string;
  usuarioRol:String;

  
  constructor() {
    this.usuarioNombreCompleto = "";
    this.usuarioGenero = "";
    this.usuarioDNI = "";
    this.usuarioFechaNacimiento = "";
    this.usuarioEdad = "";
    this.usuarioCorreo  = "";
    this.usuarioTelefono = "";
    this.usuarioSIS = "";
    this.usuarioImagen = "https://cdn1.vectorstock.com/i/1000x1000/11/10/admin-icon-male-person-profile-avatar-with-gear-vector-25811110.jpg";
    this.usuarioRol = "";
   }

  ngOnInit(): void {
    this.obtenerDataUsuario();
    console.log(this.usuarioImagen);
  }

  obtenerDataUsuario(){
    this.usuarioNombreCompleto = sessionStorage.getItem("usuarioNombreCompleto")|| "";
    this.usuarioGenero = sessionStorage.getItem("usuarioGenero")|| "";
    this.usuarioDNI = sessionStorage.getItem("usuarioDNI")|| "";
    this.usuarioFechaNacimiento = sessionStorage.getItem("usuarioFechaNacimiento")|| "";
    this.usuarioEdad = sessionStorage.getItem("usuarioEdad")|| "";
    this.usuarioCorreo = sessionStorage.getItem("usuarioCorreo")|| "";
    this.usuarioTelefono = sessionStorage.getItem("usuarioTelefono")|| "";
    this.usuarioImagen = sessionStorage.getItem("usuarioImagen") || "https://cdn1.vectorstock.com/i/1000x1000/11/10/admin-icon-male-person-profile-avatar-with-gear-vector-25811110.jpg";
    this.usuarioRol = sessionStorage.getItem("usuarioRol")|| "";

  }
}
