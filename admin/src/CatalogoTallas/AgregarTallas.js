async function AgregarPortada(params) {

    console.log(params.files[0]);
    

    const formData = new FormData()
    formData.append('image', params.files[0])
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        
        
    })

}

async function AgregarRegistro() {

    const form = document.getElementById('form')

    const formData = new FormData(form)

    const responde = await fetch('/auth/agregarTalla', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: formData.get('nombre'),
            color: formData.get('color')
        })
    })


    const data = await responde.json()

    console.log(data);
    

}