
if (new URLSearchParams(window.location.search).get('idJugador')) {
    
    
    MostrarDatos(new URLSearchParams(window.location.search).get('idJugador'))

    const btnModificar = document.getElementById('finalizar')
    btnModificar.innerText = 'Modificar'
    btnModificar.setAttribute('onclick', `ModificarJugador(${new URLSearchParams(window.location.search).get('idJugador')})`)

    const btnSubirIMG = document.getElementById('image')
    btnSubirIMG.setAttribute('onchange', `SubirImagenes(${new URLSearchParams(window.location.search).get('idJugador')})`)

}

async function MostrarDatos(id) {

    console.log(id);
    
    try {
        
        const response = await fetch('/auth/mostrarJUgador?id=' + id)
        const data = await response.json()
    
        console.log(data);
    
        const nombre = document.getElementById('nombre')
        const apodo = document.getElementById('apodo')
        const numero = document.getElementById('numero')
        const equipo = document.getElementById('equipos')
    
        console.log(equipo);
        
    
        nombre.value = data.nombre
        apodo.value = data.apodo
        numero.value = data.numero
        equipo.value = data.idEquipo

        const lista = document.getElementById('imagenes')

        const img = `
        <li id="logo" 
        class="fila" 
        nombre="[object Object]">
        <label><img src="/img/jugadores/${id}.png" style="max-width: 70px;">
            <button onclick="BorrarImagen(event, this)">eliminar</button>
        </label></li>`

        lista.innerHTML += img
    
        console.log(equipo.value);

    } catch (error) {
        
    }
}

async function ModificarJugador(id) {

    const nombre = document.getElementById('nombre').value
    const apodo = document.getElementById('apodo').value
    const numero = document.getElementById('numero').value
    const equipo = document.getElementById('equipos').value

    console.log(id);
    console.log(nombre);
    console.log(apodo);
    console.log(numero);
    console.log(equipo);
    
    
    
    try {

        const response = await fetch(`/auth/modificarJugador?id=${id}&equpo=${equipo}&nombre=${nombre}&apodo=${apodo}&numero=${numero}`)
        const data = await response.json()

        console.log(data);

        if (data.changedRows == 1) {
            

            alert('Modificacion exitosa')
        }
        

        
    } catch (error) {
        
    }
}
