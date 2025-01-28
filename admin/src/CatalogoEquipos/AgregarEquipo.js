async function AgregarEquipo() {

    const form = document.getElementById('form')

    const formData = new FormData(form)

    const responde = await fetch('/auth/agregarEquipo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: formData.get('nombre')
        })
    })


    const data = await responde.json()

    console.log(data);
    
    if (data.affectedRows == 1) {
        
        SubirImagenes(data.insertId)
        window.location.href = '/catalogoEquipos'
    }

}

let inpuImage

function SubirImagen(nombre) {
    
    const image = document.getElementById('image').files

    const formData = new FormData()
    formData.append('id', nombre)
    formData.append('image', inpuImage)

    fetch('/upload?equipo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  // Si esperas texto en la respuesta
    .then(result => {
        console.log('Resultado:', result);  // Imprimir el resultado del servidor
        // Aquí puedes manejar la respuesta, por ejemplo mostrar la imagen subida:
         // Mostrar la URL de la imagen
    })
    .catch(error => {
        console.error('Error al subir la imagen:', error);
    });
}

function MostrarImagen(params, event) {
    
    const lista = document.getElementById('imagenes')

    if (lista.childNodes != 1) {
      
        lista.innerHTML = ""
    } 
    
    ImagenesTemporales(params, event)

}

function RemoverImage(params) {

    console.log(params.nodeParents);
    const image = document.getElementById('image')
    image.value = ''

    
}