const express = require('express')
const cors = require('cors')

//Creamos el servidor.
const app = express()

//habilitar cors.
app.use(cors())

//Puerto de la app. 
const PORT = process.env.PORT || 3000

//Habilitar express.json. 
app.use(express.json({ extended: true, limit: '30mb' }))

//Import de rutas.
app.use(require('./routes/index'))
    /*app.get('/hola', (req, res) => {
        res.json({ msg: 'Hola mundo' });
    });*/

//Inicia el servidor.
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT} ${new Date().toLocaleTimeString()}`)
})