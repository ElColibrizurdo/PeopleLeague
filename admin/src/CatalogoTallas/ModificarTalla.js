
const url = window.location.search

if (url.includes('id')) {

    MostrarTalla(new URLSearchParams(url).get('id'))
    
    const btn = document.getElementById('btnAceptar')
    btn.setAttribute('onclick', 'ModificarMedidas()')
}


async function MostrarTalla(id) {
    
    console.log(id);

    const response = await fetch(`/auth/mostrarMedida?id=${parseInt(id)}` )
    const data = await response.json()

    console.log(data);

    const form = document.getElementById('form')

    console.log(form);
    
    document.getElementById('nombre').value = data.nombre
    document.getElementById('descripcion').value = data.descripcion

    const responseIMG = await fetch('/auth/buscarImagenMedida?id=' + id)
    const ruta = await responseIMG.json()
    console.log(ruta.name);

    const fila = document.createElement('li')
    fila.classList.add('fila')

    const filas = document.querySelectorAll('.fila')
    
    fila.setAttribute('fila', filas.length)

    const img = document.createElement('img')
    img.src = '../img/medidas/' + ruta.name
    img.style.maxWidth = '70px'

    const label = document.createElement('label')
    label.appendChild(img)

    const btn = document.createElement('button')
    btn.textContent = 'eliminar'
    label.appendChild(btn)
    
    fila.appendChild(label)
    btn.setAttribute('onclick', 'BorrarImagen(event, this)')
    btn.setAttribute('btnFila', filas.length)

    const lista = document.getElementById('imagenes')
    lista.appendChild(fila)

}


async function ModificarMedidas() {

    console.log('pepe');
    

    try {
        
        const response = await fetch('/auth/actualizarMedida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: new URLSearchParams(url).get('id'),
                nombre: document.getElementById('nombre').value,
                descripcion: document.getElementById('descripcion').value
            })
        })

        const data = await response.json()

        console.log(data);

        if (data.message) {
            
            alert(data.message)
            
        }
        

    } catch (error) {
        console.log(error);
        
    }
}
