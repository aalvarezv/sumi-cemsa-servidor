const { Usuario } = require('../config/db');
const { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcryptjs');


exports.crearUsuario = async(req, res) => {


    try {
        const { rut, clave, nombre, email, telefono, inactivo } = req.body;

        //Verifica que el usuario no exista.
        let usuario = await Usuario.findByPk(rut);
        if (usuario) {
            console.log('El usuario ya existe');
            return res.status(400).json({
                msg: 'El usuario ya existe'
            });
        };

        //Genero un hash para el password.
        let salt = bcrypt.genSaltSync(10);
        let clave_hash = bcrypt.hashSync(clave, salt);

        //Guardo el nuevo usuario
        usuario = await Usuario.create({
            rut,
            clave: clave_hash,
            nombre,
            email,
            telefono,
            inactivo
        })

        //Envía la respuesta
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }

}

exports.listarUsuarios = async(req, res, next) => {

    try {
        const usuario = await Usuario.findAll();
        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.actualizarUsuario = async(req, res) => {

    try {

        let { rut, nombre, clave, email, telefono, inactivo } = req.body;

        //Verifica que el usuario a actualizar existe.
        let usuario = await Usuario.findByPk(rut);
        if (!usuario) {
            return res.status(404).send({
                msg: `El usuario ${rut} no existe`
            });
        }

        //Compara la clave recibida con la almacenada en la base de datos
        //Si son distintas entonces el usuario la actualizó y aplica el salt a la nueva clave
        if (clave !== usuario.clave) {
            console.log('Actualiza la clave')
                //Genero un hash para el password
            let salt = bcrypt.genSaltSync(10);
            clave = bcrypt.hashSync(clave, salt);
        }

        //actualiza los datos.
        usuario = await Usuario.update({
            clave,
            nombre,
            email,
            telefono,
            inactivo
        }, {
            where: {
                rut
            }
        });

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }


}

exports.eliminarUsuario = async(req, res) => {

    try {
        //Obtengo el rut del request
        const { rut } = req.params;
        //Verifica que el usuario a actualizar existe.
        let usuario = await Usuario.findByPk(rut);
        if (!usuario) {
            return res.status(404).send({
                msg: `El usuario ${rut} no existe`
            });
        }
        //Elimino el registro.
        usuario = await Usuario.destroy({
            where: {
                rut
            }
        });

        //Envío una respuesta informando que el registro fue eliminado
        res.json({
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

exports.datosUsuario = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { rut } = req.params
            //Consulta por el usuario
        const usuario = await Usuario.findByPk(rut, { attributes: { exclude: ['clave'] } });
        //Si el usuario no existe
        if (!usuario) {
            return res.status(404).send({
                msg: `El usuario ${rut} no existe`
            })
        }
        //Envia la información del usuario
        res.json({
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }

}

exports.busquedaUsuarios = async(req, res) => {

    try {
        //Obtiene el parametro desde la url
        const { filtro } = req.params
            //Consulta por el usuario
        const usuarios = await Usuario.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("rut"), Sequelize.col("nombre")), {
                [Op.like]: `%${filtro}%`
            })
        });

        //Envia la información del usuario
        res.json({
            usuarios
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}