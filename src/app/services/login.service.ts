import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../classes/loginRequest';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  login (login: LoginRequest): Observable<any>{


    return this.http.post<any>( environment.url_api + 'usuario/login',login, {observe: 'response'})
  }
}
