async function MostrarJugadores() {
    
    try {
        
        const response = await fetch('/auth/jugadores?id=1')
        const data = await response.json()

        console.log(data.row);

        const lista = document.querySelector('.div_scroll')

        console.log(lista);

        const responseIMG = await fetch('/auth/obtenerListaIMG?path=' + window.location.pathname)
        const dataIMG = await responseIMG.json()


        data.row.forEach(element => {

            console.log(element);
            console.log(dataIMG);
            

            const directorio = dataIMG.find(item => item.includes(`_${element.id}.`))
            
            
            const carta = `
                <div class="cart">
                    <div class="contendor_cart_nombre">
                        <label class="checkBox_filtro"><input name="radio" type="checkbox"><div class="transition_checkbox"></div></label>
                        <img src="/img/jugadores/${directorio}" alt="alt">
                        <a href="/agregarJugador?idJugador=${element.id}">${element.nombre}</a>
                    </div>
                    <h2>numero ${element.numero}</h2>
                        <h2>${element.apodo}</h2>
                        <h2>${element.fechaAlta}</h2>
                                
                    <svg xmlns="http://www.w3.org/2000/svg" onclick="cambiarClase_eliminar()" width="24" height="24" viewBox="0 0 24 24" fill="#6F6D6D">
                    <mask id="mask0_2039_18386" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24"></rect>
                    </mask>
                    <path d="M6.93398 21.2033C6.30432 21.2033 5.76773 20.9816 5.32423 20.5381C4.88073 20.0946 4.65898 19.558 4.65898 18.9283V6.06582H3.52148V3.79082H8.86223V2.65332H15.1252V3.79082H20.478V6.06582H19.3405V18.9283C19.3405 19.558 19.1187 20.0946 18.6752 20.5381C18.2317 20.9816 17.6952 21.2033 17.0655 21.2033H6.93398ZM17.0655 6.06582H6.93398V18.9283H17.0655V6.06582ZM8.89223 16.9941H11.0297V7.99407H8.89223V16.9941ZM12.9697 16.9941H15.1072V7.99407H12.9697V16.9941Z"></path>
                    </svg>
                </div>`


            lista.innerHTML += carta
        });


    } catch (error) {
        console.log(error);
            
    }
}

MostrarJugadores()