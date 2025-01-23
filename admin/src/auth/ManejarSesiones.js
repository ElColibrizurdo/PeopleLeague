async function VerificarToken() {
    
    const token = localStorage.getItem('token')

    const response = await fetch(`/auth/verificarToken?token=${token}`)
    const data = await response.json()

    console.log(data);
    
    const name = document.querySelector('.id_name_usuario')
    name.textContent = data.Nombres + ' ' + data.ApellidoPrimero 
}

VerificarToken()