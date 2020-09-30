const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const { crearUsuario, listarUsuarios, actualizarUsuario, 
       eliminarUsuario, datosUsuario, busquedaUsuarios } = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/crear', auth,
       
     check('rut').not().isEmpty().withMessage('El rut es obligatorio.'),
     body('rut').if(body('rut').exists()).isLength({ min: 8, max: 9 }).withMessage('El rut no es válido.'),
     check('clave').not().isEmpty().withMessage('La clave es obligatoria.'),
     check('nombre').not().isEmpty().withMessage('El nombre es obligatorio.'),
     check('email').not().isEmpty().withMessage('El email es obligatorio.'),
     body('email').if(body('email').exists()).isEmail().withMessage('No es un email válido.'),
     check('telefono').not().isEmpty().withMessage('El teléfono es obligatorio.'),
     body('telefono').if(body('telefono').exists()).isNumeric().withMessage('No es un teléfono válido.'),crearUsuario);

router.get('/listar', auth,listarUsuarios);

router.put('/actualizar', auth,
       
     check('rut').not().isEmpty().withMessage('El rut es obligatorio.'),
     body('rut').if(body('rut').exists()).isLength({ min: 8, max: 9 }).withMessage('El rut no es válido.'),
     check('clave').not().isEmpty().withMessage('La clave es obligatoria.'),
     check('nombre').not().isEmpty().withMessage('El nombre es obligatorio.'),
     check('email').not().isEmpty().withMessage('El email es obligatorio.'),
     body('email').if(body('email').exists()).isEmail().withMessage('No es un email válido.'),
     check('telefono').not().isEmpty().withMessage('El teléfono es obligatorio.'),
     body('telefono').if(body('telefono').exists()).isNumeric().withMessage('No es un teléfono válido.'), actualizarUsuario);

router.delete('/eliminar/:rut', auth,eliminarUsuario);
router.get('/datos/:rut', datosUsuario);
router.get('/buscar/:filtro', busquedaUsuarios);


module.exports = router;