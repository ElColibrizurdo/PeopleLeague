async function MostrarCategorias(id) {
    
    console.log(id);
    
    const consulta = 'WHERE id = ' + id

    const response = await fetch('/auth/categorias?tipo=' + consulta)
    const data = await response.json()

    const nombre = document.getElementById('nombre')

    console.log(data);
    nombre.value = data[0].nombre

    MostrarIMGExistente(id)   
}

async function ModificarCategoria() {
    
    const form = document.getElementById('form')
    const formData = new FormData(form)

    console.log(formData.get('nombre'));
    

    const response = await fetch('/auth/actualizarCategoria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: new URLSearchParams(window.location.search).get('id'),
            nombre: formData.get('nombre')
        })
    })

    const data = await response.json()

    if (data.affectedRows == 1) {
        alert('Se modifico el color')
    }
    
}

if (new URLSearchParams(window.location.search).get('id')) {

    const inputIMG = document.getElementById('image')

    const url = window.location.search
    const par = new URLSearchParams(url)

    inputIMG.setAttribute('onchange', `SubirImagenes(${par.get('id')}, event)`)

    MostrarCategorias(new URLSearchParams(window.location.search).get('id'))

    const btnFinalizar = document.getElementById('finalizar')

    btnFinalizar.setAttribute('onclick', 'ModificarCategoria()')

    const btnSubirImagen = document.getElementById('image')
    
     

    //btnSubirImagen.setAttribute('enctype', 'NuevaImagen(this)')
    //btnSubirImagen.removeAttribute('onchange')
}

async function MostrarIMGExistente(id) {
    
    const response = await fetch(`/auth/ObtenerIMG?path=${window.location.pathname}&id=${id}`)
    const data = await response.json()

    console.log(data);
    
    if (data) {

        const categoria = `
        <li id="logo" class="fila" nombre="[object Object]">
            <label>
                <img src="/img/tipo/${data}" style="max-width: 70px;">
                <button onclick="BorrarImagen(event, this)"> eliminar </button>
            </label>
        </li>
        `

        const lista = document.getElementById('imagenes')

        lista.innerHTML = categoria
    }
}