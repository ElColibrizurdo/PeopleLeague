async function CambiarEstado(params) {
    
    console.log(params.parentNode);
    
    console.log(params.parentNode.getAttribute('lista'));
    

    const response = await fetch('/auth/cambiarEstado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: params.parentNode.getAttribute('lista'),
            estado: params.value 
        })
    })

    const data = await response.json()

    console.log(data);
    
}

async function mostrarProductos() {

    try {

        const lista = document.querySelector('.div_scroll')

        lista.replaceChildren();
        
        const response = await fetch(`/auth/mostrarProductos?id=0&filtro=00`)
        const data = await response.json()

        data.forEach(element => {
            

            let carta = document.createElement('div');
            carta.classList.add('cart');
            
            carta.innerHTML = `
                <label class="checkBox_filtro"><input name="radio" type="checkbox"><div class="transition_checkbox"></div></label>
                <img src="../../img/articulos/${element.id}.png" alt="alt" onerror="error_imagen(this);"/>
                <div class="contendor_cart_nombre">
                    <h2>${element.descripcion}</h2>
                </div>
                <h2>${element.jugadorNombre}</h2>
                <h2>${element.estado}</h2>
                <input type="text" name="stock" id="${element.id}" value="${element.stock}" onkeyup="if(event.key == 'Enter') ModificarStock(this)">
                <select id="${element.id}_estado" onchange="CambiarEstado(this)">
                    <option value="1">Preventa</option>
                    <option value="11">En Stock</option>
                    <option value="0">Agotado</option>
                </select>
                <h2>${element.id}000000000M</h2>
                <svg xmlns="http://www.w3.org/2000/svg" onclick="cambiarClase_eliminar(${element.id})" width="24" height="24" viewBox="0 0 24 24" fill="#6F6D6D">
                    <mask id="mask0_2039_18386" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" />
                    </mask>
                    <path d="M6.93398 21.2033C6.30432 21.2033 5.76773 20.9816 5.32423 20.5381C4.88073 20.0946 4.65898 19.558 4.65898 18.9283V6.06582H3.52148V3.79082H8.86223V2.65332H15.1252V3.79082H20.478V6.06582H19.3405V18.9283C19.3405 19.558 19.1187 20.0946 18.6752 20.5381C18.2317 20.9816 17.6952 21.2033 17.0655 21.2033H6.93398ZM17.0655 6.06582H6.93398V18.9283H17.0655V6.06582ZM8.89223 16.9941H11.0297V7.99407H8.89223V16.9941ZM12.9697 16.9941H15.1072V7.99407H12.9697V16.9941Z" />
                </svg>
            `;

            lista.appendChild(carta)
            const selector = document.getElementById(`${element.id}_estado`)
            
            selector.value = element.estado
        });

    } catch (error) {
        console.log(error);
        
    }
}

mostrarProductos()

async function ModificarStock(params) {
    
    console.log(params);
    console.log(params.textContent);
    

    const response = await fetch(`/auth/modificarStock?id=${params.id}&stock=${params.value}`)
    
    
}

async function CambiarEstado(params) {

    console.log(params.id);
    

    const tope = params.id.indexOf('_')

    console.log(params.id.slice(0,tope));
    

    try {
        
        const response = await fetch(`/auth/modificarEstado?id=${params.id.slice(0,tope)}&estado=${params.value}`)
        const data = await response.json()
        console.log(data);

    } catch (error) {
        console.log(error);
        
    }
    
    
    
}