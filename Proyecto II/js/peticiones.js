
document.addEventListener('DOMContentLoaded', ()=>{
    //definimos las variales del documento
    

    let url= "https://api.artic.edu/api/v1/artworks?limit=45"
    let cartas= document.getElementsByClassName('card')
    let imagenes= document.getElementsByClassName('img-fluid')
    let titulos= document.getElementsByClassName('card-title')
    let descripciones= document.getElementsByClassName('card-text')
    let iiif_url= 'https://www.artic.edu/iiif/2'
    let categorias=[]
    let tabla= document.getElementById("tabla")


    //peticion a la api, donde tiene una lista con 30 obras de arte a visualizar
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(
    respuesta =>{ 
        let elementos= respuesta.data
        //llenando las categorias de todas las obras disponibles
        elementos.map((el)=>{categorias.push(el.artwork_type_title)})
        const cat= new Set(categorias)
        categorias = [...cat]

        //funciones a aplicar en el documento

        rellenarSeleccion(categorias)
        rellenarCarrusel(elementos, iiif_url)
        seleccionarObras(elementos, cartas, imagenes, titulos, descripciones, iiif_url)
        aparecerModal(tabla)

        //funciones a aplicar en el documento
})
})


//Funcion que de un conjunto grande de obras, escoge segun las seleccionadas en la pagina
function seleccionarObras(elementos, cartas, imagenes, titulos, descripciones, iiif_url){
    let opciones=document.getElementsByClassName("lista_opcion")
    let opcionSeleccionada;
    let elementosR=[]
    let contain= document.getElementById('contenedor_img')
    opciones.forEach(op=>{
        op.addEventListener('click', ()=>{
            contain.innerHTML=''
            opcionSeleccionada= op.innerText
            elementos.forEach(el=>{
                if(el.artwork_type_title==opcionSeleccionada){
                    elementosR.push(el)
                }     
            })
            rellenarImagenes(elementosR,cartas, imagenes, titulos, descripciones, iiif_url)
            elementosR.splice(0, elementosR.length)
        })
        
    })
}

//funcion que se le pasan las categorias y las pone en el selector de la pagina 
function rellenarSeleccion(elementos){
    let lista=document.getElementById("lista")

    elementos.map(elemento=>{
        let elemento_lista= document.createElement("li")
        elemento_lista.innerHTML='<a class="dropdown-item lista_opcion" href="#">'+elemento+'</a>'
        lista.appendChild(elemento_lista)
    })

    let elemento_lista= document.createElement("li")
    elemento_lista.innerHTML='<li class="opcion"><hr class="dropdown-divider" /></li>'
    lista.appendChild(elemento_lista)
}

//funcion para mostrar las imagenes de las obras, con su descripcion
function rellenarImagenes(elementos,cartas, imagenes, titulos, descripciones, iiif_url){

    let numeroElementos=elementos.length
    let inicio=0
    let fin= elementos.length
    let arrFinal=elementos
    let contain= document.getElementById('contenedor_img')


    if(elementos.length>6){
       inicio= Math.floor(Math.random() *(numeroElementos-6))
       fin= inicio+6
       arrFinal=elementos.slice(inicio, fin)
   }

    console.log(arrFinal.length)

    arrFinal.forEach(el=>{
        let link= iiif_url+'/'+el.image_id+'/full/380,/0/default.jpg'
        let titulo=el.title
        let id=el.id
        let desc
        if(el.thumbnail!=null){
            desc= el.thumbnail.alt_text  
        }else{
                desc= "Obra de arte sin descripcion, animate a verla"
        } 
        let contenido='<div class="col-lg-4 col-md-6 mb-4 animate__animated animate__rubberBand"">\
        <div class="card"> \
          <div \
            class="bg-image hover-overlay ripple" \
            data-mdb-ripple-color="light" \
          > \
            <img\
              class="img-fluid" \
              src="'+link+'"\
            />\
            <a href="#!">\
              <div\
                class="mask"\
                style="background-color: rgba(251, 251, 251, 0.15)"\
              ></div>\
            </a>\
          </div>\
          <div class="card-body">\
            <h5 class="card-title">'+titulo+'</h5>\
            <p class="card-text">\
              '+desc+'\
            </p>\
            <a id="'+id+'" href="#!" class="btn btn-primary botoncito"\
            data-mdb-toggle="modal"\
            data-mdb-target="#exampleModal">More</a>\
          </div>\
        </div>\
      </div>'
      contain.innerHTML+=contenido
    })
}

//rellena el carrusel con las imagene, colocando el src como atributo
function rellenarCarrusel(elementos, iiif_url){
    let numeroElementos=elementos.length
    let imagenes_carrusel= document.getElementsByClassName("d-block")
    for(let i=0; i<3; i++){

        let elemento =elementos[Math.floor(Math.random() * numeroElementos)]
        if(elemento.image_id!=null){
            let link_carrusel= iiif_url+'/'+elemento.image_id+'/full/380,/0/default.jpg'
            imagenes_carrusel[i].setAttribute('src', link_carrusel)
        }else{
            i--
        }

    }

}

//funcion que al dar click en un boton hace un fetch a la obra en especifico
function aparecerModal(tabla){
    let opciones=document.getElementsByClassName("lista_opcion")
    opciones.forEach(op=>{
        op.addEventListener('click', ()=>{
            let botones=document.getElementsByClassName('botoncito')
            botones.forEach(btn=>{
                btn.addEventListener('click', ()=>{
                    tabla.innerHTML=''
                    let id =btn.getAttribute('id')
                    llenarDescripcion(id)
                    llenarDashboard(tabla,id)
                })
            })
        })
    })
}

//llena los datos
function llenarDashboard(tabla, id){
    let url='https://api.artic.edu/api/v1/artworks/'+id

    fetch(url)
    .then(resp=> resp.json())
    .then(data =>{
        console.log(data.data.color)
        let h=data.data.color.h
        let l=data.data.color.l
        let s=data.data.color.s
        let percentage=data.data.color.percentage
        let percentage2=percentage*100
        percentage2=percentage2.toFixed()

        let arreglo=[h,s,l]

        //Hue
        let row1= document.createElement('tr')
        let th1=document.createElement('th')
        let td1=document.createElement('td')

        th1.setAttribute('scope','row')
        th1.innerText='Hue'
        td1.innerHTML='<span class="data">'+ h+'</span>'
        td1.setAttribute('style', '--size:'+ h/360+';--color: hsl('+h+','+s+'%,'+l+'%);')

        row1.appendChild(th1)
        row1.appendChild(td1)
        tabla.appendChild(row1)

        //Saturation
        let row2= document.createElement('tr')
        let th2=document.createElement('th')
        let td2=document.createElement('td')

        th2.setAttribute('scope','row')
        th2.innerText='Saturation'
        td2.innerHTML='<span class="data">'+ s+'</span>'
        td2.setAttribute('style', '--size:'+ s*0.01+';--color: hsl('+h+','+s+'%,'+l+'%);')

        row2.appendChild(th2)
        row2.appendChild(td2)
        tabla.appendChild(row2)

        //lightness
        let row3= document.createElement('tr')
        let th3=document.createElement('th')
        let td3=document.createElement('td')

        th3.setAttribute('scope','row')
        th3.innerText='lightness'
        td3.innerHTML='<span class="data">'+ l+'</span>'
        td3.setAttribute('style', '--size:'+ l*0.01+';--color: hsl('+h+','+s+'%,'+l+'%);')

        row3.appendChild(th3)
        row3.appendChild(td3)
        tabla.appendChild(row3)

        //lightness
        let row4= document.createElement('tr')
        let th4=document.createElement('th')
        let td4=document.createElement('td')

        th4.setAttribute('scope','row')
        th4.innerText='%'
        td4.innerHTML='<span class="data">'+percentage2+'</span>'
        td4.setAttribute('style', '--size:'+ percentage+';--color: hsl('+h+','+s+'%,'+l+'%);')

        row4.appendChild(th4)
        row4.appendChild(td4)
        tabla.appendChild(row4)
        
    })
}

function llenarDescripcion(id){
    let url='https://api.artic.edu/api/v1/artworks/'+id
    let body=document.getElementById('descripciones')
    fetch(url)
    .then(resp=> resp.json())
    .then(data =>{
        data= data.data
        let artista= data.artist_display
        let date_display=data.date_display
        let lugar_origen=data.place_of_origin
        body.innerHTML='<p><strong>Author: </strong>'+artista+'</p>\
        <p><strong>Date display: </strong>'+date_display+'</p>\
        <p><strong>Place of origin: </strong>'+lugar_origen+'</p>\
        '
        console.log(id)
    })
}

