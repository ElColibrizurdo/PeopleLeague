async function AgregarCategoria(params) {

    const form = document.getElementById('form')

    const formData = new FormData(form)

    const responde = await fetch('/auth/agregarCategoria', {
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
        parent.location.href = '/MostrarCategorias'
    }

}

// function SubirImagen(nombre) {

//     console.log(nombre);
    

//     const image = document.getElementById('image')
    
//     const formData = new FormData()
//     formData.append('id', nombre)
//     formData.append('image', image.files[0])

    

//     fetch('/upload', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.text())  // Si esperas texto en la respuesta
//     .then(result => {
//         console.log('Resultado:', result);  // Imprimir el resultado del servidor
//         // Aqu� puedes manejar la respuesta, por ejemplo mostrar la imagen subida:
//          // Mostrar la URL de la imagen
//     })
//     .catch(error => {
//         console.error('Error al subir la imagen:', error);
//     });

    
// }

function MostrarImagen(params, event) {
    
    const lista = document.getElementById('imagenes')
    console.log(lista.childNodes);

    if (lista.length != 1) {
        
        lista.innerHTML = ''
    } 

    
    ImagenesTemporales(params, event)

    

    // fila.setAttribute('nombre', params.files[0])
    //     document.body.innerHTML += params.files[0]

    

    // const label = document.createElement('label')
    // label.innerText = params.files[0].name
    // const btn = document.createElement('button')
    // btn.textContent = 'eliminar'
    // label.appendChild(btn)

    
    // fila.appendChild(label)
    // btn.setAttribute('onclick', 'RemoverImage(this)')

    // const lista = document.getElementById('lista')
    // console.log(fila);
    
    // lista.appendChild(fila)
}

function RemoverImage(params) {

    console.log(params.nodeParents);
    const image = document.getElementById('image')
    image.value = ''

    
}


