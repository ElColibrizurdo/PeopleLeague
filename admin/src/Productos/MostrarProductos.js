

async function mostrar_productos() {

    let imagenes

    try {
        const responseIMG = await fetch('/auth/obtenerListaIMG?path=' + window.location.pathname)
        const dataIMG = await responseIMG.json()
        imagenes = dataIMG

        console.log(dataIMG);
    } catch (error) {
        console.log(error);
        
    }
    
    const lista = document.querySelector('.div_scroll')

    lista.replaceChildren();

    try {

        const filtro = {
            'Todo': '00',
            'Nombre' : '01',
            'Categoria': '10'
        }

        const orden = document.querySelector('.selecion_a').textContent

        const busqueda = document.querySelector('.buscador')
        
        

        console.log(filtro[document.querySelector('.selecion_a').textContent]);
        
        const response = await fetch(`/auth/mostrarProductos?id=0&filtro=${filtro[document.querySelector('.selecion_a').textContent]}&busqueda=${busqueda.value}`)
        const data = await response.json()

        const cantidad = document.querySelector('.cantidad')
        cantidad.textContent = `(${data.length})`

        

        

        data.forEach(element => {
            console.log(element);

            let estado = (element.estado == 0?'Agotado':(element.estado == 0?'Disponible':'PreBventa'))

            let carta

            let directorio = imagenes.find(item => item.includes(`${element.id}.`))
            console.log(directorio);
            

            if (window.location.toString().indexOf('/productos')>0) {

                carta = `
                <div id="${element.id}" class="row cart">
                    <div class="col-1">
                        <!-- <label class="checkBox_filtro"><input name="radio" type="checkbox"><div class="transition_checkbox"></div></label> -->
                        <svg class="col" xmlns="http://www.w3.org/2000/svg" onclick="cambiarClase_eliminar('${element.id}')" width="24" height="24" viewBox="0 0 24 24"   fill="#6F6D6D">
                            <mask id="mask0_2039_18386" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" />
                            </mask>
                            <path d="M6.93398 21.2033C6.30432 21.2033 5.76773 20.9816 5.32423 20.5381C4.88073 20.0946 4.65898 19.558 4.65898 18.9283V6.06582H3.52148V3.79082H8.86223V2.65332H15.1252V3.79082H20.478V6.06582H19.3405V18.9283C19.3405 19.558 19.1187 20.0946 18.6752 20.5381C18.2317 20.9816 17.6952 21.2033 17.0655 21.2033H6.93398ZM17.0655 6.06582H6.93398V18.9283H17.0655V6.06582ZM8.89223 16.9941H11.0297V7.99407H8.89223V16.9941ZM12.9697 16.9941H15.1072V7.99407H12.9697V16.9941Z" />
                        </svg>
                        <img src="/img/articulos/${directorio}" alt="alt"  onerror="error_imagen(this);"/>
                    </div>
                    <div class="col contendor_cart_nombre">
                        <a href="/agregarProducto?idProducto=${element.id}">${element.descripcion}</a>
                    </div>
                    <div class="col"><h2>$${element.precio}</h2></div>
                    <div class="col"><h2>${element.tipoNombre}</h2></div>
                    <div class="col"><h2>${element.variantes} Colores</h2></div>
                    <div class="col"><h2>${element.equipoNombre}</h2></div>
                    <div class="col"><h2>${element.jugadorNombre}</h2></div>
                    <div class="col"><h2>${estado}</h2></div>
                    <div class="col"><h2>${element.id}000000000M</h2></div>
                        
                </div>
                `
            } else if (window.location.toString().indexOf('/inventario')>0) {

    
            }
            
             lista.innerHTML += carta
        });


    } catch (error) {
        console.log(error);
        
    }
}


function error_imagen(imagen) {
    imagen.onerror = "";
    imagen.src = "/img/sin_img.png";
    return true;
}


async function Acciones(params) {
    
    if (params.value === 'editar') {
        
        

    } else if (params.value === 'eliminar') {

        console.log(params.parentNode.getAttribute('lista'));
        
        
        const response = await fetch('/auth/eliminarProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: params.parentNode.getAttribute('lista')
            })
        })

        const data = await response.json()
        console.log(data.affectedRows);

        if (data.affectedRows == 1) {
            
            params.parentNode.remove()
        }
        
    }
}

async function Eliminar(id) {
    
    const carta = document.querySelectorAll('.cart')

    carta.forEach(async element => {

        if (element.getAttribute('id') == id) {
            
            const response = await fetch('/auth/eliminarProducto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: element.getAttribute('id')
                })
            })
    
            const data = await response.json()
            console.log(data.affectedRows);
    
            if (data.affectedRows == 1) {
                
                element.remove()
            }
        }
        
    })
}
