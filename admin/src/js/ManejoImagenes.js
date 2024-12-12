async function BorrarImagen(event, params) {
    
    event.preventDefault()

    const img = new URL(params.previousElementSibling.src)
    console.log(img.pathname);

    const fila = document.querySelector('.fila')
    if (fila) {
        
        fila.remove()
    } else {

        const carta = params.parentNode
        carta.remove()
    }

    const carta = document.querySelector
    

    try {
        
        respoinse = await fetch(`/auth/eliminarIMG?directorio=${img.pathname}`)
        const data = await respoinse.json()

        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

console.log('Manejo imagenes');

tempFile = []

function ImagenesTemporales(params, event) {
  
    tempFile.push(event.target.files[0])

    const fila = document.createElement('li')
    fila.classList.add('fila')

    const filas = document.querySelectorAll('.fila')
    
    fila.setAttribute('fila', filas.length)
    
    const img = document.createElement('img')
    img.src = URL.createObjectURL(event.target.files[0])
    img.style.maxWidth = '70px'

    const label = document.createElement('label')
    label.appendChild(img)

    const btn = document.createElement('button')
    btn.textContent = 'eliminar'
    label.appendChild(btn)

    
    fila.appendChild(label)
    btn.setAttribute('onclick', 'EliminarImagen(event, this)')
    btn.setAttribute('btnFila', filas.length)

    const lista = document.getElementById('imagenes')
    lista.appendChild(fila)
}

async function NuevaImagen(params) {
    
    try {
        console.log(params.files[0]);
        

        const formData = new FormData()
        formData.append('image', params.files[0])
        formData.append('id', new URLSearchParams(window.location.search).get('idProducto'))
        
        const response = await fetch('/auth/subirImagen', {
            method: 'POST',
            body: JSON.stringify({
                formData
            })
        })

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json();
        console.log("Imagen subida con éxito:", result);

        location.href() = location.href()

    } catch (error) {
        console.log(error);
        
    }
}

function SubirImagenes(id) {
    
    console.log(id)
    
    const formData = new FormData()
    formData.append('id', id)

    tempFile.forEach((element,index) => {
        formData.append(`images`, element)
    })
    
    let link = '/upload'

    console.log(window.location.pathname);
    

    const path = {
        '/agregarCategoria': '?categoria',
        '/editarEquipo': '?equipo',
        '/agregarBanner': '?banners',
        '/agregarProducto': '?producto',
        '/agregarTalla': '?medida'
    }

    link += path[window.location.pathname] 

    console.log(link);
    

    fetch(link, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  // Si esperas texto en la respuesta
    .then(result => {
        console.log(typeof(result)); 
        
        // Imprimir el resultado del servidor
        // Aquí puedes manejar la respuesta, por ejemplo mostrar la imagen subida:
        
        //document.body.innerHTML += result; // Mostrar la URL de la imagen
        //.parent.location.href = '/productos'
    })
    .catch(error => {
        console.error('Error al subir la imagen:', error);
    });

    
}

console.log(window.location.pathname);
