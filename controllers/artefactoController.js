const { Artefacto } = require('../config/db');
const { Sequelize, Op } = require('sequelize');

exports.crearArtefacto = async(req, res) => {

    try {
        const { codigo, descripcion, inactivo } = req.body;

        //Verifica que el artefacto no exista
        let artefacto = await Artefacto.findByPk(codigo);
        if (artefacto) {
            console.log('El artefacto ya existe');
            return res.status(400).json({
                msg: 'El artefacto ya existe'
            });
        }

        //Guardo el nuevo artefacto
        artefacto = await Artefacto.create({
            codigo,
            descripcion,
            inactivo
        })

        //Envía respuesta
        res.json(artefacto);

    } catch {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.listarArtefacto = async(req, res) => {

    try {
        const artefacto = await Artefacto.findAll();
        res.json({
            artefacto
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.actualizarArtefacto = async(req, res) => {
    try {

        let { codigo, descripcion, inactivo } = req.body;

        //Verifica que el artefacto a actualizar exista
        let artefacto = await Artefacto.findByPk(codigo);
        if (!artefacto) {
            return res.status(404).send({
                msg: `El artefacto ${codigo} no existe`
            });
        }

        //Actualiza los datos
        artefacto = await Artefacto.update({
            descripcion,
            inactivo

        }, {
            where: {
                codigo
            }
        });

        //envía la respuesta
        res.json(artefacto);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.eliminarArtefacto = async(req, res) => {

    try {
        //Obtengo el codigo del request
        const { codigo } = req.params;
        //Verifica que el artefacto a eliminar exista
        let artefacto = await Artefacto.findByPk(codigo);
        if (!artefacto) {
            return res.status(404).send({
                msg: `El artefacto ${codigo} no existe`
            });
        }
        //Elimina el registro
        artefacto = await Artefacto.destroy({
            where: {
                codigo
            }
        });

        //Envío una respuesta informando que el registro fue eliminado
        res.json({
            msg: 'Artefacto eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.datosArtefacto = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { codigo } = req.params
            //Consulta por el artefacto
        const artefacto = await Artefacto.findByPk(codigo);
        //Si el artefacto no existe
        if (!artefacto) {
            return res.status(404).send({
                msg: `El artefacto ${codigo} no existe`
            })
        }
        //Envia la información del usuario
        res.json({
            artefacto
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }

}

exports.busquedaArtefacto = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { filtro } = req.params
            //Consulta por el artefacto
        const artefacto = await Artefacto.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("codigo"), Sequelize.col("descripcion")), {
                [Op.like]: `%${filtro}%`
            })
        });

        //Envia la información del artefacto
        res.json({
            artefacto
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}