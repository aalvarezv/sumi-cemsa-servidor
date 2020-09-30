const { Modelo } = require('../config/db');
const { Sequelize, Op } = require('sequelize');
//llama el resultado de la validación
const { validationResult } = require('express-validator');

exports.crearModelo = async(req, res) => {

    //si hay errores de la validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { codigo, descripcion, inactivo } = req.body;

        //Verifica que el modelo no exista
        let modelo = await Modelo.findByPk(codigo);
        if (modelo) {
            console.log('El modelo ya existe');
            return res.status(400).json({
                msg: 'El modelo ya existe'
            });
        }

        //Guardo el nuevo modelo
        modelo = await Modelo.create({
            codigo,
            descripcion,
            inactivo
        })

        //Envía respuesta
        res.json(modelo);

    } catch {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.listarModelo = async(req, res) => {

    try {
        const modelo = await Modelo.findAll();
        res.json({
            modelo
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.actualizarModelo = async(req, res) => {
    try {

        let { codigo, descripcion, inactivo } = req.body;

        //Verifica que el modelo a actualizar exista
        let modelo = await Modelo.findByPk(codigo);
        if (!modelo) {
            return res.status(404).send({
                msg: `El modelo ${codigo} no existe`
            });
        }

        //Actualiza los datos
        modelo = await Modelo.update({
            descripcion,
            inactivo

        }, {
            where: {
                codigo
            }
        });

        //envía la respuesta
        res.json(modelo);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.eliminarModelo = async(req, res) => {

    try {
        //Obtengo el codigo del request
        const { codigo } = req.params;
        //Verifica que el modelo a eliminar exista
        let modelo = await Modelo.findByPk(codigo);
        if (!modelo) {
            return res.status(404).send({
                msg: `El modelo ${codigo} no existe`
            });
        }
        //Elimina el registro
        modelo = await Modelo.destroy({
            where: {
                codigo
            }
        });

        //Envío una respuesta informando que el registro fue eliminado
        res.json({
            msg: 'Modelo eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.datosModelo = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { codigo } = req.params
            //Consulta por el modelo
        const modelo = await Modelo.findByPk(codigo);
        //Si el modelo no existe
        if (!modelo) {
            return res.status(404).send({
                msg: `El modelo ${codigo} no existe`
            })
        }
        //Envia la información del usuario
        res.json({
            modelo
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }

}

exports.busquedaModelo = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { filtro } = req.params
            //Consulta por el modelo
        const modelo = await Modelo.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("codigo"), Sequelize.col("descripcion")), {
                [Op.like]: `%${filtro}%`
            })
        });

        //Envia la información del modelo
        res.json({
            modelo
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}