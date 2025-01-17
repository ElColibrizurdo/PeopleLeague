
async function MostrarCompras() {
    
    const lista = document.querySelector('.div_scroll')

    try {
        
        const response = await fetch('/auth/mostrarCompras')
        const data = await response.json()

        document.querySelector('.cantidad').textContent = `(${data.length})`

        console.log(data);
        

        data.forEach(element => {

            if (element.id_detalle == null) {
                
                element.id_detalle = element.id_venta
            }
          
            let carta= `
            <div id="${element.id_detalle}" class="cart">
                <label class="checkBox_filtro"><input name="radio" type="checkbox"><div class="transition_checkbox"></div></label>
                <div class="contendor_cart_nombre">
                    <h2>Pedido: ${element.noPedido}</h2>
                    <h2>ID: ${element.id_venta}</h2>
                    <h2>ID_detalle: ${element.id_detalle}</h2>
                </div>
                <div class="contendor_cart_nombre">
                    <h2>Total individul: ${element.total}</h2>
                    <h2>Total: ${element.Total}</h2>
                    <h2>Cantidad: ${element.cantidad}</h2>
                </div>
                <div class="contendor_cart_nombre">
                    <h2>fecha Alta: ${element.fechaAlta}</h2>
                    <h2>fecha Pago: ${element.fechaPago}</h2>
                    <h2>ID cliente: ${element.idCliente}</h2>
                </div>
                <div class="contendor_cart_nombre">
                    <h2>producto: ${element.descripcion}</h2>
                    <h2>medida: ${element.nombre}</h2>
                </div>
                <select id="estatus-${element.id_detalle}" onchange="ModificarEstatus(this)">
                        
                        <option value="11">Entregado</option>
                        <option value="1">En reparto</option>
                        <option value="0">Por Enviar</option>
                    </select>
                <input id="${element.id_venta}" type="text" value="${element.noGuia}" onkeypress="if(event.key == 'Enter') ModificarGuia(this)">
              
            </div>
            `

             lista.innerHTML += carta
        });

        data.forEach(element => {
            
            let selector = document.getElementById(`estatus-${element.id_detalle}`)
            
            if (element.estadoEnvio != null) {
                console.log(element.estadoEnvio);
                
                selector.value = String(element.estadoEnvio)
            } else {

            }
        })


    } catch (error) {
        console.log(error);
        
    }
}

async function ModificarGuia(params) {
    
    try {

        console.log(params.value);
        
        
        const response = await fetch(`/auth/modificarGuia?id=${params.getAttribute('id')}&numero=${params.value}`)
        const data = await response.json()

        console.log(data);
        
        if (data.affectedRows == 1) {
            
            alert("Se a modificado correcrtamente el numero guia")
        }

        if (data.message) {
            alert(data.message)
        }

    } catch (error) {
        console.log(error);
        
    }
}

async function ModificarEstatus(params) {

    try {

        console.log(params);
        console.log(params.value);
        console.log(params.id);
        
        const response = await fetch(`/auth/modificarEE?id=${params.id.slice(8)}&estatus=${params.value}`)
        const data = await response.json()
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
    
}

MostrarCompras()