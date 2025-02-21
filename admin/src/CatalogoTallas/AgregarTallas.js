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

    if (formData.get('nombre').trim()) {
        
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

        console.log(data);

        if (data.res) {
            
            SubirImagenes(data.id)
            alert(data.message)
            window.location.href = '/catalogotallas'
        }

        console.log(data);
    }
    

}