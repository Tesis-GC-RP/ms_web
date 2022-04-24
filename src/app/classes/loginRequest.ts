
export class LoginRequest {
    dni: string;
    contrasena: string;

    constructor(dni:string, contrasena:string){
        this.dni = dni
        this.contrasena = contrasena
    }
}