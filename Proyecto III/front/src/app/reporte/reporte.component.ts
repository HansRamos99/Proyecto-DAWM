import { Component, OnInit, Inject } from '@angular/core';
import { RecursoService } from '../servicios/recurso.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit {
  message:string='5'
  id:string=''

  constructor(private recursoService: RecursoService, @Inject(DOCUMENT) document: any) { 
    let id=document.location.href.split("/")[4]
    let num=parseInt(id)%10
    this.message=num+''
  }

  ngOnInit(): void {

    let elemento=document.getElementById("principal")

    elemento!.innerHTML=''

    this.recursoService.obtenerRegistro(this.message).subscribe(res=>{
      let arr=res as any
      Object.keys(arr).map((el)=>{
        let tabla= document.getElementById('tbody')
        let elemento=arr[el]
        let comentario=elemento.comentario.substr(0,45)+'...'
        tabla!.innerHTML+='<tr>\
        <td>'+elemento.fechaAlquiler.substr(0,10)+'</td>\
        <td> cliente #'+elemento.id_cliente+'</td>\
        <td>'+comentario+'</td>\
      </tr>'
      })
    })

  }


}
