console.log(window.location.href);

let cantiadCartas = 16

let arrayPrincipal = []

function obtener_productis(tipos, equipos, stock, equipos2, buscador, minMax) {
    console.log("obtener_productis(): ");
    console.log(minMax);
    

    const btnGroup = document.querySelector('input[name="radio"]:checked').parentNode
    console.log(btnGroup);
    
    const index = btnGroup.querySelector('.radio-tile-label').textContent
    console.log(index);

    let buscar = '%'
    if (buscador.length>0){
        buscar = '%' + buscador + '%'
    } else {
        buscar = '%'
    }
    console.log(buscar);

    arrayPrincipal = []
    
    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tipos, equipos, stock, equipos2, buscar, minMax, index})
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            CrearCard(data, index)
        })

        //if (equipos2[1]==undefined)
            // document.getElementById("filtroSelecc").innerHTML = '';
        //else
        //    document.getElementById("filtroSelecc").innerHTML = equipos2[1];

}

function EncontrarIMGLista(lista, id) {
    return lista.reduce((prev, curr) =>
        Math.abs(curr - `${id}.`) < Math.abs(prev - `${id}.`) ? curr : prev
    )
}

async function CrearCard(data, index) {

    console.log('Vamos a ver la lista de imagnes ');
    

    const listaR = await fetch('/auth/obtnerListaIMG')
    const listaIMG = await listaR.json()



    var contador = 0
    var arrauNuevo = []
    
    data.forEach(async (element, indice) => {
        
        console.log(listaIMG.find(item => item.startsWith(`${element.id}.`)));    
        
        const nombreIMG = listaIMG.find(item => item.startsWith(`${element.id}.`))

        // const card = `

        //     <div class="carta" tipo="4" equipo="3"><a href="/canasta?id=${element.id}" class="link"><div class="contenedor_img_carta"><img class="img_carta" src="/img/articulos/10.png"></div><div class="div_txt_carta"><div class="txt_carta"><div class="txt_carta_1"><p title="Playera Roja">Playera Roja</p></div><div class="txt_carta_2"><p>100.00</p><label class="container_corazon"><input type="checkbox" alt="10" number="10" title="10" class="productos" onchange="DarLike(this)" onclick=" validaSesionLike(this); ">
        //     <svg id="Layer_1" onclick=" cambiar_iniciar_sesion(10) " version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        //     <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path></svg>
        //     </label></div></div></div></a></div> `

        contador += 1

        //Carta para mostrar los productos
        const card = document.createElement('div')
        card.href = '/canasta?id=' + element.id 
        card.classList.add('carta')

        //Link
        const link = document.createElement('a')
        link.href = '/canasta?id=' + element.id
        link.classList = 'link'

        card.appendChild(link)

        const linea = document.createElement('a')

        /*
        //Contenedor estado del producto
        const div_estado = document.createElement('div')
        div_estado.classList.add('carta_estado')
        if (element.estado == 0) {             linea.innerText = 'Preventa'        } 
        else if (element.estado  == 1) {         linea.innerText = 'Disponible'      } 
        else {             linea.innerText = 'Agotado'        }
        div_estado.appendChild(linea)
        */

        //Imagen del producto
        const divimg = document.createElement('div')
             divimg.classList.add('contenedor_img_carta')

        const img = document.createElement('img')
        img.classList.add('img_carta')
        img.src = '/img/articulos/' + nombreIMG

        //Parte texto de la carta
        const card_div_text = document.createElement('div')
        card_div_text.classList.add('div_txt_carta')

        const card_body = document.createElement('div')
        card_body.classList.add('txt_carta')

        //Contenedor del nombre
        const contenedor_nombre = document.createElement('div')
        contenedor_nombre.classList.add('txt_carta_1')

        const label_name = document.createElement('p')
        label_name.href = '/canasta?id=' + element.id
        label_name.innerText = element.descripcion
        label_name.title = element.descripcion

        contenedor_nombre.appendChild(label_name)

        //Contenedor del precio y like
        const card_footer = document.createElement('div')
        card_footer.classList.add('txt_carta_2')

        const label_costo = document.createElement('p')
        label_costo.innerText = element.precio

        //Like en forma  de corazon
        const lbl = document.createElement('label')
        lbl.classList.add('container_corazon')

        const chkbox_deseo = document.createElement('input')
        chkbox_deseo.type = 'checkbox'
        chkbox_deseo.setAttribute('alt', element.id)
        chkbox_deseo.setAttribute('number', element.id)
        chkbox_deseo.setAttribute('title', element.id)
        chkbox_deseo.classList.add('productos')
        chkbox_deseo.setAttribute('onchange', 'DarLike(this)')
        chkbox_deseo.setAttribute('onclick', ' validaSesionLike(this); ')

        const svgContent = `
            <svg id="Layer_1"  onclick=" cambiar_iniciar_sesion(`+element.id+`) " version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path></svg>
                                      `;

        lbl.appendChild(chkbox_deseo)
        lbl.innerHTML += svgContent

        card_footer.appendChild(label_costo)
        card_footer.appendChild(lbl)

        card_body.appendChild(contenedor_nombre)
        card_body.appendChild(card_footer)

        //link.appendChild(div_estado)
        divimg.appendChild(img)
        link.appendChild(divimg)
        card_div_text.appendChild(card_body)
        link.appendChild(card_div_text)
        card.setAttribute('tipo', element.idTipo)
        card.setAttribute('equipo', element.idEquipo)

        arrayPrincipal.push(card)
        

    })
    ImprimirProductos(arrayPrincipal, index)
}

function ImprimirProductos(array, numero) {



    const container = document.getElementById('gridContainer')  //.querySelector('.grupo_cartas')
    // const pagination = document.querySelector('.radio-tile-group')

    container.innerHTML = ''
    // pagination.innerHTML = ''
    
    array.forEach((element, indice) => {

        // if (indice == numero) {
            
        //     element.forEach(element => {

        //         container.appendChild(element)
        //     })
        // }

        // const button = document.createElement('a')
        // button.classList.add('pag_num')
        // button.textContent = indice + 1
        // if (indice == numero) {
        //     button.classList.add('selected')
        // }
        // button.onclick = function () {
            
        //     CambiarPagina(this)
        // }
        // pagination.appendChild(button)

        // localStorage.setItem('indice', numero)
        // button.classList.add

        container.appendChild(element)
        EjecutarScripts()
    })

    
    ManejarNavegacion(numero)

}


async function ManejarNavegacion(numero) {

    const pagination = document.querySelector('.radio-tile-group')
    pagination.innerHTML = ''

    const response = await fetch(`/auth/cantidadProductos`)
    const data = await response.json()

    numero = numero - 1
    console.log(data);
    console.log(numero);
    
    
    const cantidadP = Math.ceil(data[0].cantidad / 16)

    console.log(cantidadP);

    for (let i = 0; i < cantidadP; i++) {

        const element = i + 1;
        let checado = ''

        if (i == numero) {
            checado = 'checked'
        }

        const btn = `
        <div class="input-container">
            <input class="radio-button" type="radio" name="radio" ${checado}>
            <div class="radio-tile">
                <label  class="radio-tile-label">${element}</label>
            </div>
        </div> `

        pagination.innerHTML += btn

        localStorage.setItem('indice', numero)
    }

    const btnPaginacion = document.querySelectorAll('input[name="radio"]')

    console.log(btnPaginacion)

    btnPaginacion.forEach(element => {
        console.log(element);
        
        element.addEventListener('click', (event) => {
            console.log(element);
            
            CambiarPagina(element)
        })
    })
}

async function EjecutarScripts() {
    
    await Poner_Likes('../JS/Poner_Likes.js')
}

function CambiarPagina(boton) {
    
    // const paginas = document.querySelectorAll('.pag_num')
    // const paginasArray = Array.from(paginas)
    
    // const pagina = document.querySelector('.selected')
    
    // const indi = paginasArray.indexOf(pagina)
    
    // if (boton.childNodes.length != 1) {

    //     console.log('Hola');
        
    //     const indice = parseInt(localStorage.getItem('indice'))
        
    //     if (boton.getAttribute('aria-label') == 'Next' && (arrayPrincipal.length - 1) != indice ) {
        
    //         paginas
    //         ImprimirProductos(arrayPrincipal, indice + 1 )
            
    //     } else if (boton.getAttribute('aria-label') == 'Previous' && indice != 0) {
            
    //         ImprimirProductos(arrayPrincipal, indice - 1 )          
    //     } 
    // } else {

    //     ImprimirProductos(arrayPrincipal, parseInt(boton.textContent)-1)
    // }


    console.log(boton);
    
    const barra = window.document.querySelector('.buscador')

    FiltrarDatos(barra)
    
 } 

function FiltrarDatos(buton) {

    var arrayEquipos = []
    var arrayEquipos2 = []
    const arrayTipos = []
    var arrayStocks = []
    var arrayFiltrado = ''
    var minMax = []

    const filtros = document.querySelectorAll('input[type="checkbox"]:checked')

    const titulo = document.querySelector('.titulo')

    document.getElementById("filtroSelecc").innerHTML = ' '; //buton.title;
    document.getElementById("filtroSelecc").title = buton.title;
    document.getElementById("filtroSelecc").value = buton.value;

    console.log(buton);
    console.log(filtros);
    

    if (buton.classList[1] == 'equipos') {
        
        arrayEquipos.push(buton.getAttribute('value'))
        arrayEquipos2.push(buton.title)
        console.log(buton.getAttribute('alt'));
        //titulo.textContent = buton.getAttribute('alt')
    }
    
    filtros.forEach(chk => {

        let existe = arrayEquipos.filter(item => item == chk.value). length > 0
        
        if (chk.classList == 'equipos' && !existe) {
            
            arrayEquipos.push(chk.value)
            arrayEquipos2.push(buton.title)
            
            console.log(chk);
            
            console.log(chk.parentNode.previousSibling);
            
            //titulo.textContent = chk.parentNode.previousSibling.textContent

        } else if (chk.classList == 'tipo') {
            
            arrayTipos.push(chk.value)

        } 
        
        if (chk.classList == 'stock') {

            arrayStocks.push(chk.value)
        }

        if (buton.id=='id_buscar'||buton.id=='id_buscarNav')
        {
            arrayFiltrado = buton.value
        } else {
            buton = ''
        }
            
    })

    
//    if (buton.id=="range-min" || buton.id=="range-max") 
    minMax.push(document.getElementById("range-min").value)
    minMax.push(document.getElementById("range-max").value)   

    console.log(arrayEquipos);
    console.log(minMax);
    

    obtener_productis(arrayTipos, arrayEquipos, arrayStocks, arrayEquipos2, arrayFiltrado, minMax )

}

function validaSesionLike(c) {
    const sesion = localStorage.getItem('sesion')

    if (document.getElementById('perfil').innerHTML.trim() == 'INGRESAR'
     || document.getElementById('perfil-nav').innerHTML.trim() == 'INGRESAR') {

        var div = document.getElementById("id_modal_iniciar_sesion_like");

        div.classList.add("abrir_modal");
        div.style.setProperty('--before-z-index', '0');
        div.style.overflowY = 'auto';

        const params = new URLSearchParams(window.location.search)
        window.parent.location.href = '/login?canasta=' + params.get('id') + '&numero=' +  sessionStorage.setItem('like', c.getAttribute('number'))       

        /*
if (sesion==null) {
document.getElementById('perfil').innerHTML=='INGRESAR'
            || document.getElementById('perfil-nav').innerHTML=='INGRESAR'

const status = confirm('Para agregar a la canasta se necesita ingresar');
      console.log(c)
      if (status) {
        const params = new URLSearchParams(window.location.search)
        window.parent.location.href = '/login?canasta=' + params.get('id') + '&numero=' +  sessionStorage.setItem('like', c.getAttribute('number'))       
      }
*/
      c.checked = false

      return false;
    }else{
      return true;
    }
  
  }

async function DarLike(boton) {
    
    const number =  boton.getAttribute('number')
    const sesion = localStorage.getItem('sesion')
    let estado 
    

    if (boton.checked) {
        estado = 0
    } else {
        estado = 1
    }

    try {
        
        const response = await fetch('/auth/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number,  sesion, estado})
        })

        const data = await response.json()
        
        if (data.ok) {
            console.log('To salio bien');
        }

    } catch (error) {
        console.log(error);
    }
}

function Buscar(params) {
    
    const barra = window.parent.document.querySelector('.buscador')
    
    barra.addEventListener('keyup', async function(event) {
        
        //if (event.key === 'Enter' || event.keyCode === 13) {
            
            console.log(barra.value);
            
            FiltrarDatos(barra)
        //}
    })
    console.log(params.value);
}

function CambiarVistaCartas(params) {
    
    const grupo = document.getElementById('gridContainer')  // document.querySelector('.grupo_cartas')
    const cartas = document.querySelectorAll('.carta')

    let columnas
    let filas 
    let tamanioColumnas
    let tamanioFilas
    let carta
    let buscardor

    if (params == 3) {
        
        columnas = 3
        filas = 3
        tamanioColumnas = '400'
        tamanioFilas = '525'
        cantiadCartas = 9
        carta = 3

    } else if (params == 4) {
        
        columnas = 4
        filas = 4
        tamanioColumnas = '300'
        tamanioFilas = '420'
        cantiadCartas = 16
        carta = 4
    } else if (params == 2) {
        
        columnas = 2
        filas = 2
        tamanioColumnas = '300'
        tamanioFilas = '420'
        cantiadCartas = 4
        carta = 2
    }

    console.log(arrayPrincipal);
    

    grupo.style.gridTemplateColumns = `repeat(${columnas}, ${tamanioColumnas}px)`
    grupo.style.gridTemplateRows = `repeat(${filas}, ${tamanioFilas}px)`

    arrayPrincipal.forEach(element => {
        
        element.forEach(card => {

            card.className = ""
            card.className = `carta${carta}`
            console.log(card);
            
        })


        console.log(element);
    })
    
}

arrayTipo = []
arrayEquipo = []
arrayEquipo2 = []
arrayStock = []
buscardor = ''
minMax = []

window.addEventListener('DOMContentLoaded', (event) => {
    sessionStorage.setItem('pag', '/tienda')

    const url = new URLSearchParams(window.location.search)

    console.log(url.get('equipo'));
    

    if (url.get('equipo')) {
        
        arrayEquipo.push(url.get('equipo'))
        arrayEquipo2.push(url.get('equipoNombre'))
                
        document.getElementById("filtroSelecc").innerHTML = url.get('equipoNombre');
    }

    obtener_productis(arrayTipo, arrayEquipo, arrayStock, arrayEquipo2, buscardor, minMax)


})


