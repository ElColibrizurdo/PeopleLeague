async function ExtraerEquipos() {

    try {
        
        const response = await fetch('/auth/mostrarEquipos')
        const data = await response.json()

        const selector = document.getElementById('equipos')
            
        const seleccion = `<option value="0">---Seleccion---</option>`

        selector.innerHTML += seleccion

        data.forEach(element => {

            const equipo = `<option orden="${element.orden}" value="${element.id}">${element.nombre}</option>`
            
            selector.innerHTML += equipo

            console.log(selector);
            
        })

    } catch (error) {
        
    }
    
    
}

async function AgregarJugador() {
    
    const form = document.getElementById('form')
    const formData = new FormData(form)


    console.log(formData.get('nombre'));
    console.log(formData.get('apodo'));
    console.log(formData.get('numero'));
    console.log(formData.get('equipos'));

    try {

        const response = await fetch('/auth/agregarJugador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: formData.get('nombre'),
                apodo: formData.get('apodo'),
                numero: formData.get('numero'),
                equipo: formData.get('equipos')
            })
        })
    
        const data = await response.json()

        if (data.affectedRows) {
            
            alert('Se subio el jugador correctamente')
            SubirImagenes(data.insertId)
        }
    
        console.log(data);
    } catch (error) {
        console.log(error);
        
    }

    
    
}


ExtraerEquipos()