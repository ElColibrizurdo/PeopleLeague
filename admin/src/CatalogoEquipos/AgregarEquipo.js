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
        
        SubirImagen(data.insertId)
    }

}

let inpuImage

function SubirImagen(nombre) {
    
    console.log(nombre);
    

    const image = document.getElementById('image').files

    console.log(image);
    
    
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

function MostrarImagen(params) {
    
    const fila = document.createElement('li')

    fila.setAttribute('nombre', params.files[0])
        document.body.innerHTML += params.files[0]

    localStorage.setItem('img', params.files[0])

    const label = document.createElement('label')
    label.innerText = params.files[0].name
    const btn = document.createElement('button')
    btn.textContent = 'eliminar'
    label.appendChild(btn)

    
    fila.appendChild(label)
    btn.setAttribute('onclick', 'RemoverImage(this)')

    const lista = document.getElementById('lista')
    console.log(fila);
    
    //lista.appendChild(fila)
    console.log(params.files);
    inpuImage = params.files[0]
}

function RemoverImage(params) {

    console.log(params.nodeParents);
    const image = document.getElementById('image')
    image.value = ''

    
}