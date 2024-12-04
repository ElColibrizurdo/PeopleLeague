document.addEventListener('codigoTerminado',  function() {
    
    const btn_agregar = document.querySelector('.btn_pedido')

    btn_agregar.addEventListener('click', function () {

        console.log(localStorage.getItem('sesion'));
            
        AgregarProducto()
    })

   
});

function validaSesion(c) {
    if (sesion==null) {
      const status = confirm('Para agregar a la canasta se necesita ingresar');
      console.log(c)
      
      if (status) {
        const params = new URLSearchParams(window.location.search)

        window.parent.location.href = '/login?canasta=' + params.get('id') + '&cantidad=' + document.querySelector('.label-cantidad').value +
            '&numero=' +  
        sessionStorage.setItem('like', c.getAttribute('number'))
        
      }

      c.checked = false
      return false;
    }else{
      return true;

    }
  
  }

async function AgregarProducto() {
    
    const sesion = localStorage.getItem('sesion');
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const label_contador = document.querySelector('.label-cantidad')
    let numero = []
    let nombre = []
    const talla = []
    const precio = []
    const color = []

    const cantidad_perso = DeterminarPersonalizados()

    cantidad_perso.forEach(element => {

        talla.push(DeterminarTallas(element, label_contador.value))
        color.push(ObtenerColor(element, label_contador.value))
        

        if ((element.querySelector('[type="number"]') && element.querySelector('[name="nombre"]')) && (element.querySelector('[type="number"]').value.length > 0 || element.querySelector('[name="nombre"]').value)) {
           
            precio.push(parseFloat(document.getElementById('label-precio').getAttribute('precio')) + 250)
        } else {
           
            precio.push(document.getElementById('label-precio').getAttribute('precio'))
        }
        

        if (element.querySelector('[type="number"]')) {
            
            numero.push(element.querySelector('[type="number"]').value)
        
        } else {
            numero.push('')
        }
    
        if (element.querySelector('[name="nombre"]')) {
            
            nombre.push(element.querySelector('[type="text"]').value)
            
        } else {
    
            nombre.push('')
        }
    })
   
    console.log(numero);
    console.log(nombre);

    if (localStorage.getItem('sesion') == null && confirm('Para agregar a la canasta se necesita ingresar\n Quieres logearte?')) {

        const nombres = JSON.stringify(nombre)
        const numeros = JSON.stringify(numero)
        const tallas = JSON.stringify(talla)
        window.parent.location.href = `/login?id_producto=${id}&cantidad=${label_contador.value}&numero=${numero}&nombre=${nombre}&precio=${precio}&talla=${talla}&color=${color}`
        
    } else if (localStorage.getItem('sesion') !== null) {
        
        try {
            const response = await fetch('/auth/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    cantidad: label_contador.value,
                    id: sesion,
                    id_producto: id,
                    numero: numero,
                    nombre: nombre,
                    precio: precio,
                    talla: talla,
                    color:color
                })
            })
    
            const data = await response.json();
            console.log(data);
            
            console.log(data.message);
            
            
            if (data.message === 'ok') {
                window.location.href = "/tienda"
            } else {
                console.log(data.message);   
            }
        } catch (error) {
            
            console.log(error);   
        }
    }   
}



function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function DeterminarTallas(element, contador) {
    
    console.log(contador);
    const radio = element.querySelectorAll('[name="radio' + contador + '"]')

    console.log(radio);

    const radiorray = Array.from(radio)


        for (const element of radiorray) {
            if (element.checked) {
                return element.id.charAt(element.id.length - 1)
            }
        }
 
        return 1
}

function ObtenerColor(element, contador) {
    
    console.log(element);
    
    const radio = element.querySelectorAll('[name="radioColor' + contador + '"]')
    console.log(contador);
    
    console.log(radio);

    const radiorray = Array.from(radio)


        for (const element of radiorray) {
            if (element.checked) {
                console.log(element);
                
                return element.id.charAt(element.id.length - 1)
            }
        }
 
        return 1
}

function DeterminarPersonalizados() {
    
    const contenedores_personalizadas = document.querySelectorAll('.contenedor_descripcion_producto_pedido_personalizacion')
    console.log(contenedores_personalizadas.length);

    if (contenedores_personalizadas.length == 0) {
        
        const valores = document.querySelectorAll('.contendor_descripcion_producto_pedido_cantidad')
        console.log(valores);
        return valores

    } else {
        return contenedores_personalizadas
    }
    
   
}

