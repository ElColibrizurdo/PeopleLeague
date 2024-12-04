function Buscar(params) {
    
    const barra = params    //document.querySelector('.buscador')
    
    barra.addEventListener('keydown', async function(event) {
        
        if (event.key === 'Enter' || event.keyCode === 13) {
            
            try {
                
                const response = await fetch('/auth/buscar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({elemento: '%' + params.value + '%'})
                })

                const data = await response.json()

                const frame = document.getElementById('gridContainer')   //.querySelector('iframe')
                console.log(frame);
                

                CrearCard(data)

                console.log(data);
                
            } catch (error) {   
                console.log(error);
            }
        }
    })
    console.log(params.value);
    
}

function LlamarFuncion(params) {
    
    const frame = document.querySelector('iframe')

    if (frame.src == '~/home') {
        
        const barra = params  //document.querySelector('.buscador')

        barra.addEventListener('keydown', function (event) {
            
            if (event.key === 'Enter' || event.keyCode === 13) {

                frame.src = '/tienda'
                console.log(frame.src);

                frame.contentWindow.Buscar(params)
                
            }
        })
    }     
        frame.contentWindow.Buscar(params)
    
    
}