import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { LoginRequest } from 'src/app/classes/loginRequest';
import { LoginResponse } from 'src/app/interfaces/loginResponse';
import { ResponseDTO } from 'src/app/interfaces/responseDTO';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading =  false;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _loginService:LoginService) {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      password: ['', Validators.required]
    });

   }

  ngOnInit(): void {
    const dni = localStorage.getItem("userDni");
    const password = localStorage.getItem("password");
    if(dni != null && password != null){
      this.router.navigate(['dashboard']);
      this.autologin(dni,password);
    }
  }


  autologin(dni: string, password: string){
    const request = new LoginRequest(dni, password)
    this._loginService.login(request).subscribe({
      next: (result: any) => {
        console.log(result);
        var responseDTO = <ResponseDTO<LoginResponse>> result.body;
        if(responseDTO.errorCode == 0){
          let rol = responseDTO.data.usuario.rol;
          if(rol == 'P'){
            this.isPatient();
            return
          } else {            
            this.llenarDatosUsuario(responseDTO.data);
            sessionStorage.setItem("Token", "Bearer " + result.headers.get("Token"))
            this.loading = true;
          }
        } else {
          this.credentialsError();
          this.router.navigate(['login']);
          return;
        }
      },


      error: (err: HttpErrorResponse) => {
        console.log(err);
        console.log(err.error.data);
        this.credentialsError();
        localStorage.clear();
        this.router.navigate(['login']);
        },
      complete: () => {
        console.log('complete');
        }
      }
    )
  }

  llenarDatosUsuario(usuario : LoginResponse ){
    sessionStorage.setItem("usuarioId", usuario.usuario.usuarioId.toString())
    sessionStorage.setItem("usuarioNombreCompleto", usuario.usuario.nombres + " " + usuario.usuario.apellidos);
    sessionStorage.setItem("usuarioGenero", usuario.usuario.sexo)
    sessionStorage.setItem("usuarioDNI", usuario.usuario.dni)
    sessionStorage.setItem("usuarioFechaNacimiento", usuario.usuario.fechaNacimiento)
    sessionStorage.setItem("usuarioEdad", usuario.usuario.edad.toString())
    sessionStorage.setItem("usuarioCorreo", usuario.usuario.correo)
    sessionStorage.setItem("usuarioTelefono", usuario.usuario.telefono)
    sessionStorage.setItem("usuarioImagen", usuario.usuario.imagen != null ? usuario.usuario.imagen.url:"")
    sessionStorage.setItem("usuarioRol", usuario.usuario.rol == "A"? "Administrador":usuario.usuario.rol == "D"? "Doctor":"Enfermero" )
  }

  ingresar(){

    const dni = this.form.value.dni;
    const password = this.form.value.password;
  
    const request = new LoginRequest(dni, password)
    this._loginService.login(request).subscribe({
      next: (result: any) => {
        console.log(result);
        var responseDTO = <ResponseDTO<LoginResponse>> result.body;
        if(responseDTO.errorCode == 2 || responseDTO.errorCode == 1){
          this.credentialsError();
          return;
        }

        let rol = responseDTO.data.usuario.rol;
        if(rol == 'P')
        {
          this.isPatient();
          return
        } else {
          this.loading = true;
          setTimeout(() => {
            this.llenarDatosUsuario(responseDTO.data);
            sessionStorage.setItem("Token", "Bearer " + result.headers.get("Token"))
            this.loading = false;
            localStorage.setItem("userDni", dni);
            localStorage.setItem("password", password);
            this.router.navigate(['dashboard']);
          }, 500);
        }},

      error: (err: HttpErrorResponse) => {
        console.log(err);
        console.log(err.error.data);
        this.credentialsError();
        },
      complete: () => {
        console.log('complete');
        }
      }
    )
  }

  credentialsError(){
    this._snackBar.open("El usuario o contraseña ingresado es inválido",'', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })  
  }

  isPatient(){
    this._snackBar.open("Los usuarios tipo paciente no puede ingresar.",'', {
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['red-snackbar'],
    })  
  }


  fakeLoading(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['dashboard']);
    }, 500);
  }

}
