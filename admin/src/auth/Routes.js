const express = require('express')
const router = express.Router()
const {ModifictContraConEmail, ModificarContraAdmin, ModificarAdmin, ObtenerAdmin, ObtenerIMG, obtenerListaIMG, VerificarToken, ModificarEstado, ModificarStockInvenario, ModificarJugador, MostrarJugador, AgregarJUgador, ModificarProductoTipo, BuscarImagenMedida, MostrarMedida, ObtenerBanners, ObtenerJugadores, EliminarImagen, BuscarImagenEquipo, ModificarEquipo, ModificarNoGuia, MostrarTalla, EliminarEquipo, AgregarEquipo, MostrarEquipos, ModificarEstatusEntrega, MostrarPedidos, MostrarCompras, EliminarCategoria, ModificarCategoria, ModificarColor, AgregarColor, EliminarColor, ModificarMedida, AgregarMedida, EliminarMedida, SubirImagenProducto, AgregarColorProducto, AgregarMedidaProducto, ELiminarColorDeProducto, ActualizarProducto, BuscarImagenes, ExtraerEquipos, ExtraerJugadores, ExtraerColores, ExtraerColoresProducto, ExtraerMedidas, ExtraerMedidasProducto, EliminarColaborador, CrearColaborador, MostrarUsuarios, estadisticas, mostrar_productos, agregar_producto, ObtenerTipos, AgregarCategoria, CambiarEstado, login, EliminarProducto } = require('./auth')


router.get('/mostrarTallas', MostrarTalla)
router.get('/estadisticas', estadisticas)
router.get('/mostrarProductos', mostrar_productos)
router.post('/agregarProducto', agregar_producto)
router.get('/categorias', ObtenerTipos)
router.post('/agregarCategoria', AgregarCategoria)
router.post('/cambiarEstado', CambiarEstado)
router.post('/login', login)
router.post('/verificarToken', VerificarToken)
router.post('/eliminarProducto', EliminarProducto)
router.get('/mostrarUsuarios', MostrarUsuarios)
router.post('/agregarColaborador', CrearColaborador)
router.get('/eliminarColaborador', EliminarColaborador)
router.get('/modificarTProducto', ModificarProductoTipo)

router.get('/equipos', ExtraerEquipos)
router.get('/jugadores', ExtraerJugadores) 
router.get('/colores', ExtraerColores)
router.get('/coloresProducto', ExtraerColoresProducto)
router.get('/medidas', ExtraerMedidas)
router.get('/medidasProducto', ExtraerMedidasProducto)
router.get('/mostrarMedida', MostrarMedida)
router.get('/buscarImagenMedida', BuscarImagenMedida)

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

router.post('/agregarJugador', AgregarJUgador)
router.get('/mostrarJugador', MostrarJugador)
router.get('/modificarJugador', ModificarJugador)

router.get('/modificarStock', ModificarStockInvenario)
router.get('/modificarEstado', ModificarEstado)
router.get('/obtenerListaIMG', obtenerListaIMG)
router.get('/ObtenerIMG', ObtenerIMG)
router.get('/obtenerAdmin', ObtenerAdmin)
router.post('/modificarAdmin', ModificarAdmin)
router.post('/ModificarCAdmin', ModificarContraAdmin)
router.post('/ModificarCCEmail', ModifictContraConEmail)

module.exports = router