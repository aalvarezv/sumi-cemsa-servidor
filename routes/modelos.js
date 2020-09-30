const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, check } = require('express-validator');
const { crearModelo, listarModelo, actualizarModelo, 
       eliminarModelo, datosModelo, busquedaModelo} = require('../controllers/modeloController');


router.post('/crear', auth,
     
     check('codigo').not().isEmpty().withMessage('El codigo es obligatorio.'),
     check('descripcion').not().isEmpty().withMessage('La descripcion es obligatoria.'),crearModelo);

router.get('/listar', auth,listarModelo);

router.put('/actualizar', auth,
        
     check('codigo').not().isEmpty().withMessage('El codigo es obligatorio.'),
     check('descripcion').not().isEmpty().withMessage('La descripcion es obligatoria.'),actualizarModelo);

router.delete('/eliminar/:codigo', auth,eliminarModelo);
router.get('/datos/:codigo', datosModelo);
router.get('/busqueda/:filtro', busquedaModelo);

module.exports = router;