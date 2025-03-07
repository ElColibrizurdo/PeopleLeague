


const params = new URLSearchParams(window.location.search)
const id = params.get('id')

console.log(id);

var  contador = 1
const label_contador = document.querySelector('.label-cantidad')
label_contador.value = contador


async function Obtener_producto() {
    
    try {

        const response = await fetch('/auth/producto', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        const data = await response.json();

        console.log(data);

        Mostrar_Producto(data)
        document.dispatchEvent(new Event('codigoTerminado'));

    } catch (error) {
        console.log(error);
    }
    
}

async function addProductoRelacionado(idProducto){

    try{
        const response = await fetch('/auth/tipoProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idProducto })
        })

        const data = await response.json()
        console.log(data);

        //const cont_prodRelacionados = document.querySelector('.contenedor_recomendados')
        const cont_prodRelacionados = document.getElementById('id_grupo_cartas_recomendados')
        cont_prodRelacionados.innerHTML = ""

        data.tipoProducto.forEach(element=>{
            console.log(element.descripcion)

            CrearCards(element, cont_prodRelacionados)
/*
             //Carta para mostrar los productos
             const card = document.createElement('div')
             card.href = '/canasta?id=' + element.id 
             card.classList.add('carta')

             //Contenedor estado del producto
             const div_estado = document.createElement('div')
             div_estado.classList.add('carta_estado')

             const linea = document.createElement('a')

             if (element.estado == 0) {
                  linea.innerText = 'Preventa'
             } else if (element.estado  == 1) {
                 
                  linea.innerText = 'En Stock'
             } else {

                  linea.innerText = 'Agotdo'
             }

             div_estado.appendChild(linea)

             //Imagen del producto
             const img = document.createElement('img')
             img.classList.add('img_carta')
             img.src = '/img/articulos/' + element.id + '.png'

             console.log(img.src)

             //Parte texto de la carta
             const card_text = document.createElement('div')
             card_text.classList.add('txt_carta')


             const card_body = document.createElement('div')
             card_body.classList.add('txt_carta_1')

             const label_name = document.createElement('a')
             label_name.href = '/canasta?id=' + element.id
             label_name.innerText = element.descripcion

             card_body.appendChild(label_name)

             //Contenedor del precio y like
             const card_footer = document.createElement('div')
             card_footer.classList.add('txt_carta_2')

             const label_costo = document.createElement('a')
             label_costo.innerText = "$"+element.precio+" MX"

             //Like en forma  de corazon
            const lbl = document.createElement('label')
            lbl.classList.add('container_corazon')

            const chkbox_deseo = document.createElement('input')
            chkbox_deseo.type = 'checkbox'
            chkbox_deseo.setAttribute('number', element.id)
            chkbox_deseo.setAttribute('onchange', 'DarLike(this)')
            chkbox_deseo.classList.add('productos')

            const svgContent = `
                            <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                            </svg>
                        `;

            lbl.appendChild(chkbox_deseo)
            lbl.innerHTML += svgContent

             card_footer.appendChild(label_costo, chkbox_deseo)
             card_footer.appendChild(lbl)

             card_body.appendChild(label_name)

            card_text.appendChild(card_body)
            card_text.appendChild(card_footer)

             card.appendChild(div_estado)
             card.appendChild(img)
             card.appendChild(card_text)
             card.setAttribute('tipo', element.idTipo)
             card.setAttribute('equipo', element.idEquipo)

             cont_prodRelacionados.appendChild(card)
             */

        })
        
//        if (data.ok) {
            console.log('addProductoRelacionado:' + data.tipoProducto.length);
 //       }


        EjecutarScripts()

    }
    catch(error){
        console.log(error);
    }
}

async function Mostrar_Producto(data) {

    console.log( data);
    


    const producto = data.producto[0][0]
    

    const label_nombre = document.getElementById('label-nombre')
    const label_precio = document.getElementById('label-precio')

    label_nombre.innerText = producto.descripcion
    label_precio.innerText = "$" + producto.precio + " MXN"
    label_precio.setAttribute('precio', producto.precio)

    const btn_agregar = document.querySelector('.btn_pedido')
    btn_agregar.innerText = 'Agregar al carrito - Total ' + producto.precio

    const response = await fetch('/auth/recuperarImagenes?id=' + producto.id)
    const images = await response.json()
    const imagesS = document.querySelector('.img_secundarias')

    let img = `<img src="/img/articulos/${images[0]}" class="img-principal img-secundaria selecta" alt="alt"/>`
    
    
    images.forEach((element, indice) => {
        
        console.log(element);
        

        const img = `<img src="/img/articulos/${element}" class="img-principal img-secundaria" alt="alt"/>`

        imagesS.innerHTML += img
    })

    const imgP = document.querySelector('.img-principal')
    imgP.src = '/img/articulos/' + images[0]

    console.log(producto);
    

    if (data.medidas) {
        
        Mostrar_Medidas(data.medidas)
    }

    if (data.color) {
        
        MostrarColores(data.color[0])   
    }

    // if (producto.idTipo != 9) {
        
    //     const divPersonalizar = document.querySelector('.contendor_descripcion_producto_pedido_talla')
    //     const divPersonalizar2 = document.querySelector('.contenedor_descripcion_producto_pedido_personalizacion_nombre')
    //     divPersonalizar.remove()
    //     divPersonalizar2.remove()
    // }
}

function MostrarColores(colores) {
    
    const contenedor_colores = document.querySelector('.contenedor_descripcion_producto_color')
    const subcontenedor = contenedor_colores.querySelector('.radio-tile-group_selector_color')
    console.log(contenedor_colores);
    
    colores.forEach(element => {        

        const talla = `

        <div class="input-container_selector_color">
            <input id="${element.id}"  class="radio-button_selector_color" type="radio" name="radio">
            <div class="radio-tile_selector_color">
                <div class="circulo_interno" style="background-color:${element.color}"></div>
            </div>
        </div>  `
        
        subcontenedor.innerHTML += talla
    })
}

function MostrarMedidas(colores) {
    console.log('los colores son ');
    
    //const contenedor_ul = document.querySelector('.contenedor_descripcion_producto_color')
    const subcontenedor = document.getElementById('medidas') //.querySelector('.radio-tile-group_selector_color')
    console.log(contenedor_ul);
    
    colores.forEach(element => {        

        const elem = `

        <div class="input-container_selector_color">
            <input id="${element.id}"  class="radio-button_selector_color" type="radio" name="radio">
            <div class="radio-tile_selector_color">
                <div class="circulo_interno" alt="${element.id}">${element.nombre +' '+ element.descripcion}</div>
            </div>
        </div>  `
        
        subcontenedor.innerHTML += elem
    })
}

function Contador(boton) {

    console.log(boton.getAttribute('value'));
    
    try {
        if (boton.getAttribute('value') == '+') {
        
            contador+=1
            AgregarCollapse(contador)
        } else if (boton.getAttribute('value') == '-' && contador != 1) {
            
            contador-=1
            console.log('Hola');
            
            QuitarCollapse(contador)
        }
    } catch (error) {
        
    }
    
    console.log(contador);
    
    label_contador.value = contador
}

function parseJwts (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function Mostrar_Medidas(medidas) {
    
    const contenedor_tallas = document.querySelector('.radio-tile-group')
    console.log(contenedor_tallas);
    

    medidas.forEach(element => {

        console.log(element);
        

        const talla = `
        <div class="input-container">
            <input id="${element.id}" class="radio-button" type="radio" name="radio${contador}">
            <div class="radio-tile">
                <label or="btnradio${element.id}" class="radio-tile-label">${element.nombre}</label>
            </div>
        </div>`
        
        contenedor_tallas.innerHTML += talla
    })
    
}

function AgregarCollapse(contador) {

    if (contador != 1) {
        
        const secTallas = document.querySelector('.contendor_descripcion_producto_pedido_talla')
        const secColores = document.querySelector('.contenedor_descripcion_producto_color')
        const seccion = document.querySelector('.contenedor_descripcion_producto_pedido_personalizacion')
        const conte = document.querySelector('#contenedor_personalizar')
        //const nuevoTallas = secTallas.cloneNode(true)
        //const nuevoColores = secColores.cloneNode(true)
        const nuevo = seccion.cloneNode(true)
        const nuevoTallas = nuevo.querySelector('.contendor_descripcion_producto_pedido_talla')
        const nuevoColores = nuevo.querySelector('.contenedor_descripcion_producto_color')

        const a = nuevo.querySelector('.btn_personalizacion')
        a.setAttribute('data-bs-target' , '#contenedor_personalizacion' + contador)

        const collapse = nuevo.querySelector('#contenedor_personalizacion')
        collapse.id = "contenedor_personalizacion" + contador

        const inputTallas = nuevoTallas.querySelectorAll('input')

        inputTallas.forEach(element => {

            element.name = 'radio' + contador
        })

        const inputColores = nuevoColores.querySelectorAll('input')

        inputColores.forEach(element => {

            element.name = 'radioColor' + contador
        })

        conte.appendChild(nuevo)
    }
}

function QuitarCollapse(contador) {
    console.log('Hola');
    
    
    const contendor = document.getElementById('contenedor_personalizar')
    console.log(contador);
    
    const hijos = contendor.childNodes
    console.log(hijos);
    
    //for (let i = 1; i < 4; i++) {
        
    
        const ultimo_hijo = hijos[hijos.length - 1]
        console.log(ultimo_hijo);
        
        ultimo_hijo.remove()
        
    //}
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

Obtener_producto()
addProductoRelacionado(id)
async function EjecutarScripts() {
    
    console.log('Se va a ejecutar');
    
    await Poner_Likes('./Poner_Likes.js')
}


const token = sessionStorage.getItem('authToken')

//const traduccion = parseJwts(token)

//console.log(traduccion);

const btn_ingresar = document.getElementById('btn-ingresar')

//btn_ingresar.innerText = traduccion.user.name

// document.querySelector('.atras').addEventListener('click', function () {
    
//     history.back()
    
// })

// document.querySelector('.atras').addEventListener('click', function () {
    
//     history.back()
// })

function Derecha() {
    

    console.log(document.querySelectorAll('.img-secundaria'));
 
    const imagenes = document.querySelectorAll('.img-secundaria')
 
    for (let i = 0; i < imagenes.length; i++) {
     const element = imagenes[i]
     if (element.classList.contains('selecta')) {
         
         const img = document.querySelector('.img-principal')
 
         if (i == 3) {
             img.src = imagenes[0].src
             imagenes[0].classList.add('selecta')
         } else {
             img.src = imagenes[i+1].src
             imagenes[i + 1].classList.add('selecta')
         }
 
         
         element.classList.remove('selecta')
         break;
     }
    }  
     
 }
 
 function izquierda() {
     
     console.log(document.querySelectorAll('.img-secundaria'));
 
    const imagenes = document.querySelectorAll('.img-secundaria')
 
    for (let i = 0; i < imagenes.length; i++) {
     const element = imagenes[i]
     if (element.classList.contains('selecta')) {
         
         const img = document.querySelector('.img-principal')
 
         if (i == 0) {
             img.src = imagenes[imagenes.length-1].src
             imagenes[imagenes.length-1].classList.add('selecta')
         } else {
             img.src = imagenes[i-1].src
             imagenes[i - 1].classList.add('selecta')
         }
 
         
         element.classList.remove('selecta')
         break;
     }
    }  
 }