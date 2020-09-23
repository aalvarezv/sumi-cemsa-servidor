const express = require('express');
const router = express.Router();
const { crearModelo, listarModelo, actualizarModelo, 
       eliminarModelo, datosModelo, busquedaModelo} = require('../controllers/modeloController');

router.post('/crear', crearModelo);
router.get('/listar', listarModelo);
router.put('/actualizar', actualizarModelo);
router.delete('/eliminar/:codigo', eliminarModelo);
//router.get('/datos/:codigo', datosModelo);
//router.get('/busqueda/:filtro', busquedaModelo);

module.exports = router;