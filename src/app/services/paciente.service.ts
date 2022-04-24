import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getPaciente(token: string, dni: string): Observable<any>{

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + token );

    const params = new HttpParams()
    .set('dni', dni)

    return this.http.get<any>(environment.url_api + 'paciente',
    {
      headers,
      observe: 'response',
      params
    })
  }
}
