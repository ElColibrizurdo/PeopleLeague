

const url = new URLSearchParams(window.location.search);

if (url.get('idAdmin')) {
    console.log(url.get('idAdmin'));
    MostrarAdmin()

    const btnCC = `
        <button class="btn_CC btn_inciarSesion" onclick="ModificarCAdmin(this, event)" id="CC">Cambiar contraseña</button>
    `

    const caja = document.querySelector('.btn_logIn')
    caja.innerHTML += btnCC
}

async function MostrarAdmin() {
    
    try {
        const response = await fetch(`/auth/obtenerAdmin?id=${url.get('idAdmin')}`)
        const data = await response.json()

        console.log(data);

        const nombre = document.getElementById('nombre')
        const apePa = document.getElementById('apePa')
        const apeMa = document.getElementById('apeMa')
        const fech = document.getElementById('fecha')
        const email = document.getElementById('email')

        console.log(data[0].fechaNacimiento.slice(0, data[0].fechaNacimiento.indexOf('T')));
        

        nombre.value = data[0].Nombres
        apePa.value = data[0].ApellidoPrimero
        apeMa.value = data[0].ApellidoSegundo
        email.value = data[0].email
        fech.value = data[0].fechaNacimiento.slice(0, data[0].fechaNacimiento.indexOf('T'))
            
    } catch (error) {
        console.log(error);
            
    }
}


formulario.addEventListener('submit', async function (event) {
    
    event.preventDefault()

    console.log(event);
    
    
    if (url.get('idAdmin')) {

        const pantallaCarga = document.getElementById('carga')
        
        pantallaCarga.classList.remove('d-none')

        const formData = event.target

        try {
            
            const response = await fetch('/auth/modificarAdmin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: url.get('idAdmin'),
                    nombre: formData.nombre.value,
                    apeP: formData.apePa.value,
                    apeS: formData.apeMa.value,
                    email: formData.email.value,
                    fecha: formData.fecha.value,
                    c: formData.con
                    
                })
            })

            const data = await response.json()

            if (data.affectedRows == 1) {
                pantallaCarga.classList.add('d-none')
            }

            console.log(data);
                    
        } catch (error) {
            console.log(error);
            
        }
    }
})

async function ModificarCAdmin(params, event) {
    
    event.preventDefault()
    console.log(params);

    const c = document.getElementById('contra')
    const cc = document.getElementById('contra')
        
    try {

        const carga = document.getElementById('carga')
        
        carga.classList.remove('d-none')
            
        const response = await fetch('/auth/ModificarCAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: url.get('idAdmin'),
                c: c.value,
                cc: cc.value
            })
        })

        const data = await response.json()

        if (data.msg) {
            alert(data.msg)
            c.value = ''
            cc.value = ''
        } else {
            alert(data.error)
        }

        carga.classList.add('d-none')

    } catch (error) {
        console.log(error);
            
    }
}