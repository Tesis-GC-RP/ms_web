import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescargasService {

  constructor(private http: HttpClient) {  }

  
  descargar(url:string, nombre:string): Observable<any>{
    return this.http.get(url, {responseType: 'blob'})}
}
