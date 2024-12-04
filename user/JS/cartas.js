function CrearCards(element, contenedor) {
    

    //Carta para mostrar los productos
    const card = document.createElement('div')
    card.href = '/canasta?id=' + element.id 
    card.classList.add('carta')

    //Link
    const link = document.createElement('a')
    link.href = '/canasta?id=' + element.id
    link.classList = 'link'

    card.appendChild(link)

    /*
    //Contenedor estado del producto
    const div_estado = document.createElement('div')
    div_estado.classList.add('carta_estado')

    const linea = document.createElement('a')

    if (element.estado == 0) {
         linea.innerText = 'Preventa'
    } else if (element.estado  == 1) {
        
         linea.innerText = 'Disponible'
    } else {

         linea.innerText = 'Agotado'
    }

    div_estado.appendChild(linea)*/

    //Imagen del producto
    const img = document.createElement('img')
    img.classList.add('img_carta')
    img.src = '../img/articulos/' + element.id + '.png'

    //Parte texto de la carta
    const card_div_text = document.createElement('div')
    card_div_text.classList.add('div_txt_carta')

    const card_body = document.createElement('div')
    card_body.classList.add('txt_carta')

    //Contenedor del nombre
    const contenedor_nombre = document.createElement('div')
    contenedor_nombre.classList.add('txt_carta_1')

    const label_name = document.createElement('p')
    label_name.href = '/canasta?id=' + element.id
    label_name.innerText = element.descripcion

    contenedor_nombre.appendChild(label_name)

    //Contenedor del precio y like
    const card_footer = document.createElement('div')
    card_footer.classList.add('txt_carta_2')

    const label_costo = document.createElement('p')
    label_costo.innerText = element.precio

    //Like en forma  de corazon
    const lbl = document.createElement('label')
    lbl.classList.add('container_corazon')

    const chkbox_deseo = document.createElement('input')
    chkbox_deseo.type = 'checkbox'
    chkbox_deseo.setAttribute('number', element.id)
    chkbox_deseo.classList.add('productos')
    chkbox_deseo.setAttribute('onchange', 'DarLike(this)')
    chkbox_deseo.setAttribute('onclick', 'validarSesion(this)')

    const svgContent = `
        <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
        </svg>
    `;

    lbl.appendChild(chkbox_deseo)
    lbl.innerHTML += svgContent

    card_footer.appendChild(label_costo)
    card_footer.appendChild(lbl)

    card_body.appendChild(contenedor_nombre)
    card_body.appendChild(card_footer)

    //link.appendChild(div_estado)
    link.appendChild(img)
    card_div_text.appendChild(card_body)
    link.appendChild(card_div_text)
    card.setAttribute('tipo', element.idTipo)
    card.setAttribute('equipo', element.idEquipo)

    
    contenedor.appendChild(card)
}
