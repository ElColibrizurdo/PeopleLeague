
const url = window.location.search

console.log(url.includes('id'));


if (url.includes('id')) {

    console.log(url);
    
    
    const btnAceptar = document.getElementById('finalizar')

    btnAceptar.setAttribute('onclick', 'ModificarEquipo(); ')

    const currentURL = new URLSearchParams(url)

    const inputIMG = document.getElementById('image')

    inputIMG.setAttribute('onchange', 'ActualizarIMG(this, event)')

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
    

    const respuestaLogo = await fetch('/auth/obtenerLogo?id=' + params)
    const rutaLogo = await respuestaLogo.json()

    console.log(nombre);

    const archivo = { files: rutaLogo }

    nombre.value = equipo.nombre
    
    MostrarImagenExistente(archivo)

}


async function ModificarEquipo(params) {
    
    try {

        const nombre = document.getElementById('nombre')
        const id = new URLSearchParams(url).get('idEquipo')
        
        const response = await fetch(`/auth/modificarEquipo?name=${nombre.value}&id=${id}`)
        const data = await response.json()

        console.log(data);
        ActualizarIMG(id)
        cerrarPage()

    } catch (error) {
        console.log(error);
        
    }
}

function ActualizarIMG(params, event) {
    
    // console.log(nombre);
    // console.log(inpuImage);
    
    // const formData = new FormData()
    // formData.append('id', nombre)
    // formData.append('images', inpuImage)

    // fetch('/upload?equipo', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.text())  // Si esperas texto en la respuesta
    // .then(result => {
    //     console.log('Resultado:', result);  // Imprimir el resultado del servidor
    //     // Aquí puedes manejar la respuesta, por ejemplo mostrar la imagen subida:
    //      // Mostrar la URL de la imagen
    //      cerrarPage()
    // })
    // .catch(error => {
    //     console.error('Error al subir la imagen:', error);
    // });

    const lista = document.getElementById('imagenes')

    if (lista.childNodes != 1) {
      
        lista.innerHTML = ""
    } 

    const currentURL = new URLSearchParams(url)

    console.log(currentURL.get('id'));
    

    ImagenesTemporales(params, event)
    SubirImagenes(currentURL.get('id'))
}

function MostrarImagenExistente(params) {
    
    const existente = document.getElementById('logo')

    console.log(params);
    

    if (existente) {
        
        existente.setAttribute('nombre', params.files[0])
        
        const img = document.querySelector('img')
        img.src = '../img/logos/' + params.files[0].name

    } else if(params.files.length > 0) {

        console.log('holo');
        

        const fila = document.createElement('li')
        fila.id = 'logo'
        fila.classList.add('fila')

        fila.setAttribute('nombre', params.files[0])

        const label = document.createElement('label')

        const img = document.createElement('img')
        img.src = '../img/logos/' + params.files[0].name

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

