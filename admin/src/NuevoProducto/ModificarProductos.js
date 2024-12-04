async function ExtraerCatTipo(id, ctrl) {
    //console.log('ExtraerCategoriasColores Inicio');
    ctrl.innerHTML = ''
    
    const response = await fetch('/auth/categorias?tipo='+id)
    const data = await response.json()

    //const ctrl = document.getElementById('tipo')
    data.forEach(element => {
        const opcion = `<option value="${element.id}"  ${element.selected}  >${element.id +'-'+ element.nombre}</option>
        `
        ctrl.innerHTML += opcion
    })
}

async function ExtraerCatMedida(id, ctrl) {

    try {
        
        ctrl.innerHTML = ''

        const responseM = await fetch('/auth/medidas?id='+id)
        const dataM = await responseM.json()
        //const selectorM = document.getElementById('medida')
        dataM.row.forEach(element => {
    
            const medida = `<option value="${element.id}"  ${element.selected} >${element.id +'-'+ element.nombre +'-'+ element.descripcion}</option>
            `
            ctrl.innerHTML += medida
        })

    } catch (error) {
        console.log(error);
        
    }
}


async function ExtraerCatEquipo(id, ctrl) {
    const responseE = await fetch('/auth/equipos?id='+id)
    

    try {

        const dataE = await responseE.json()

        //const selectorE = document.getElementById('equipo')

        dataE.row.forEach(element => {
            const equipo = `<option value="${element.id}"  ${element.selected} >${element.id +'-'+ element.nombre}</option>
            `
            ctrl.innerHTML += equipo
        })

    } catch (error) {
        console.log(error);
        
    }

    
}


async function ExtraerCatJugador(ids, ctrl) {
    console.log('ExtraerCatJugador Inicio:', ids);
    const responseJ = await fetch('/auth/jugadores?id='+ids[0]+'&idEquipo='+ids[1])
    

    try {
        
        const dataJ = await responseJ.json()

        //const selectorJ = document.getElementById('jugador')

        dataJ.row.forEach(element => {

            const jugador = `<option value="${element.id}" ${element.selected} >${element.id +'-'+ element.nombre +' - '+ element.apodo}</option>
            `        
            ctrl.innerHTML += jugador
        })
        //selecElem(id[0], ctrl)
    
        console.log('ExtraerCatJugador Termino:', ids);

    } catch (error) {
        console.log(error);
        
    }
}

async function ExtraerCatColor(id, ctrl) {
    
    const response = await fetch('/auth/colores?id='+id)
    const data = await response.json()
    //const selectorC = document.getElementById('color')
    console.log('ExtraerCatColor Inicio:', data);
    data.row.forEach(element => {
        const color = `<option value="${element.id}" ${element.selected} >${element.id +'-'+ element.nombre}</option>
        `
        ctrl.innerHTML += color
    })
    //selecElem(id, ctrl)

    console.log('ExtraerCatColor Termino:', id);
}

function elemLi(ctrl, nombre, id){

    try {
        
        const fila = document.createElement('li')

        fila.id = ctrl.id+'_'+id.toString()
        fila.name = ctrl.id+'_'+id.toString()
        fila.value = id
    
        const label = document.createElement('label')
        label.textContent = nombre
        label.value = id
        //label.classList.add('colores')
        //label.setAttribute('color', id)
    
        const btn = document.createElement('button')
        btn.textContent = 'eliminar'
        btn.id = ctrl.id+'btn_'+id.toString()
        btn.setAttribute('onclick', 'EliminarLi(this)')
        fila.appendChild(btn)
        fila.appendChild(label)
    
        ctrl.appendChild(fila)

    } catch (error) {
        console.log(error);
        
    }    
}

async function ExtraerColorProducto(id, ctrl) {
    
    const response = await fetch('/auth/coloresProducto?id='+id)
    const data = await response.json()
    data.row.forEach(element => {
        elemLi(ctrl, element.nombre, element.idColor);
    })
}

async function ExtraerMedidasProducto(id, ctrl) {
    const response = await fetch('/auth/medidasProducto?id='+id)
    const data = await response.json()
    data.row.forEach(element => {
        elemLi(ctrl, ' - ' + element.nombre + ' - ' + element.descripcion, element.idMedida)
    })
}




async function MostrarDatos(id) {
    
    console.log("MostrarDatos(id):" + id);
    console.log("MostrarDatos(id):", id);
    
    const response = await fetch('/auth/mostrarProductos?id=' + id)
    const data = await response.json()

//    const responseC = await fetch('/auth/colores?id=' + id)//    const dataC = await responseC.json() //   console.log(data);

    //let idProducto = document.getElementById('idProducto')
    let nombre = document.getElementById('nombre')
    let precio = document.getElementById('precio')
    let estado = document.getElementById('estatus')

    let tipo = document.getElementById('tipo')
    let equipo = document.getElementById('equipo')
    let jugador = document.getElementById('jugador')

    let color = document.getElementById('color')
    let colores = document.getElementById('colores')

    let medida = document.getElementById('medida')
    let medidas = document.getElementById('medidas')

    if (id>0) {
        data.forEach(async element => {

            console.log("element.id:" + element.id);
        if (element.id == id) {

            //idProducto.innerHTML = element.id

            nombre.value = element.descripcion
            precio.value = element.precio
            estado.value = element.estado

            ExtraerCatTipo(element.idTipo, tipo)
            ExtraerCatEquipo(element.idEquipo, equipo)
            ExtraerCatJugador([element.idJugador, element.idEquipo], jugador)

            const responseIMG = await fetch('/auth/recuperarIMG?id=' + id)
            const dataIMG = await responseIMG.json()

            console.log("dataIMG:", dataIMG);
            
            if (dataIMG) {
                
                dataIMG.forEach(element => {

                    const fila = document.createElement('li')
                    fila.setAttribute('nombre', element.nombre)
                
                    const img = document.createElement('img')
                    img.src = '../img/articulos/' + element.nombre
                    img.style.maxWidth = '70px'

                    const label = document.createElement('label')
                    label.appendChild(img)

                    const btn = document.createElement('button')
                    btn.textContent = 'eliminar'
                    label.appendChild(btn)

                    
                    fila.appendChild(label)
                    btn.setAttribute('onclick', 'RemoverVariante(this)')

                    const lista = document.getElementById('imagenes')
                    lista.appendChild(fila)
                })                
            }


            try {
                ExtraerCatColor(0, color)
                ExtraerCatMedida(0, medida)

                ExtraerColorProducto(element.id, colores)
                ExtraerMedidasProducto(element.id, medidas)
            } catch (error) {
                console.log(error);
                
            }

            
        }

        })

    } else{

        try {
            
            ExtraerCatTipo(0, tipo)
            ExtraerCatEquipo(0, equipo)
            ExtraerCatJugador([0, 0], jugador)
    
            ExtraerCatColor(0, color)
            ExtraerCatMedida(0, medida)
    
            ExtraerColorProducto(0, colores)        
            ExtraerMedidasProducto(0, medidas)

        } catch (error) {
            console.log(error);   
        }   
    }
}

function selecElem(ctrl, id){
    try {
        console.log(ctrl.id + ':' +id +'_'+ ctrl.length +'_'+ ctrl.innerHTML );
        for (var pss=ctrl.length-1;pss>=0;pss--){
            item_name=ctrl.options[pss].value;

            if (item_name==id) {
                ctrl.value = id;
                ctrl.options[pss].selected = true;            
            }    
        } 

    }catch(err){
        alert(ctrl.value + ':' +id + ':' +err );
        console.log(err)
    }
}

async function ModificarProducto() {
    
    try {

        const nombre = document.getElementById('nombre')
        const precio = document.getElementById('precio')
        const numero = document.getElementById('numero')
        const estado = document.getElementById('estatus')

        const tipo = document.getElementById('tipo')
        const equipo = document.getElementById('equipo')
        const jugador = document.getElementById('jugador')

        const colores = document.getElementById('colores')
        const medidas = document.getElementById('medidas')

        let idProducto = new URLSearchParams(window.location.search).get('idProducto')
        let data = []
        let coloresID = []
        let medidasID = []

        for (var p = 0; p < colores.children.length; p++) {
            coloresID.push( colores.children[p].value );
        };

        for (var p2 = 0; p2 < medidas.children.length; p2++) {
            medidasID.push( medidas.children[p2].value );
        };
        
        if(idProducto > 0){
            console.log("ModificarProducto(): "+idProducto+" nombre:"+nombre.innerHTML+" IDs: "+coloresID+" : "+medidasID)
            const responde = await fetch('/auth/actualizarProducto', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idProducto, // new URLSearchParams(window.location.search).get('idProducto'),
                    descripcion: nombre.value,
                    precio: precio.value,
                    tipo: tipo.value,
                    equipo: equipo.value,
                    jugador: jugador.value,
                    numero: numero.value,
                    estado: estado.value,
                    stock: 0,
                    imagenes: idProducto+'.png',
                    coloresID: coloresID,
                    medidasID: medidasID
                })
            })
            data = await responde.json()

            console.log("ModificarProducto(data): " + data.length)
        }
        else{
            console.log("AgregarProducto(): "+idProducto+" IDs: "+coloresID+" : "+medidasID)
            const responde = await fetch('/auth/agregarProducto', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre.value,     //formData.get('nombre'),
                    precio: precio.value,
                    tipo: tipo.value,
                    equipo: equipo.value,
                    jugador: jugador.value,
                    numero: numero.value,
                    estado: estado.value,
                    stock: 0,
                    imagenes: idProducto+'.png',
                    coloresID: coloresID,
                    medidasID: medidasID
                })
            })
            // nombre, precio, tipo, equipo, jugador, numero, imagenes, coloresID, medidasID, stock         
            data = await responde.json()
            document.getElementById('btn_recargar').click();
        }

        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}

async function EliminarLi(params) {
    console.log(params.parentNode);

    params.parentNode.remove();
}



async function NuevaImagen(params) {
    console.log("NuevaImagen("+params);
    

    try {
        console.log(params.files[0]);
        

        const formData = new FormData()
        formData.append('image', params.files[0])
        formData.append('id', new URLSearchParams(window.location.search).get('idProducto'))
        
        const response = await fetch('/auth/subirImagen', {
            method: 'POST',
            body: JSON.stringify({
                formData
            })
        })

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json();
        console.log("Imagen subida con éxito:", result);

    } catch (error) {
        console.log(error);
        
    }
}



function SubirImagen(params) {
    console.log("SubirImagen("+params)

    console.log(params.files[0]);
    console.log(new URLSearchParams(window.location.search).get('idProducto'));
    
    const formData = new FormData()
    formData.append('id', new URLSearchParams(window.location.search).get('idProducto'))
    formData.append('image', params.files[0])

    const fila = document.createElement('li')

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  // Si esperas texto en la respuesta
    .then(result => {
        console.log('Resultado:', result);  // Imprimir el resultado del servidor
        // Aquí puedes manejar la respuesta, por ejemplo mostrar la imagen subida:
        fila.setAttribute('nombre', result)
        document.body.innerHTML += result; // Mostrar la URL de la imagen
    })
    .catch(error => {
        console.error('Error al subir la imagen:', error);
    });

    const img = document.createElement('img')
    img.src = URL.createObjectURL(params.files[0])
    img.style.maxWidth = '70px'

    const label = document.createElement('label')
    label.appendChild(img)

    const btn = document.createElement('button')
    btn.textContent = 'eliminar'
    label.appendChild(btn)

    
    fila.appendChild(label)
    btn.setAttribute('onclick', 'RemoverVariante(this)')

    params.nextElementSibling.appendChild(fila)

    //window.location.reload();
}



if (new URLSearchParams(window.location.search).get('idProducto')) {
    
    MostrarDatos(new URLSearchParams(window.location.search).get('idProducto'))

    //const btnFinalizar = document.getElementById('finalizar')
    //btnFinalizar.setAttribute('onclick', 'ModificarProducto()')

    const btnFinalizar = document.getElementById('finalizar')

    btnFinalizar.setAttribute('onclick', 'ModificarProducto()')
    const btnSubirImagen = document.getElementById('image')

    //btnSubirImagen.setAttribute('enctype', 'NuevaImagen(this, event)')
    //btnSubirImagen.removeAttribute('onchange')
}