const express = require('express')
const router = express.Router()
const { ObtenerBanners, ObtenerJugadores, EliminarImagen, BuscarImagenEquipo, ModificarEquipo, ModificarNoGuia, MostrarTalla, EliminarEquipo, AgregarEquipo, MostrarEquipos, ModificarEstatusEntrega, MostrarPedidos, MostrarCompras, EliminarCategoria, ModificarCategoria, ModificarColor, AgregarColor, EliminarColor, ModificarMedida, AgregarMedida, EliminarMedida, SubirImagenProducto, AgregarColorProducto, AgregarMedidaProducto, ELiminarColorDeProducto, ActualizarProducto, BuscarImagenes, ExtraerEquipos, ExtraerJugadores, ExtraerColores, ExtraerColoresProducto, ExtraerMedidas, ExtraerMedidasProducto, EliminarColaborador, CrearColaborador, MostrarUsuarios, estadisticas, mostrar_productos, agregar_producto, ObtenerTipos, AgregarCategoria, CambiarEstado, login, EliminarProducto } = require('./auth')

router.get('/mostrarTallas', MostrarTalla)
router.get('/estadisticas', estadisticas)
router.get('/mostrarProductos', mostrar_productos)
router.post('/agregarProducto', agregar_producto)
router.get('/categorias', ObtenerTipos)
router.post('/agregarCategoria', AgregarCategoria)
router.post('/cambiarEstado', CambiarEstado)
router.get('/login', login)
router.post('/eliminarProducto', EliminarProducto)
router.get('/mostrarUsuarios', MostrarUsuarios)
router.post('/agregarColaborador', CrearColaborador)
router.get('/eliminarColaborador', EliminarColaborador)

router.get('/equipos', ExtraerEquipos)
router.get('/jugadores', ExtraerJugadores) 
router.get('/colores', ExtraerColores)
router.get('/coloresProducto', ExtraerColoresProducto)
router.get('/medidas', ExtraerMedidas)
router.get('/medidasProducto', ExtraerMedidasProducto)


router.get('/recuperarIMG', BuscarImagenes)
router.post('/actualizarProducto', ActualizarProducto)
router.post('/quitarColorProducto', ELiminarColorDeProducto)

router.post('/agregarColorProducto', AgregarColorProducto)
router.post('/agregarMedidaProducto', AgregarColorProducto)

router.post('/subirImagen', SubirImagenProducto)

router.post('/eliminarColor', EliminarColor)
router.post('/agregarColor', AgregarColor)
router.post('/actualizarColor', ModificarColor)

router.post('/agregarMedida', AgregarMedida)
router.post('/actualizarMedida', ModificarMedida)
router.post('/eliminarMedida', EliminarMedida)

router.post('/actualizarCategoria', ModificarCategoria)
router.post('/eliminarCategoria', EliminarCategoria)

router.get('/mostrarCompras', MostrarCompras)
router.get('/mostrarPedidos', MostrarPedidos)
router.get('/modificarEE', ModificarEstatusEntrega)

router.get('/mostrarEquipos', MostrarEquipos)
router.get('/eliminarEquipo', EliminarEquipo)
router.post('/agregarEquipo', AgregarEquipo)

router.get('/modificarGuia', ModificarNoGuia)
router.get('/modificarEquipo', ModificarEquipo)
router.get('/obtenerLogo', BuscarImagenEquipo)
router.get('/eliminarIMG', EliminarImagen)
router.get('/obtenerJugadores', ObtenerJugadores)
router.get('/obtenerBanners', ObtenerBanners)

module.exports = router