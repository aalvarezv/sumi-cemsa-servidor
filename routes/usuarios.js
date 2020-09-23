const express = require('express');
const router = express.Router();
const { crearUsuario, listarUsuarios, actualizarUsuario, 
       eliminarUsuario, datosUsuario, busquedaUsuarios } = require('../controllers/usuarioController');

router.post('/crear', crearUsuario);
router.get('/listar', listarUsuarios);
router.put('/actualizar', actualizarUsuario);
router.delete('/eliminar/:rut', eliminarUsuario);
//router.get('/datos/:rut', datosUsuario);
//router.get('/buscar/:filtro', busquedaUsuarios);


module.exports = router;