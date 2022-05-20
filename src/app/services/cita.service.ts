import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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


  subirReportes(token: string, files: File[], citaId: number): Observable<any>{

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + token );

    const params = new HttpParams()
    .set('citaId', citaId)

    const formData = new FormData();

    for (var i = 0; i < files.length; i++) { 
      formData.append("files", files[i], files[i].name);
      console.log(files[i]);
      console.log(files[i].name);
     }

    

    return this.http.post<any>(environment.url_api + 'cita/subirReportes', formData ,
    {
      headers,
      observe: 'response',
      params
    })
  }


  eliminarReporte(token: string, reporteId: string): Observable<any>{
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + token );

    const params = new HttpParams()
    .set('reporteId', reporteId)

    return this.http.delete<any>(environment.url_api + 'cita/borrarReporte',
    {
      headers,
      observe: 'response',
      params
    })

  }

  actualizarDescripcion(token: string, citaId: number, descripcion: string) : Observable<any>{
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer " + token )
    .set("Content-Type", "application/json");

    const body = {
      'citaId' : citaId,
      'descripcion': descripcion
  }

    return this.http.patch<any>(environment.url_api + 'cita/updateDescripcion', body, 
    {
      headers,
      observe: 'response'
    })
  }


}
