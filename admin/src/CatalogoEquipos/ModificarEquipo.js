
const url = window.location.search
const par = new URLSearchParams(url)
console.log(url.includes('id'));


if (url.includes('id')) {

    console.log(url);
    
    
    const btnAceptar = document.getElementById('finalizar')

    btnAceptar.setAttribute('onclick', 'ModificarEquipo(this); ')
    btnAceptar.innerText = 'Guardar'

    const currentURL = new URLSearchParams(url)

    const inputIMG = document.getElementById('image')

    inputIMG.setAttribute('onchange', `SubirImagenes(${par.get('id')}, event)`)
    

    MostrarEquipo(currentURL.get('id'))
}

async function MostrarEquipo(params) {
    
    const response = await fetch('/auth/mostrarEquipos')
    const data = await response.json()

    console.log(params);

    console.log(data);
    
    
    const equipo = data.find(obj => obj.id == params)

    console.log(equipo);
    

    console.log(equipo.nombre);

    const nombre = document.getElementById('nombre')
    console.log(nombre);
    nombre.value = equipo.nombre

    const respuestaLogo = await fetch('/auth/obtenerLogo?id=' + params)
    const rutaLogo = await respuestaLogo.json()

    console.log(rutaLogo);
    

    const archivo = { files: rutaLogo }

   
    
    MostrarImagenExistente(archivo)

}


async function ModificarEquipo(params) {
    
    try {

        const nombre = document.getElementById('nombre')
        const id = new URLSearchParams(url).get('id')

        console.log(nombre);
        console.log(id);
        
        
        
        const response = await fetch(`/auth/modificarEquipo?name=${nombre.value}&id=${id}`)
        const data = await response.json()

        alert(data.message)

        if (data.res && data.res == true) {
            window.parent.location = '/catalogoequipos'
        }

    } catch (error) {
        console.log(error);
        
    }
}

function ActualizarIMG(params, event) {
    
    const lista = document.getElementById('imagenes')

    if (lista.childNodes != 1) {
      
        lista.innerHTML = ""
    } 

    const currentURL = new URLSearchParams(url)

    console.log(currentURL.get('id'));
    


}

function MostrarImagenExistente(params) {
    
    const existente = document.getElementById('logo')

    console.log(params);
    

    if (existente) {
        
        existente.setAttribute('nombre', params.files[0])
        
        const img = document.querySelector('img')
        img.src = '/img/logos/' + params.files[0].name

    } else if(params.files.length > 0) {

        console.log('holo');
        

        const fila = document.createElement('li')
        fila.id = 'logo'
        fila.classList.add('fila')

        fila.setAttribute('nombre', params.files[0])

        const label = document.createElement('label')

        const img = document.createElement('img')
        img.src = '/img/logos/' + params.files[0].name

        img.style = 'max-width: 70px;'

        const btn = document.createElement('button')
        btn.textContent = 'eliminar'

        label.appendChild(img)
        label.appendChild(btn)

        
        fila.appendChild(label)
        btn.setAttribute('onclick', 'BorrarImagen(event, this)')

        const lista = document.getElementById('imagenes')
        lista.appendChild(fila)
        
        //lista.appendChild(fila)
    }

    inpuImage = params.files[0]
}

function EliminarIMG(params) {
    
    

    EliminarImagen()
}

