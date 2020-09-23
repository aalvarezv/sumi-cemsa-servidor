const express = require('express');
const router = express.Router();

const {crearFormulario, listarFormulario, actualizarFormulario, eliminarFormulario, 
       datosFormulario, busquedaFormularios} = require('../controllers/formulario_sertecController');

router.post('/crear', crearFormulario);
router.get('/listar', listarFormulario);
router.put('/actualizar', actualizarFormulario);
router.delete('/eliminar/:nro_orden', eliminarFormulario);
router.get('/datos/:nro_orden', datosFormulario);
router.get('/busqueda/:filtro', busquedaFormularios);

module.exports = router;