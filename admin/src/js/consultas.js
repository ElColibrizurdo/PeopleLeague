function cambiarClase() {
var div = document.getElementById("subcontendor_1");
if (div.classList.contains("active")) {
    div.classList.remove("active");

} else {
    div.classList.add("active");

}
}
function cambiarClase_2() {
var div = document.getElementById("subcontendor_2");
if (div.classList.contains("active")) {
    div.classList.remove("active");

} else {
    div.classList.add("active");

}
}
function cambiarClase_eliminar(id) {
var div = document.getElementById("pantalla_gris");
var btn = document.getElementById("btnEliminar");

btn.addEventListener('click', function() {

    Eliminar(id)
})

if (div.classList.contains("active")) {
    div.classList.remove("active");

} else {
    div.classList.add("active");

}


}

