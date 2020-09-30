const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, check } = require('express-validator');
const {crearFormulario, listarFormulario, actualizarFormulario, eliminarFormulario, 
       datosFormulario, busquedaFormularios} = require('../controllers/formulario_sertecController');


router.post('/crear', auth, 

       
     check('nro_orden').not().isEmpty().withMessage('El número de orden es obligatorio.'),
     check('rut_cliente').not().isEmpty().withMessage('El rut es obligatorio.'),
     body('rut_cliente').if(body('rut_cliente').exists()).isLength({ min: 8, max: 9 }).withMessage('El rut del cliente no es válido.'),
     check('nombre_cliente').not().isEmpty().withMessage('El nombre del cliente es obligatorio.'),
     check('direccion_cliente').not().isEmpty().withMessage('La direccion del cliente es obligatoria.'),
     check('ciudad_cliente').not().isEmpty().withMessage('La ciudad del cliente es obligatoria.'),
     check('referencia_dir_cliente').not().isEmpty().withMessage('La referencia es obligatoria.'),
     check('telefono_cliente').not().isEmpty().withMessage('El teléfono del cliente es obligatorio.'),
     body('telefono_cliente').if(body('telefono_cliente').exists()).isNumeric().withMessage('No es un teléfono válido.'),
     check('kms_rec').not().isEmpty().withMessage('Los kilometros recorridos es obligatorio.'),
     check('fecha_orden').not().isEmpty().withMessage('La fecha de orden es obligatoria.'),
     check('codigo_artefacto').not().isEmpty().withMessage('El codigo del artefacto es obligatorio.'),
     check('codigo_modelo').not().isEmpty().withMessage('El codigo del modelo es obligatorio.'),
     check('nro_serie').not().isEmpty().withMessage('El número de serie es obligatorio.'),
     check('nro_documento').not().isEmpty().withMessage('El número de documento es obligatorio.'),
     check('fecha_compra').not().isEmpty().withMessage('La fecha de compra es obligatoria.'),
     check('distribuidor').not().isEmpty().withMessage('El distribuidor es obligatorio.'),
     check('codigo_falla').not().isEmpty().withMessage('El codigo de falla es obligatorio.'),
     check('falla_indicada').not().isEmpty().withMessage('La falla indicada es obligatoria.'),
     check('falla_encontrada').not().isEmpty().withMessage('La falla encontrada es obligatoria.'),
     check('reparacion_efectuada').not().isEmpty().withMessage('La reparación efectuada es obligatoria.'),
     check('observaciones').not().isEmpty().withMessage('Las observaciones son obligatorias.'),
     check('total_atencion').not().isEmpty().withMessage('El total de la atención obligatorio.'),
     check('rut_tecnico').not().isEmpty().withMessage('El rut del tecnico es obligatorio.'),
     body('rut_tecnico').if(body('rut_tecnico').exists()).isLength({ min: 8, max: 9 }).withMessage('El rut del tecnico no es válido.'),
     check('nombre_tecnico').not().isEmpty().withMessage('El nombre del tecnico es obligatorio.'),
     check('fecha_atencion').not().isEmpty().withMessage('La fecha de atención obligatoria.'), crearFormulario);

router.get('/listar', auth,listarFormulario);
router.put('/actualizar', auth, 

       
     check('nro_orden').not().isEmpty().withMessage('El número de orden es obligatorio.'),
     check('rut_cliente').not().isEmpty().withMessage('El rut es obligatorio.'),
     body('rut_cliente').if(body('rut_cliente').exists()).isLength({ min: 8, max: 9 }).withMessage('El rut del cliente no es válido.'),
     check('nombre_cliente').not().isEmpty().withMessage('El nombre del cliente es obligatorio.'),
     check('direccion_cliente').not().isEmpty().withMessage('La direccion del cliente es obligatoria.'),
     check('ciudad_cliente').not().isEmpty().withMessage('La ciudad del cliente es obligatoria.'),
     check('referencia_dir_cliente').not().isEmpty().withMessage('La referencia es obligatoria.'),
     check('telefono_cliente').not().isEmpty().withMessage('El teléfono del cliente es obligatorio.'),
     body('telefono_cliente').if(body('telefono_cliente').exists()).isNumeric().withMessage('No es un teléfono válido.'),
     check('kms_rec').not().isEmpty().withMessage('Los kilometros recorridos es obligatorio.'),
     check('fecha_orden').not().isEmpty().withMessage('La fecha de orden es obligatoria.'),
     check('codigo_artefacto').not().isEmpty().withMessage('El codigo del artefacto es obligatorio.'),
     check('codigo_modelo').not().isEmpty().withMessage('El codigo del modelo es obligatorio.'),
     check('nro_serie').not().isEmpty().withMessage('El número de serie es obligatorio.'),
     check('nro_documento').not().isEmpty().withMessage('El número de documento es obligatorio.'),
     check('fecha_compra').not().isEmpty().withMessage('La fecha de compra es obligatoria.'),
     check('distribuidor').not().isEmpty().withMessage('El distribuidor es obligatorio.'),
     check('codigo_falla').not().isEmpty().withMessage('El codigo de falla es obligatorio.'),
     check('falla_indicada').not().isEmpty().withMessage('La falla indicada es obligatoria.'),
     check('falla_encontrada').not().isEmpty().withMessage('La falla encontrada es obligatoria.'),
     check('reparacion_efectuada').not().isEmpty().withMessage('La reparación efectuada es obligatoria.'),
     check('observaciones').not().isEmpty().withMessage('Las observaciones son obligatorias.'),
     check('total_atencion').not().isEmpty().withMessage('El total de la atención obligatorio.'),
     check('rut_tecnico').not().isEmpty().withMessage('El rut del tecnico es obligatorio.'),
     body('rut_tecnico').if(body('rut_tecnico').exists()).isLength({ min: 8, max: 9 }).withMessage('El rut del tecnico no es válido.'),
     check('nombre_tecnico').not().isEmpty().withMessage('El nombre del tecnico es obligatorio.'),
     check('fecha_atencion').not().isEmpty().withMessage('La fecha de atención obligatoria.'),actualizarFormulario);
router.delete('/eliminar/:nro_orden', auth,eliminarFormulario);
router.get('/datos/:nro_orden', auth,datosFormulario);
router.get('/busqueda/:filtro', auth,busquedaFormularios);

module.exports = router;