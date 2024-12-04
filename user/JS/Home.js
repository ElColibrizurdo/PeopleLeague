const saltos = [0,0,0]
const contador = 5


async function Clasificaciones(btn) {
 
   

    const response = await fetch(`/auth/filtros?producto=%camiseta%&saltos=${saltos}`)
    const data = await response.json()

  
    
    
    MostrarProductos(btn, data)
    
    
}

async function EjecutarScripts() {
    
    
    await Poner_Likes('../JS/Poner_Likes.js')
}

function Salto(params) {
 
    const botones = document.querySelectorAll('.radio-button')

    botones.forEach((element, indice) => {

        if (element.checked) {
            
            if (params == '-') {
                
                if (saltos[indice] == 0) {
                    
                    saltos[indice] = 2
                    Clasificaciones(element)
                } else {

                    saltos[indice] -= 1
                    Clasificaciones(element)
                }
            } else {
                console.log('adelante   ');

                if (saltos[indice] == 2) {
                    
                    saltos[indice] = 0
                    Clasificaciones(element)
                } else {

                    saltos[indice] += 1
                    Clasificaciones(element)
                }
            }
        }
    })
}

function MostrarProductos(params, data) {

    //const contenedor_recomendados = document.querySelector('.grupo_cartas_recomendaciones')
    const contenedor_recomendados = document.getElementById('id_grupo_cartas_recomendaciones')
    contenedor_recomendados.innerHTML = ' '
    

    switch (params.classList[1]) {
        case "0":
            
            data.productos.forEach(element => {
                CrearCards(element, contenedor_recomendados)
            })

            
            //contenedor_recomendados.setAttribute('p', pRecomendados)
            break;
        case "1":
            data.masVendidos.forEach(element => {
                CrearCards(element, contenedor_recomendados)
            })
            //contenedor_recomendados.setAttribute('v', pRecomendados)
            break;
        case "2":
            data.preventa.forEach(element => {
                CrearCards(element, contenedor_recomendados)
            })
            //contenedor_recomendados.setAttribute('pr', pRecomendados)
            break;
    
        default:
            data.productos.forEach(element => {
                CrearCards(element, contenedor_recomendados)
            })
            //contenedor_recomendados.setAttribute('p', pRecomendados)
            break;
    }

    
    EjecutarScripts()
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
        }

    } catch (error) {
        console.log(error);
    }
}

function FiltrarDatos(boton) {
    
    
    window.location.href = `/tienda?equipo=${boton.getAttribute('value')}&equipoNombre=${boton.getAttribute('title')}`
}

const boton = document.querySelector('.radio-button')
Clasificaciones(boton)