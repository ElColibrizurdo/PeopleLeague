
const url = window.location.search

if (url.includes('id')) {

    MostrarTalla(new URLSearchParams(url).get('id'))
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

    console.log(ruta);

    
    
    
}
