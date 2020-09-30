const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, check } = require('express-validator');
const {crearArtefacto, listarArtefacto, actualizarArtefacto, 
       eliminarArtefacto, datosArtefacto, busquedaArtefacto} = require('../controllers/artefactoController');


router.post('/crear', auth, 
     
     check('codigo').not().isEmpty().withMessage('El codigo es obligatorio.'),
     check('descripcion').not().isEmpty().withMessage('La descripcion es obligatoria.'),crearArtefacto);

router.get('/listar', auth,listarArtefacto);

router.put('/actualizar', auth,
     
     check('codigo').not().isEmpty().withMessage('El codigo es obligatorio.'),
     check('descripcion').not().isEmpty().withMessage('La descripcion es obligatoria.'),actualizarArtefacto);

router.delete('/eliminar/:codigo', auth,eliminarArtefacto);
router.get('/datos/:codigo', datosArtefacto);
router.get('/buscar/:filtro', busquedaArtefacto);

module.exports = router;