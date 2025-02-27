const { query } = require('express')
const db = require('../Databases/Databases')
const  appModule = require('../app')
const fs =  require('fs').promises
const jwt = require('jsonwebtoken');
const path = require('path')
const multer = require('multer');
const { log, error } = require('console')
const bcrypt = require('bcrypt');
const { arch } = require('os');
const { json } = require('stream/consumers');
const express = require('express');
const { v4: uuidv4, v4, v1, v3} = require('uuid')


const pathN = {
    '/editarEquipo': 'logos',
    '/agregarTalla': 'medidas',
    '/agregarCategoria': 'tipo',
    '/agregarJugador': 'jugadores'
}

const estadisticas = async (req, res) => {

    const tiempo = req.query.tiempo
    const tiempo2 = req.query.tiempo2
    console.log(tiempo);
    

    try {
        
           
        const [rows] =   await db.query('SELECT COUNT(*) AS total FROM sesion WHERE horaInicio >= NOW() -INTERVAL ? DAY', [tiempo])
        const [ventas] = await db.query('SELECT COUNT(*) AS total FROM venta WHERE fechaPago >= NOW() -INTERVAL ? DAY', [tiempo])
        const [ventadetalle] = await db.query('SELECT COUNT(*) AS total FROM ventadetalle WHERE fechaAlta >= NOW() -INTERVAL ? DAY', [tiempo])

        const [clientes] = await db.query('SELECT COUNT(*) AS total FROM cliente WHERE fechaInicio >= NOW() -INTERVAL ? DAY', [tiempo2])
        const [registrados] = await db.query('SELECT COUNT(*) AS total FROM usuario WHERE fechaAlta >= NOW() -INTERVAL ? DAY', [tiempo2])

        res.json({rows, ventas, ventadetalle, clientes, registrados})

    } catch (error) {
        console.log(error);
    }
}

const mostrar_productos = async (req, res) => {

    const id = req.query.id
    const filtro = req.query.filtro
    const busqueda = req.query.busqueda

    console.log( 'filtro: ' +  filtro);

    console.log('busqueda: ' + busqueda);
    
    
    //console.log("mostrar_productos = async (req, res):id=", id);

    const orden = {
        '00': ` `,
        '01': 'ORDER BY p.descripcion ASC',
        '10': 'ORDER BY tipoNombre ASC',
        '010': 'ORDER BY j.nombre ASC'
    } 

    const cuando = {
        '00': ' ',
        '100': ' AND estado = 1',
        '101': ' AND estado = 0'
    }

    console.log(cuando[filtro] || 'no se pollo');
    console.log(orden[filtro] || 'no se polli');
    
    const ordo = orden[filtro] || ''
    const when = cuando[filtro] || ''

    try {
        
        //const [productos] = await db.query('SELECT p.descripcion, p.precio, p.estado, p.id, p.idTipo, COUNT(c.id) AS variantes FROM producto p LEFT JOIN colores_producto c ON p.id = c.idProducto WHERE activo = 1 GROUP BY p.id ')

        const [productos] = await db.query("SELECT p.* "
            + ", Ifnull(t.nombre,'') AS tipoNombre    , t.activo AS tipoActivo "
            + ", Ifnull(e.nombre,'') AS equipoNombre  , e.activo AS equipoActivo "
            + ", Ifnull(j.nombre,'') AS jugadorNombre , j.activo AS jugadorActivo, Ifnull(j.apodo,'') AS jugadorApodo, Ifnull(j.numero,'') AS jugadorNumero "
            + ", COUNT(c.id) AS variantes "
            + " FROM producto p "
            + " LEFT JOIN equipo e           ON e.id = p.idEquipo "
            + " LEFT JOIN jugador j          ON j.id = p.idJugador "
            + " LEFT JOIN tipoproducto t     ON t.id = p.idTipo "
            + " LEFT JOIN colores_producto c ON p.id = c.idProducto "
            + " WHERE p.activo = 1 "
            + `${cuando[filtro] || ''}`
            + "  AND  p.id = Case When ? = 0 Then p.id else ? End " 
            + ` AND p.descripcion LIKE "%${busqueda}%"`
            + " GROUP BY p.id "
            + `${ordo}`, [id, id]
        )
        //console.log("mostrar_productos(query):", productos);

        console.log('Los produictos son: ');
         console.log(ordo)
         console.log(cuando[filtro])
        console.log(busqueda)
        
         
        res.json(productos)
        
    } catch (error) {
        console.log(error);
        
    }
}

const agregar_producto = async (req, res) => {
    console.log('agregar_producto = async (req, res)');

    const { nombre, precio, tipo, coloresID, equipo, jugador, numero, stock, estatus, medidasID } = req.body
    let qEquipo = null    
    if(equipo > 0){
        qEquipo = parseInt(equipo)
    }
    let qNumero = null 

    console.log(jugador);
    console.log(typeof(jugador));
    console.log('El numnero es: ' + numero);
    console.log('Los colores id: ' + coloresID);
    
    
    
    if(numero == null || numero == 'null'){
        console.log('pasamos por null');
        
        qNumero = null
    } else {

        qNumero = numero
    }

    if (jugador == "") {
        
        qJugador = null
        console.log('La id es');
        console.log(qJugador);
        
        
    } else {

        qJugador = jugador
    }
    
    if (tipo.length == 0) {
        
        qTipo = null
    } else {

        qTipo = tipo
    }

    if (precio == "") {
         qPrecio = null
    } else {
        qPrecio = precio
    }
    

    try {
            
        const { nanoid } = await import('nanoid');
        
        const idNano = nanoid(10)

        const row = await db.query('INSERT INTO producto (id, idTipo, descripcion, idEquipo, idJugador, numero, precio, stock, estado) VALUES (?,?,?, ?,?, ?,?,?,?)'
            , [idNano, qTipo, nombre, qEquipo, qJugador, qNumero, qPrecio, stock, estatus])

        console.log("agregar_producto: row: ");
        console.log(row[0]);
        

        if (row[0].affectedRows) {

            console.log('Se a insertado una ID');
            console.log('Se van a insertar los colores: ' + coloresID);
            

            coloresID.forEach(async element => {
                const rowC = await db.query('INSERT INTO productocolor (idProducto, idColor) VALUES (?,?)', [idNano, element])
                console.log("AgregandoProductoColor: " + rowC);
            })

            console.log('Se van a insertar las medidas: ' + medidasID);
            
            

            if (medidasID) {
                
                medidasID.forEach(async element => {
                    const rowM = await db.query('INSERT INTO productomedidas (idProducto, idMedida) VALUES (?,?)', [idNano, element])
                    console.log('AgregandoProductoMedidas: ' + rowM);
                })
            }

            
        }

        console.log("row[0].insertId:" , row[0].insertId);

        row.affectedRows == 1 ? 
            res.status(200).json({res: false}):
            res.status(400).json({res: true, id: idNano})
            
    


        
    } catch (error) {
        console.log(error);
    }
}

const ObtenerTipos = async (req, res) => {

    const tipo = req.query.tipo

    console.log('El tipo es: ', tipo);

    let consulta

    if (tipo) {
        consulta = tipo
    } else {
        consulta = '%'
    }
    
    console.log(consulta);
    

    try {

        const [row] = await db.query("SELECT t.nombre, t.activo, t.id, (SELECT COUNT(*) FROM producto p WHERE idTipo = t.id) AS cantidad, case when id='+ tipo +' then 'selected' else '' end as selected  FROM tipoproducto t Where t.activo = 1 AND t.id LIKE ?" , [consulta])

        /*
        row.forEach((element, indice) => {
            console.log(element.activo[0]);
        })
        console.log("ObtenerTipos:", row);
        */

        
        
        res.json(row)

    } catch (error) {
        
        console.log(error);
        
    }
    
}

const AgregarCategoria = async (req, res) => {

    const { nombre } = req.body

    try {
        
        const [row] = await db.query('INSERT INTO tipoproducto (nombre, activo) VALUES (?,?)', [nombre, 1])

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const CambiarEstado = async (req, res) => {

    const { id, estado } = req.body
    console.log("CambiarEstado:", req.body);

    try {
        
        const row = await db.query('UPDATE producto SET estado = ? WHERE id = ?' , [estado, id])

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const login = async (req, res) => {

    const { correo, pass } = req.body
    const userAgent = req.query.agent    

    try {
        
        const sqlExiste = 'SELECT EXISTS ( SELECT 1, password FROM (SELECT * FROM usuario WHERE role = "admin") AS admins WHERE email = ?) AS resultado'
        console.log(sqlExiste);
        

        const [existe] = await db.query(sqlExiste, correo)
           
        if (existe[0].resultado == 1) {

            const [hash] = await db.query('SELECT password FROM usuario WHERE email = ?', [correo])
           
            const esValido = await bcrypt.compare(pass, hash[0].password)
            if (esValido) {

                const [datos] = await db.query('SELECT id, name,  email, Nombres, ApellidoPrimero, ApellidoSegundo FROM usuario WHERE email = ?', [correo])
            
                const token = jwt.sign(datos[0], 'adpabasta', {expiresIn: '7d'})

                console.log(datos);
                

                await db.query('INSERT INTO sesion (idUsuario, navegador) VALUES (?,?)', [datos[0].id, userAgent])
                
                console.log(token);
                
                res.cookie('token', token, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: false,  
                    sameSite: 'Lax'
                });

                res.json({esValido})
            } else {
                res.json({esValido})
            }
            
        }
        

    } catch (error) {
        console.log(error);
        
    }
}

const VerificarToken = async (req, res) => {

    const token = req.cookies?.token
    
    console.log('token: ', token)
    
    if (!token) return res.json({autentificacion: false})

    jwt.verify(token, 'adpabasta', (error, usuario) => {
        if (error) {
            return res.json({autentificacion: false})
        }

        console.log(usuario);
        
        return res.json({
            autentificacion: true, 
            nombre: usuario.Nombres,
            ape: usuario.ApellidoPrimero
        })
    })
}

const EliminarProducto = async (req, res) => {

    const { id } = req.body

    try {

        const [row] = await db.query('UPDATE producto SET activo = 0 WHERE id = ?', [id])
        console.log("EliminarProducto:", row);
        
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const MostrarUsuarios = async (req, res) => {

    try {
        
        const [row] = await db.query('SELECT name, role, fechaAlta, id FROM usuario WHERE activo = 1')  //role = "admin"

        console.log("MostrarUsuarios:", row);
        
        
        res.json([row])

    } catch (error) {
        console.log(error);
        
    }
}

const EliminarColaborador = async (req, res) => {

    const id = req.query.id

    try {
        
        const row = await db.query('UPDATE usuario SET Activo = 00 WHERE id = ?', [id])

        console.log("EliminarColaborador:", row);
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const CrearColaborador = async (req, res) => {

    const { nombre, pass, apePa, apeMa, email, fecha } = req.body    

    console.log(nombre);
    console.log(pass);
    

    try {
        
        const saltrounds = 19

        const hash = await bcrypt.hash(pass, saltrounds)

        const date = new Date()
        console.log();
        

        const row = await db.query('INSERT INTO usuario (name, email, password, Nombres, ApellidoPrimero, ApellidoSegundo, fechaNacimiento, role, verificado) VALUES (?,?,?,?,?,?,?,?,?)', [nombre, email, hash, nombre, apePa, apeMa, fecha,  'admin', 1])
        console.log(row);
        
        res.json([row])

    } catch (error) {
        console.log(error);
        
    }
}

const ExtraerEquipos = async (req, res) => {
    console.log('ExtraerEquipos:', req.query);

    const id = req.query.id
    
    try {
        
        const [row] = await db.query("SELECT e.*, CAse when e.id=? then 'selected' Else '' End as selected  FROM equipo e WHERE e.activo = 1  Order by orden asc", [id])
        //console.log('query:',row);

        res.json({row})
    } catch (error) {
        console.log(error);
        
    }
}

const ExtraerJugadores = async (req, res) => {
    console.log('ExtraerJugadores:', req.query);
    const id = req.query.id
    
    try {        
        const [row] = await db.query("SELECT id, idEquipo, apodo, nombre, numero , activo, fechaAlta, CAse when id=? then 'selected' Else '' End as selected  FROM jugador WHERE activo = 1 ", [id])
     //   console.log('query:',row);

        res.json({row})
    } catch (error) {
        console.log(error);        
    }
}

const ExtraerColores = async (req, res) => {

    const id  = req.query.id
    console.log("ExtraerColores/req.query:", req.query);

    try {
        
        const [row] = await db.query("SELECT id, nombre, hexadecimal, clave, activo, CAse when id=? then 'selected' Else '' End as selected FROM color WHERE activo = 1 ", [id])
        //console.log("ExtraerColores/req.query:", row);

        res.json({row})
    } catch (error) {
        console.log("Error:", error);
        
    }
}

const ExtraerColoresProducto = async (req, res) => {

    const idProducto = req.query.id

    //console.log("ExtraerColoresProducto/req.query:", req.query);

    try {        
        const [row] = await db.query('SELECT pc.idProducto, pc.idColor, c.nombre, c.hexadecimal, c.clave FROM productocolor pc Inner Join color c On c.id=pc.idColor WHERE idProducto = ?', [idProducto])

       console.log("ExtraerColoresProducto/row:" + idProducto + ":" + row.length);

        res.json({row})
    } catch (error) {
        console.log(error);
        
    }
}

const BuscarImagenes = async (req, res) => {

    const id = req.query.id

    try {
        
        const directorio = path.join(__dirname, '..', '..', '..', 'img', 'articulos')
        const archivos = await fs.readdir(directorio)

        const archivosFiltrado = archivos
        .filter(archivo => archivo.startsWith(id + '_') || archivo.startsWith(id + '.'))
        .map(archivo => ({
            nombre:archivo,
            rutaCompleta: path.join(directorio, archivo)
        }))

        res.json(archivosFiltrado)

    } catch (error) {
        console.log("Error_BuscarImagenes:", error);        
    }
}

const BuscarImagenEquipo = async (req, res) => {

    const id = req.query.id

    try {
        
        const directorio = path.join(__dirname, '..', '..', '..', 'img', 'logos')
        const archivo = await fs.readdir(directorio)

        const archivoFiltrado = archivo
        .filter(arch => arch.startsWith(`logo_${id}.`))
        .map(arch => ({
            name:arch,
            rutaCompleta: path.join(directorio, arch),
            nombre: path.extname(arch)
        }))

        console.log("BuscarImagenEquipo:", archivoFiltrado);
        

        res.json(archivoFiltrado)

    } catch (error) {
        console.log(error);
        
    }
}

const BuscarImagenMedida = async ( req, res) => {

    const id = req.query.id

    try {
        
        const directorio = path.join(__dirname, '..', '..', '..', 'img', 'medidas')
        const archivo = await fs.readdir(directorio)

        const archivoFiltrado = archivo
        .filter(arch => arch.startsWith(`${id}.`))
        .map(arch => ({
            name:arch,
            rutaCompleta: path.join(directorio, arch),
            nombre: path.extname(arch)
        }))

        console.log(archivoFiltrado);
        

        res.json(archivoFiltrado[0])

    } catch (error) {
        console.log(error);
        
    }
}

const BuscarImagen = async (req, res) => {

    const id = req.query.id
    const directorio = req.query.directorio

    try {
        
        const filePath = path.join(__dirname, '..', '..', '..', 'img', directorio)
        const archivo = await fs.readdir(filePath)

        const archivoFiltrado = archivo
        //.filter(arch => arch.startsWith(`${id}`.))

    } catch (error) {
        
    }

}

const EliminarImagen = async (req, res) => {

    const dir = req.query.directorio
    const id = req.query.name

    console.log('url original: ' + req.originalurl);
    console.log(req.get('host'));

    console.log(id);
    
    const directorio = path.join(__dirname, `../../../${id}`)

    try {
        console.log("EliminarImagen:", id);
        
        await fs.unlink(directorio)
        res.json('se elimino la imagen')

    } catch (error) {
        console.log(error);
        
    }
}

const ActualizarProducto = async (req, res) => {
    console.log("ActualizarProducto/req.body:", req.body);

    const { id, descripcion, precio, tipo, equipo, jugador, 
        numero, estado, stock, imagenes, coloresID, medidasID } = req.body
        // nombre, precio, tipo, equipo, jugador, numero, stock, stado, imagenes, coloresID, medidasID
    
    let sNumero 
    let sequipo = '' 
    let sjugador = jugador
    if(numero == '' || numero == undefined || numero == null ) { sNumero = null }
    if(jugador == '-1' || jugador == undefined || jugador == null ) { sjugador = null }
    if(equipo == '-1' || equipo == undefined || equipo == null ) { sequipo = 0 }

    try {
        const row = await db.query('UPDATE producto SET idTipo = ?, descripcion = ?, idEquipo = ?, idJugador = ?, numero = ?, precio = ?, estado = ?, stock = ? WHERE id = ? '
            , [tipo, descripcion, equipo, sjugador, sNumero, precio, estado, stock, id])
        
            //console.log("ActualizarProducto:row:", row);
        res.json(row)
    } catch (error) {
        console.log(error);        
    }

    try {
        const existe = await db.query('SELECT EXISTS ( SELECT 1 FROM productocolor WHERE idProducto = ? ) AS resultado', [id])
        //console.log("ActualizarProducto/existe:", existe[0].existe);        
        let coloresIDs = coloresID
        console.log('Resultado existe: : ');
        console.log(existe[0][0]);
        
        
        console.log("ActualizarProducto/coloresID:", coloresIDs);        
        if (existe[0][0].resultado > 0) {
            const borrar = await db.query('DELETE FROM productocolor WHERE idProducto = ? ', [id])    
        }

        const row2 = await db.query('INSERT INTO productocolor (idProducto, idColor) Select ? as idProducto, id  From color c Where id in ( ? ) ', [id, coloresIDs])

        console.log("ActualizarProducto:row Insert:", row2);
        res.json(row2)

    } catch (error) {
        console.log(error);
    }    

    try {
        const existe2 = await db.query('SELECT EXISTS ( SELECT 1 FROM productomedidas WHERE idProducto = ?) AS resultado ', [id])
        //console.log("ActualizarProducto/existe:", existe2.existe);                
        console.log("ActualizarProducto/medidasID:", medidasID);        
        console.log("BusquedaMedidas: ", existe2[0][0]);
        
        if (existe2[0][0].resultado > 0) {
            const borrar = await db.query('DELETE FROM productomedidas WHERE idProducto = ?', [id])
        }

        const row3 = await db.query('INSERT INTO productomedidas (idProducto, idMedida) Select ? as idProducto, id From medida c Where id in ( ? ) ', [id, medidasID])
        res.json(row3)

    } catch (error) {
        console.log(error);
    }    

}

const ELiminarColorDeProducto = async (req, res) => {

    const { idProducto, idColor } = req.body

    let sColor = " "
    if (idColor>0){
        sColor = " AND idColor = " + idColor
    }

    try {
        const row = db.query('DELETE FROM productocolor WHERE idProducto = ? ?', [idProducto, sColor])
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const AgregarColorProducto = async (req, res) => {
    const { idProducto, idColor } = req.body
    console.log("AgregarColorProducto = async (req, res):", req.body);
    try {
        const [existe] = await db.query('SELECT EXISTS (SELECT 1 FROM productocolor WHERE idProducto = ? AND idColor = IfNull(?,0)) AS existe', [idProducto, idColor])
        
        console.log("AgregarColorProducto/existe:", existe[0].existe);
        
        if (existe[0].existe != 1) {            
            const row = await db.query('INSERT INTO productocolor (idProducto, idColor) VALUES (?,?)', [idProducto, idColor])
            res.json(row)
        }
    } catch (error) {
        console.log(error);
    }
}

const AgregarMedidaProducto = async (req, res) => {
    const { idProducto, idMedida } = req.body

    try {
        const [existe] = await db.query('SELECT EXISTS (SELECT 1 FROM productomedidas WHERE idProducto = ? AND idMedida = ?) AS existe', [idProducto, idMedida])
        
        console.log("AgregarMedidaProducto/existe:", existe[0].existe);
        
        if (existe[0].existe != 1) {            
            const row = await db.query('INSERT INTO productocolor (idProducto, idMedida) VALUES (?,?)', [idProducto, idMedida])
            res.json(row)
        }
    } catch (error) {
        console.log(error);
    }
}

// Configurar el almacenamiento con Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Aquí se especifica el directorio donde se guardarán las imágenes
        cb(null, path.join(__dirname));
    },
    filename: function (req, file, cb) {

        const { id } = req.body
        // Verificar que el ID esté disponible
        if (!id) {
            return cb(new Error('ID no proporcionado en el body'), false);
        }
        

        // Personaliza el nombre del archivo
        cb(null, id + path.extname(file.originalname)); // Agrega la extensión original
    }
});

// Inicializar el middleware de Multer
const upload = multer({ storage: storage });

const SubirImagenProducto = async (req, res) => {

    try {

        // Se utiliza `upload.single` para manejar la subida de la imagen
        upload.single('image')(req, res, function (err) {
            if (err) {
                return res.status(400).send(err.message);
            }

            // Verifica si se ha subido un archivo
            if (!req.file) {
                return res.status(400).send('No se ha subido ningún archivo.');
            }

            const { id } = req.body
            if (!id) {
                return res.status(400).send('Faltan datos adicionales.');
            }

            console.log("SubirImagenProducto:", id);
            
            res.send({
                message: 'Imagen subida correctamente',
                filename: req.file.filename,
                data: {
                    id
                }
            })

            // Aquí puedes procesar más la imagen o guardarla en la base de datos
            res.send(`Imagen subida exitosamente: ${req.file.filename}`);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al subir la imagen.');
    }
}

const EliminarColor = async (req, res) => {

    const id = req.body.id

    try {
        
        const [row] = await db.query('UPDATE color SET activo = 00 WHERE id = ?' , [id])
        
        console.log(row);
        
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const AgregarColor = async (req, res) => {

    const { nombre, color } = req.body

    let clave = nombre.slice(0,3).toUpperCase()

    console.log("AgregarColor:", req.body);
    
    try {
        
        const [existe] = await db.query('SELECT EXISTS (SELECT 1 FROM color WHERE nombre = ? OR hexadecimal = ?) AS existe', [nombre, color])

        console.log(existe);

        if (existe[0].existe == 0) {
            
            const [existeClave] = await db.query('SELECT COUNT(*) AS cantidad FROM color WHERE clave LIKE ?', [clave + '%'])

            console.log(existeClave);

            if (existeClave[0].cantidad >= 1 ) {
                
                clave += existeClave[0].cantidad + 1
            }

            console.log(clave);
            

            const [row] = await db.query('INSERT INTO color (clave, nombre, hexadecimal) VALUES (?,?,?)', [clave, nombre.toUpperCase(), color])
            res.json(row)
        }

    } catch (error) {
        
        console.log(error);
        
    }
}

const ModificarColor = async (req, res) => {

    const { id, nombre, color } = req.body

    try {
        
        const [row] = await db.query('UPDATE color SET nombre = ?, hexadecimal = ? WHERE id = ?', [nombre, color, id])

        console.log("ModificarColor:", row);
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}




const EliminarMedida = async (req, res) => {

    const id = req.body.id

    console.log(id);
    
    
    try {
        
        const [row] = await db.query('UPDATE medida SET activo = 0 WHERE id = ?' , [id])
        
        res.json(row)

        

    } catch (error) {
        console.log(error);
        
    }
}

const AgregarMedida = async (req, res) => {

    const { nombre, descripcion  } = req.body

    try {
        
        const [row] = await db.query('INSERT INTO medida (nombre, descipcion) VALUES (?,?)', [nombre, descripcion])

        console.log(row);

        row.affectedRows === 1
            ? res.json({message: 'Se agrego correctamente la Talla nueva', res: true, id: row.insertId})
            : res.json({message: 'No se pudo agregar correctamente la Talla nueva'})    

    } catch (error) {
        console.log(error);
        
    }
}

const ModificarMedida = async (req, res) => {

    const { id, nombre, descripcion } = req.body

    try {
        
        const [row] = await db.query('UPDATE medida SET nombre = ?, descipcion = ? WHERE id = ?', [nombre, descripcion, id])

        console.log(row);

        row.changedRows === 1
            ? res.json({message: 'Se a actualiozado correctamente la talla', res: true})
            : row.changedRows === 0 && row.affectedRows === 1
            ? res.json({message: 'Cambia un valor para poder actualizar', res: false})
            : res.json({message: 'No se pudo actualiozar correctamente la talla', res: false})

        

    } catch (error) {
        res.json({message: error.sqlMessage})
    }
}




const ModificarCategoria = async (req, res) => {

    const { id, nombre } = req.body

    try {
        
        const [row] = await db.query('UPDATE tipoproducto SET nombre = ? WHERE id = ?', [nombre, id])

        row.changedRows === 1
            ? res.json({message: 'Se actualizao la categora'})
            : row.changedRows === 0 && row.affectedRows === 1
                ? res.json({message: 'Para actualizar introduce datos diferentes'})
                : res.json({message: 'No se pudo actulizar la categoria'})

    } catch (error) {
        console.log(error);
        
    }
}

const EliminarCategoria = async (req, res) => {

    const { id } = req.body
    try {
        
        const [row] = await db.query('UPDATE tipoproducto SET activo = 0 WHERE id = ?', [id])

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const MostrarCompras = async (req, res) => {

    try {
        
        const [row] = await db.query('SELECT v.id AS "id_venta", vd.id AS "id_detalle", ' + 
                'vd.idProducto, vd.cantidad, vd.total, v.fechaPago, ' +
                'vd.estadoEnvio, vd.fechaAlta, vd.idMedida, ' + 
                'v.noPedido, v.Total, v.noGuia, v.idCliente, ' +
                'p.descripcion, m.nombre ' +  
            'FROM venta v ' + 
            'LEFT JOIN ventadetalle vd ' + 
            'ON v.id = vd.idVenta ' + 
            'LEFT JOIN producto p ' +
            'ON vd.idProducto = p.id ' + 
            'LEFT JOIN medida m ' + 
            'ON vd.idMedida = m.id ' + 
            'ORDER BY v.id ASC'
        )
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const MostrarPedidos = async (req, res) => {

    try {
        
        const [row] = await db.query('SELECT v.id, v.idVenta, v.idProducto, v.estadoEnvio, v2.noGuia, v2.noPedido FROM ventadetalle v JOIN venta v2 on v.idVenta = v2.id')

        let productos = []
        
        for (const element of row) {
            
            const [producto] = await db.query('SELECT descripcion FROM producto WHERE id = ?', [element.idProducto])
            
            productos.push(producto[0])
        }

        res.json({row, productos})

    } catch (error) {
        console.log(error);
        
    }
}

const ModificarNoGuia = async (req, res) => {

    const id = req.query.id
    const No = req.query.numero

    try {
        
        const [row] = await db.query('UPDATE venta SET noGuia = ? WHERE id = ?', [No, id])
        res.json(row)

    } catch (error) {
        res.json({message: "algo salio mal"})
        
    }
}

const ModificarEstatusEntrega = async (req, res) => {

    const id = req.query.id
    const estatus = req.query.estatus

    try {
        console.log("ModificarEstatusEntrega(req, res) id:estatus"+ id +':'+ estatus);
        
        const [row] = await db.query('UPDATE ventadetalle SET estadoEnvio = ? WHERE id = ?', [estatus, id])

        res.json(row)

    } catch (error) {   
        console.log(error);
        
    }
}


const MostrarTalla = async (req, res) => {

    try {
        
        const [row] = await db.query('SELECT v.id, v.nombre, v.activo, v.fechaAlta FROM medida v WHERE activo = 1 ')

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const ExtraerMedidas = async (req, res) => {

    const id = req.query.id

    console.log("Medidas: " + id);

    try {
        const [row] = await db.query("SELECT v.id, v.nombre, v.descipcion, v.activo, v.fechaAlta, case when id=? then 'selected' else '' end as selected  FROM medida v WHERE activo = 1 ", [id])
        //const [rows] = await db.query('SELECT idMedida FROM productomedidas WHERE idProducto = ?', [id])

        console.log(row);
        

        res.json({row})    //({row, rows})

    } catch (error) {
        console.log(error);
        
    }
}

const MostrarMedida = async (req, res) => {

    const id = req.query.id

    try {
        
        const [row] = await db.query('SELECT nombre, descipcion FROM medida WHERE id = ? ', [parseInt(id)])

        console.log(row[0]);
        

        res.json(row[0])

    } catch (error) {
        console.log(error);
        
    }
}

const ExtraerMedidasProducto = async (req, res) => {

    const id = req.query.id


    try {        

        console.log(id);
        

        const [row] = await db.query('SELECT pm.idProducto, pm.idMedida, v.nombre, v.descipcion, v.activo FROM productomedidas pm inner join medida v ON v.id=pm.idMedida WHERE pm.idProducto = ?', [id])
        console.log("ExtraerMedidasProducto/row:", id+":"+row.length);

        console.log("ExtraerMedidasProducto/row:" +  row);
        console.log(row);
        
        res.json({row})

    } catch (error) {
        console.log(error);
        
    }
}




const MostrarEquipos = async (req ,res) => {

    try {
        
        const [row] = await db.query('SELECT * FROM equipo WHERE activo = 1 Order By orden')

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const AgregarEquipo = async (req, res) => {

    const { nombre } = req.body

    try {

        const [mayor] = await db.query('SELECT MAX(orden) AS maximo FROM equipo')
        console.log(mayor);
        
        const [row] = await db.query('INSERT INTO equipo (nombre, orden, activo) VALUES (?,?, 1)', [nombre, mayor[0].maximo + 1])

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const EliminarEquipo = async (req, res) => {

    const id = req.query.id


    console.log(id);
    

    try {
        
        const [row] = await db.query('UPDATE equipo SET activo = 0 WHERE id = ?', [id])

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const ModificarEquipo = async (req, res) => {

    const nombre = req.query.name 
    const id = req.query.id

    console.log("ModificarEquipo:", req.query);
    
    try {
        
        const [row] = await db.query('UPDATE equipo SET nombre = ? WHERE id = ?' , [nombre, id])

        console.log('EL equipo se :', row);

        if (row.changedRows == 1) {
            
            return res.json({res: true, message: 'Cambios guardados exitosamente'})
        }
    
        return res.json({message: 'No se pudieron guardar lo cambios'})

    } catch (error) {
        console.log(error);
        
    } 
}

const ObtenerJugadores = async (req, res) => {

    let id = req.query.id
    //let idEquipo = req.query.idEquipo
    
    try {
        
        const [row] = await db.query("SELECT id, IfNull(apodo,'') as apodo, nombre, numero, case when id=? then 'selected' else ' '  end as selected FROM jugador  ", [id])

        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const ObtenerBanners = async (req, res) => {

    try {
        
        const directoruPath = path.join(__dirname, '../../../img/banners/')

        const files = await fs.readdir(directoruPath)

        /*const content = []

        for (let file of files) {
            
            const filePath = path.join(directoruPath, file)
            content.push(await fs.readFile(filePath, 'utf8'))
        }*/

        
        

        
        res.json(files)

    } catch (error) {
        console.log(error);
        
    }
}

const AgregarBanner = async (req, res) => {

    
}

const ModificarProductoTipo = async (req, res) => {

    try {
        
        const id = req.query.id;
        const idTipo = req.query.tipo;

        console.log(id);
        

        const [row] = await db.query('UPDATE producto SET idTipo = ? WHERE id = ?;', [idTipo, id]);
        console.log(row);
        
        res.json(row)

    } catch (error) {
        
    }
}

const AgregarJUgador = async (req, res) => {

    try {
        
        const { nombre, apodo, numero, equipo } = req.body

        console.log(nombre);
        console.log(apodo);
        console.log(numero);
        console.log(equipo);
        

        const [row] = await db.query('INSERT INTO jugador (idEquipo, apodo, nombre, numero, activo, fechaAlta) VALUES (?,?,?,?,1,CURRENT_TIMESTAMP)', [equipo, apodo, nombre, numero])

        console.log(row);
        
        res.json(row)
    } catch (error) {
        console.log(error);
        
    }
}

const MostrarJugador = async (req, res) => {

    try {
        
        const id = req.query.id

        const [row] = await db.query('SELECT nombre, apodo, idEquipo, numero FROM jugador WHERE id = ?', [id])

        res.json(row[0])

    } catch (error) {
        
    }
}

const ModificarJugador = async (req, res) => {

    try {
        
        const id = req.query.id
        const equipo = req.query.equpo
        const nombre = req.query.nombre
        const apodo = req.query.apodo
        const numero = req.query.numero

        console.log(id);
        console.log(equipo);
        console.log(nombre);
        console.log(apodo);
        console.log(numero);
        

        const [row] = await db.query('UPDATE jugador SET idEquipo = ?, nombre = ?, apodo = ?, numero = ? WHERE id = ?', [equipo, nombre, apodo, numero, id])

        console.log(row);
        

        res.json(row)

    } catch (error) {
        
    }
}

const ModificarStockInvenario = async (req, res) => {


    const id = req.query.id
    const stock = req.query.stock

    console.log(stock);
    console.log(id);
    
    try {
        const [row] = await db.query('UPDATE producto SET stock = ? WHERE id = ?', [stock, id])

        console.log(row);

        res.json(row)
    } catch (error) {
        
    }
}

const ModificarEstado = async (req, res) => {

    const id = req.query.id
    const estado = req.query.estado

    console.log(id)
    console.log(estado)
    

    try {
        const [row] = await db.query('UPDATE producto SET estado = ? WHERE id = ?', [parseInt(estado), parseInt(id)])

        console.log(row);

        res.json(row)
    } catch (error) {
        console.log(error);
        
    }
    
}

const obtenerListaIMG = async (req, res) => {

    const urlCompleta = req.query.path

    console.log('la url completa es: ' + urlCompleta);

    const pathN = {
        '/catalogoequipos': 'logos',
        '/catalogotallas': 'medidas',
        '/MostrarCategorias': 'tipo',
        '/productos': 'articulos',
        '/jugadores': 'jugadores',
        '/agregarJugador': 'jugadores',
        '/inventario': 'articulos',
        '/agregarBanner': 'banners'
    }

    const directorio = path.join(__dirname, `../../../img/${pathN[urlCompleta]}`)    
    
    console.log(directorio);
    

    const files = await fs.readdir(directorio)

    console.log(files);
    

    res.json(files)
    
}

const ObtenerIMG = async (req ,res) => {

    const url = req.query.path
    const id = req.query.id

    

    const directorio = path.join(__dirname, `../../../img/${pathN[url]}`)    
    const archivos = await fs.readdir(directorio)

    archivos.forEach(element => {

        if (path.parse(element).name === id) {
            res.json(element)
        }
    })

}

const ObtenerAdmin = async ( req, res) => {

    const id = req.query.id     

    console.log(id);
    

    try {

        const [row] = await db.query('SELECT Nombres, ApellidoPrimero, ApellidoSegundo, email, fechaNacimiento  FROM usuario WHERE id = ?', [id])
        console.log(row);
        
        res.json(row)
        
    } catch (error) {
        
    }
}

const ModificarAdmin = async (req, res) => {

    const { id, nombre, apeP, apeS, email, fecha} = req.body

    console.log(id);
    console.log(nombre);
    console.log(apeP);
    console.log(apeS);
    console.log(email);
    console.log(fecha);

    try {
        
        const [row] = await db.query('UPDATE usuario SET nombres = ?, apellidoprimero = ?, apellidosegundo = ?, email = ?, fechaNacimiento = ? WHERE id = ?', [nombre, apeP, apeS, email, fecha, id])
        console.log(row);

        res.json(row)
        

    } catch (error) {
        console.log(error);
        
    }
}

const ModificarContraAdmin = async (req, res) => {

    const {id, c, cc} = req.body
    
    try {
        
        if (!id || !c || !cc) {
            res.status(400).json({error: 'Debes de tener los campos de contraseña'})
        }

        const saltrounds = 19

        const hash = await bcrypt.hash(c, saltrounds)

        const sql = 'UPDATE usuario SET password = ? WHERE id = ?'

        const [result] = await db.query(sql, [hash, id])

        if (result.affectedRows > 0) {
            res.json({msg: 'La contraseña se a cambiado exitosamente'})
        } else {
            res.status(400).json({error: 'Error al cambiar la contraseña'})
        }

    } catch (error) {
        console.log(error);
    }
}

const ModifictContraConEmail = async (req, res) => {

    const {email, name, pass} = req.body

    try {

        if (!email || !name || !pass) {
            res.status(400).json({error: 'Todos los campos deben de ser obligatorios'})
        }

        const saltrounds = 19

        const hash = await bcrypt.hash(pass, saltrounds)

        const sql = 'UPDATE usuario SET password = ? WHERE name = ? AND email = ?'

        const [result] = await db.query(sql, [hash, name, email])

        if (result.affectedRows > 0) {
            res.json({msg: 'Se cambio la contraseña'})
        } else {
            res.status(400).json({error: 'Error al actualizar la contraseña'})
        }

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {ModifictContraConEmail, ModificarContraAdmin, ModificarAdmin, ObtenerAdmin, ObtenerIMG, obtenerListaIMG, VerificarToken, ModificarEstado, ModificarStockInvenario, ModificarJugador, MostrarJugador, AgregarJUgador, ModificarProductoTipo, BuscarImagenMedida, MostrarMedida, ObtenerBanners,  ObtenerJugadores, EliminarImagen, BuscarImagenEquipo, ModificarEquipo, ModificarNoGuia, ModificarNoGuia, MostrarTalla, EliminarEquipo, AgregarEquipo, MostrarEquipos, ModificarEstatusEntrega, MostrarPedidos, MostrarCompras, EliminarCategoria, ModificarCategoria, ModificarColor, AgregarColor, EliminarColor, ModificarMedida, AgregarMedida, EliminarMedida, SubirImagenProducto, AgregarColorProducto, AgregarMedidaProducto, ELiminarColorDeProducto, ActualizarProducto, BuscarImagenes, ExtraerEquipos, ExtraerJugadores, ExtraerColores, ExtraerColoresProducto, ExtraerMedidas, ExtraerMedidasProducto, EliminarColaborador, CrearColaborador, MostrarUsuarios, estadisticas, mostrar_productos, agregar_producto, ObtenerTipos, AgregarCategoria, CambiarEstado, login, EliminarProducto }