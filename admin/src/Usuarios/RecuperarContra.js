
const formulario = document.querySelector('.form')

console.log(formulario);


formulario.addEventListener('submit', async function (event) {
    
    event.preventDefault()

    try {
        
        const carga = document.getElementById('carga')
        const formData = event.target

        console.log(formData.email.value);
        console.log(formData.name.value);
        console.log(formData.pass.value);

        carga.classList.remove('d-none')
        

        const response = await fetch('/auth/ModificarCCEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email.value,
                name: formData.name.value,
                pass: formData.pass.value
            })
        })

        const data = await response.json()

        console.log(data);

        if (data.msg) {
            alert(data.msg)
            event.target.reset()
        } else {
            alert(data.error)
        }
        
        carga.classList.add('d-none')

    } catch (error) {
        console.log(error);
                
    }
})