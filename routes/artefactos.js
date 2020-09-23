const express = require('express');
const router = express.Router();
const {crearArtefacto, listarArtefacto, actualizarArtefacto, 
       eliminarArtefacto, datosArtefacto, busquedaArtefacto} = require('../controllers/artefactoController');

router.post('/crear', crearArtefacto);
router.get('/listar', listarArtefacto);
router.put('/actualizar', actualizarArtefacto);
router.delete('/eliminar/:codigo', eliminarArtefacto);
//router.get('/datos/:codigo', datosArtefacto);
//router.get('/buscar/:filtro', busquedaArtefacto);

module.exports = router;