import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let mensaje=""


@Injectable({
  providedIn: 'root'
})
export class RecursoService {


  constructor(private http: HttpClient) { }

  obtenerCasas(){
    return this.http.get('http://localhost:3000/casas')
  }

  obtenerCasasTipo(tipo:string | null){
    return this.http.get('http://localhost:3000/casas/'+tipo)
  }

  obtenerRegistro(id:string| null){
    return this.http.get('http://localhost:3000/casa/reporte/'+id)

  }


}
