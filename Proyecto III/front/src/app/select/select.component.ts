import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../servicios/recurso.service';
import { Casas} from '../interfaz/casas';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  message="hola"
  terminos:String[]=[]
  casas:Casas[]=[]

  constructor(private recursoService: RecursoService) {
    recursoService.obtenerCasas().subscribe(res=>{
      let casa= res as Array<Object>
      casa.forEach(cas=>{
        let casita= cas as Casas
        if(this.terminos.indexOf(casita.tipo)==-1){
          this.terminos.push(casita.tipo)
        }
      })
    })
  }

  ngOnInit(): void {
    let selector=document.getElementById("selector") as HTMLInputElement;
  
    selector?.addEventListener('change', ex=>{
      let contenedor=document.getElementById("contenedor")
      contenedor!.innerHTML=''
      
      this.recursoService.obtenerCasasTipo(selector.value).subscribe(res=>{
        let opcion=0;
        let casas=res as Array<Object>
        casas.forEach(cas=>{
          let casa=cas as Casas
          opcion++;
          let imagen=casa.id%10

          contenedor!.innerHTML+='<div class="card" style="width: 18rem;">\
          <img src="./assets/casa'+imagen+'.jpg" class="card-img-top" alt="...">\
          <div class="card-body">\
            <h5 class="card-title">Casa # '+opcion+'</h5>\
            <p class="card-text">Propietario id: '+casa.propietario_id+'</p>\
            <a href="/reporte/'+casa.id+'" class="btn btn-primary">Ver mas</a>\
          </div>\
        </div>'
        })
      })
    })
  }
}
