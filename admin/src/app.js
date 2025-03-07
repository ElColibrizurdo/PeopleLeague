const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('../src/auth/Routes')
const multer = require('multer')

const uploadFile = multer({dest: '../../img/'});

const app = express()
const http = require('http')
const https = require('https')
const fs = require('fs');
const exp = require('constants')
const cookieParser = require('cookie-parser');
const cors = require('cors')


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))


app.use(cookieParser()); 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/auth', authRoutes)
app.use('/img',express.static(path.join(__dirname, '..', '..', 'img')))

app.use(express.static(path.join(__dirname, '/')))
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'Usuarios', 'IniciarSesion.html'))
})

app.get('/bienvenida', (req, res) => {
    res.sendFile(path.join(__dirname,  'Bienvenido', 'Bienvenido.html'))
})

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'Productos', 'Productos.html'))
})

app.get('/pagos', (req, res) => {
    res.sendFile(path.join(__dirname, 'Compras', 'Compras.html'))
})
app.get('/compras', (req, res) => {
    res.sendFile(path.join(__dirname, 'Compras', 'Compras.html'))
})

app.get('/envios', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pedidos', 'Pedidos.html'))
})
app.get('/pedidos', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pedidos', 'Pedidos.html'))
})

app.get('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pedidos', 'Productos.html'))
})

app.get('/catalogoTallas', (req, res) => {
    res.sendFile(path.join(__dirname, 'CatalogoTallas', 'Tallas.html'))
})
app.get('/agregarTalla', (req, res) => {
    res.sendFile(path.join(__dirname, 'CatalogoTallas', 'AgregarTalla.html'))
})

app.get('/catalogoEquipos', (req, res) => {
    res.sendFile(path.join(__dirname, 'CatalogoEquipos', 'Equipos.html'))
})
app.get('/editarEquipo', (req, res) => {
    res.sendFile(path.join(__dirname, 'CatalogoEquipos', 'AgregarEquipo.html'))
})

app.get('/agregarProducto', (req, res) => {
    res.sendFile(path.join(__dirname, 'NuevoProducto', 'NuevoPorducto.html'))
})

app.get('/MostrarCategorias', (req, res) => {
    res.sendFile(path.join(__dirname, 'Categorias', 'Categorias.html'))
})

app.get('/catalogoEquipos', (req, res) => {
    res.sendFile(path.join(__dirname, 'Equipos', 'Equipos.html'))
})

app.get('/AgregarEquipo', (req, res) => {
    res.sendFile(path.join(__dirname, 'Equipos', 'AgregarEquipo.html'))
})

app.get('/AgregarCategoria', (req, res) => {
    res.sendFile(path.join(__dirname, 'Categorias', 'AgregarCategori.html'))
})

app.get('/inventario', (req, res) => {
    res.sendFile(path.join(__dirname, 'Inventario', 'Inventario.html'))
})

app.get('/admins', (req, res) => {
    res.sendFile(path.join(__dirname, 'Admins', 'Admin.html'))
})

app.get('/crearColaboradores', (req, res) => {
    res.sendFile(path.join(__dirname, 'Admins', 'CrearAdmin.html'))
})

app.get('/catalogoColores', (req, res) => {
    res.sendFile(path.join(__dirname, 'CatalogoColores' ,'Color.html'))
})

app.get('/agregarColores', (req, res) => {
    res.sendFile(path.join(__dirname, 'CatalogoColores' ,'AgregarColor.html'))
})

app.get('/agregarBanner', (req, res) => {
    res.sendFile(path.join(__dirname, 'Banners', 'Banners.html'))
})

app.get('/jugadores', (req, res) => {
    res.sendFile(path.join(__dirname, 'Jugadores', 'MostrarJugadores.html'))
})

app.get('/agregarJugador', (req, res) => {
    res.sendFile(path.join(__dirname, 'Jugadores', 'AgregarJugador.html'))
})

app.get('/agregarUsuario', ( req, res) => {
    res.sendFile(path.join(__dirname, 'Admins', 'CrearAdmin.html'))
})

app.get('/recuperar', (req, res) => {
    res.sendFile(path.join(__dirname, 'Usuarios', 'RecuperarContra.html'))
})


/*
// Require the upload middleware
const upload = require('src/img/articulos');

// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});*/

function deleteExistingImage(name, carpeta,  callback) {
    
    fs.readdir(carpeta, (err, files) => {

        console.log('Imagen a borrar: ' + name);
        console.log('Carpeta de la imagen a borrar: ' + carpeta);
        
        
        const existingFiles = files.find(file => path.parse(file).name === name)

        console.log("Existencia de la iamgen a borrar: " + existingFiles);
        

        if (existingFiles) {
            
            const filePath = path.join(carpeta, existingFiles)
            fs.unlink(filePath, (err) => {
                if (err) return callback(err) 
                callback(null)
            })
        } else {
            callback(null)
        }
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 

        console.log('vamos a sacar la ruta');
        

        let uploadPath

        try {
            const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl 

            const parts = fullUrl.split('?')

            console.log(parts);
            

            if (parts[1] == 'equipo') {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'logos')
            } else if (parts[1] == 'banners') {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'banners')
            } else if (parts[1] == 'categoria') {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'tipo')
            } else if (parts[1] == 'medida') {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'medidas')
            } else if (parts[1] == 'talla') {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'medidas')
            } else if (parts[1] == 'jugadores') {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'jugadores')
            } else {
                uploadPath = path.join(__dirname, '..', '..', 'img', 'articulos')
            }


            cb(null, uploadPath)
        } catch (error) {
            console.log(error);
            cb(error)            
        }      
    },
    filename: function (req, file, cb) {

        const { id } = req.body

        if (!id) {
            return cb(new Error('ID no proporcionado'), false);
        }

        console.log('vamos a sacar los nombres de ruta');
        
        console.log(file);
        

        let filePath 
        let baseName = id 
        

        try {
            console.log('ruta original: ' + req.originalUrl);
            
            const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl 
            
            
            const parts = fullUrl.split('?')
            let uploadDir;

            console.log('La id es: ' + id);
            

            if (parts[1] == 'equipo') {
                
                baseName = 'logo_' + id 
                filePath = path.join(__dirname, '..', '..', 'img', 'logos')
                deleteExistingImage
            } else if (parts[1] == 'banners') {
                
                baseName = id 
                filePath = path.join(__dirname, '..', '..', 'img', 'banners')

            } else if (parts[1] == 'medida') {
                
                baseName = id 
                filePath = path.join(__dirname, '..', '..', 'img', 'medidas')

            } else if (parts[1] == 'talla') {
                
                baseName = id 
                filePath = path.join(__dirname, '..', '..', 'img', 'medidas')

            } else if (parts[1] == 'jugadores') {
                
                baseName = 'j_' + id 
                filePath = path.join(__dirname, '..', '..', 'img', 'jugadores') 

            } else if (parts[1] == 'categoria') {
                
                baseName = id
                filePath = path.join(__dirname, '..','..','img','tipo')

            } else {

                const files = req.files || [];
                filePath = path.join(__dirname, '..', '..', 'img', 'articulos')

                console.log(filePath);
                

                const existingFiles = fs.readdirSync(filePath).filter(f => {
                    return f.startsWith(`${id}`) || f.startsWith(`${id}_`);
                  });

                console.log(existingFiles);
                
            
                  if (existingFiles.length > 0) {
                    // Determinar el índice correcto para el próximo archivo
                    const index = existingFiles.length;
                    baseName = `${id}_${index}`;
                  
                  } else {

                     // Primer archivo: usa el ID como nombre
                     baseName = `${id}`; // Usar la extensión original
                  }

                
                
                
            }

            if (!id) {
                return cb(new Error('ID no proporcionado'), false);
            }
    
            /*if (fs.existsSync(filePath)) {
                baseName = `${baseName}_${Date.now()}${path.extname(file.originalname)}`
            }*/

            console.log('El nombre actual es: ' + baseName);
            

            deleteExistingImage(baseName, filePath, (err) => {
                if (err) {
                    console.log(err);
                    
                }

                baseName = baseName + path.extname(file.originalname)

                console.log(baseName);
                
                cb(null, baseName)
            })

            
        } catch (error) {
            console.log(error);
        }      
    }
})



const upload = multer({storage: storage})

app.post('/upload', upload.array('images'), async  (req, res) => {

    

    /*if (!req.file || req.files.length == 0) {
        return res.status(400).send('No se ha subido ningún archivo.');
      }*/

      const {id} = req.body
      const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        url: `${req.protocol}://${req.get('host')}/img/${file.filename}`
        }));

        

        res.json({
            message: 'Archivos subidos exitosamente',
            data: {
                id,
                files: uploadedFiles
            }
        });
})


/*
app.post('/upload', upload.array('images'), async  (req, res) => {

    

    if (!req.file || req.files.length == 0) {
        return res.status(400).send('No se ha subido ningún archivo.');
      }

      const {id} = req.body
      const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        url: `${req.protocol}://${req.get('host')}/img/${file.filename}`
        }));

        res.json({
            message: 'Archivos subidos exitosamente',
            data: {
                id,
                files: uploadedFiles
            }
        });
})*/

/*
const server = http.createServer(app)

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'asf_2024.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
}

https.createServer(sslOptions, app).listen(443, () => {
    console.log('Servidor HTTPS en accion en el puerto 443 por el sagrado emperador de la humidad postrado en el trono dorado');
    
})*/

// server.listen(8080, () => {

// })



app.listen(3000, () => {
    console.log(`Server corriendo en 3000`);
    
})

module.exports = app