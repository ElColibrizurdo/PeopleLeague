
const formulario = document.getElementById('form')
const pantallaCarga = document.getElementById('carga')
        console.log(pantallaCarga);



formulario.addEventListener('submit', async function (event) {
    
    event.preventDefault()

    const url = new URLSearchParams(window.location.search)

    if (!url.get('idAdmin')) {
    
    
        const formData = event.target

        console.log(formData.fecha.value);
        
        
        try {

            const pantallaCarga = document.getElementById('carga')
            console.log(pantallaCarga);

            if (formData.contra.value === formData.contraC.value) {
                pantallaCarga.classList.remove('d-none')
            
                const response = await fetch('/auth/agregarColaborador', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: formData.nombre.value,
                        pass: formData.contra.value,
                        apePa: formData.apePa.value,
                        apeMa: formData.apeMa.value,
                        email: formData.email.value,
                        fecha: formData.fecha.value
                    })
                })

                const data = await response.json()
                //carga.classList.add('d-none')
                console.log(data);
                
                if (data[0][0].affectedRows == 1) {
                    pantallaCarga.classList.add('d-none')
                    window.location.href = '/admins'
                }
            } else {  
                alert('La contraseña no coincide!!!')
            }
            
            

        } catch (error) {
            console.log(error);
            
        }    
    }

    
})