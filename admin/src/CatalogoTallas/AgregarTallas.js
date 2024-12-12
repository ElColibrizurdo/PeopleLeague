const lista = document.getElementById('imagenes')

    console.log(lista.childNodes);
async function AgregarPortada(params, event) {

    const lista = document.getElementById('imagenes')
        
    lista.innerHTML = ''    

    ImagenesTemporales(params, event)

}

async function AgregarRegistro() {

    const form = document.getElementById('form')

    const formData = new FormData(form)

    

    const responde = await fetch('/auth/agregarMedida', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion')
        })
    })

    const data = await responde.json()

    if (data.a == 1) {
        
        SubirImagenes(data.id)

        window.location.href = '/catalogotallas'
    }


   

    console.log(data);
    

}