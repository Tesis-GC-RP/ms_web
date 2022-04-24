import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cita } from '../interfaces/cita';
import { ResponseDTO } from '../interfaces/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }



  getCitas(token: string, dni: string): Observable<any>{

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + token );

    const params = new HttpParams()
    .set('dni', dni)

    return this.http.get<any>(environment.url_api + 'cita/historial',
    {
      headers,
      observe: 'response',
      params
    })
  }
}
