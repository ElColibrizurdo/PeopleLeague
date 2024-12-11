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


function ImagenesTemporales(params, event) {

    console.log(event);
    
    
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