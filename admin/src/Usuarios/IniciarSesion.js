async function IniciarSesion() {

    const carga = document.getElementById('carga')

    carga.classList.remove('d-none')

    const correo = document.getElementById('correo')
    const pass = document.getElementById('pass')

    try {
        
        console.log(correo.value);
        console.log(pass.value);


        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: correo.value,
                pass: pass.value
            }),
            credentials: 'include'
        })
        const data = await response.json()

        console.log(data);
    

        if (data.esValido) {
          
            carga.classList.add('d-none')
            window.location.href = '/bienvenida'

        } else {

            carga.classList.add('d-none')
        }
    //params.preventDefault()

    } catch (error) {
        console.log(error);
        carga.classList.add('d-none')
        
    }    
}

