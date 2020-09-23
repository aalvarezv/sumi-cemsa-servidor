const {Formulario_sertec, Artefacto, Modelo} = require('../config/db');
const { Sequelize, Op } = require('sequelize');

exports.crearFormulario = async(req, res) => {

    try {

        const { nro_orden, rut_cliente, nombre_cliente, direccion_cliente, ciudad_cliente,
                referencia_dir_cliente, telefono_cliente, kms_rec, fecha_orden, codigo_artefacto,
                codigo_modelo, tipo_gas, tipo_calefont, lugar_instalacion, nro_serie, garantia,
                nro_documento, fecha_compra, distribuidor, codigo_falla, falla_indicada,
                falla_encontrada, reparacion_efectuada, observaciones, total_atencion,
                rut_tecnico, nombre_tecnico, fecha_atencion } = req.body;

        //verifica que el formulario no existe.
        let formulario_sertec = await Formulario_sertec.findByPk(nro_orden);
        if (formulario_sertec) {
            console.log('El formulario  ya existe');
            return res.status(400).json({
                msg: 'El formulario ya existe'
            });
        }

        //verifica que el artefacto sea valida.
        let artefacto = await Artefacto.findByPk(codigo_artefacto);
        if (!artefacto) {
            console.log('El artefacto ingresada no es válido');
            return res.status(400).json({
                msg: 'El artefacto ingresada no es válido'
            });
        }

        //verifica que el modelo sea válido.
        let modelo = await Modelo.findByPk(codigo_modelo);
        if (!modelo) {
            console.log('El modelo ingresado no es válido');
            return res.status(400).json({
                msg: 'El modelo ingresado no es válido'
            });
        }

        //Guarda el nuevo formulario
        formulario_sertec = await Formulario_sertec.create({
            nro_orden, rut_cliente, nombre_cliente, direccion_cliente, ciudad_cliente,
            referencia_dir_cliente, telefono_cliente, kms_rec, fecha_orden, codigo_artefacto,
            codigo_modelo, tipo_gas, tipo_calefont, lugar_instalacion, nro_serie, garantia,
            nro_documento, fecha_compra, distribuidor, codigo_falla, falla_indicada,
            falla_encontrada, reparacion_efectuada, observaciones, total_atencion,
            rut_tecnico, nombre_tecnico, fecha_atencion
        });

        //envía la respuesta
        res.json(formulario_sertec); 

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }


}

exports.listarFormulario = async(req, res, next) => {

    try {

        const formulario_sertec = await Formulario_sertec.findAll();
        res.json({
            formulario_sertec
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

exports.actualizarFormulario = async(req, res) => {

    try {

        let { nro_orden, rut_cliente, nombre_cliente, direccion_cliente, ciudad_cliente,
            referencia_dir_cliente, telefono_cliente, kms_rec, fecha_orden, codigo_artefacto,
            codigo_modelo, tipo_gas, tipo_calefont, lugar_instalacion, nro_serie, garantia,
            nro_documento, fecha_compra, distribuidor, codigo_falla, falla_indicada,
            falla_encontrada, reparacion_efectuada, observaciones, total_atencion,
            rut_tecnico, nombre_tecnico, fecha_atencion } = req.body;

        //verifica que el forumulario a actualizar existe.
        let formulario_sertec = await Formulario_sertec.findByPk(nro_orden);
        if (!formulario_sertec) {
            return res.status(404).send({
                msg: `El formulario ${nro_orden} no existe`
            })
        }

        //verifica que el artefacto sea válido.
        let artefacto = await Artefacto.findByPk(codigo_artefacto);
        if (!artefacto) {
            console.log('El artefacto ingresado no es válido');
            return res.status(400).json({
                msg: 'El artefacto ingresado no es válido'
            });
        }

        //verifica que el modelo sea válido.
        let modelo = await Modelo.findByPk(codigo_modelo);
        if (!modelo) {
            console.log('El modelo ingresado no es válido');
            return res.status(400).json({
                msg: 'El modelo ingresado no es válido'
            });
        }

        //actualiza los datos.
        formulario_sertec = await Formulario_sertec.update({
            rut_cliente, nombre_cliente, direccion_cliente, ciudad_cliente,
            referencia_dir_cliente, telefono_cliente, kms_rec, fecha_orden, codigo_artefacto,
            codigo_modelo, tipo_gas, tipo_calefont, lugar_instalacion, nro_serie, garantia,
            nro_documento, fecha_compra, distribuidor, codigo_falla, falla_indicada,
            falla_encontrada, reparacion_efectuada, observaciones, total_atencion,
            rut_tecnico, nombre_tecnico, fecha_atencion 
        }, {
            where: {
                nro_orden
            }
        })

        res.json(formulario_sertec);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }


}

exports.eliminarFormulario = async(req, res) => {

    try {
        //obtengo el numero de orden del request
        const { nro_orden } = req.params;
        //verifica que el formulario existe.
        let formulario_sertec = await Formulario_sertec.findByPk(nro_orden);
        if (!formulario_sertec) {
            return res.status(404).send({
                msg: `El formulario ${nro_orden} no existe`
            })
        }
        //elimino el registro.
        formulario_sertec = await Formulario_sertec.destroy({
            where: {
                nro_orden
            }
        });

        //envío una respuesta informando que el registro fue eliminado
        res.json({
            msg: 'Formulario eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

exports.datosFormulario = async(req, res) => {

    try {
        //obtiene el parametro desde la url
        const { nro_orden } = req.params
            //consulta por el formulario
        const formulario_sertec = await Formulario_sertec.findByPk(nro_orden);
        //si el formulario no existe
        if (!formulario_sertec) {
            return res.status(404).send({
                msg: `El formulario ${nro_orden} no existe`
            })
        }
        //envía la información del formulario
        res.json({
            formulario_sertec
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }

}

exports.busquedaFormularios = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { filtro } = req.params
            //Consulta por el formulario
        const formulario_sertec = await Formulario_sertec.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("nro_orden")), {
                [Op.like]: `%${filtro}%`
            })
        });

        //Envia la información del formulario
        res.json({
            formulario_sertec
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}