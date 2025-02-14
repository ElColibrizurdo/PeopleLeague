async function VerificarToken() {
    

    const response = await fetch(`/auth/verificarToken`, {
        method: 'POST',
        credentials: 'include'
    })
    const data = await response.json()

    console.log(data);

    if (data.autentificacion) {
        
        const name = document.querySelector('.id_name_usuario')
        name.textContent = data.nombre + ' ' + data.ape 
    }    
}

VerificarToken()