const { Sequelize, Model } = require('sequelize');
require('dotenv').config({ path: './variables.env' });


const UsuarioModel = require('../models/Usuario');
const ArtefactoModel = require('../models/Artefacto');
const ModeloModel = require('../models/Modelo');
const ModelFormularioSertec = require('../models/Formulario_sertec');

//conexión a la bd
const sequelize = new Sequelize(process.env.DB_URI, {
    define: {
        timestamps: false
    },
    dialect: 'mysql',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '-03:00'
});




//crea el modelo
const Usuario = UsuarioModel(sequelize, Sequelize);
const Artefacto = ArtefactoModel(sequelize, Sequelize);
const Modelo = ModeloModel(sequelize, Sequelize);
const Formulario_sertec = ModelFormularioSertec(sequelize, Sequelize, Artefacto, Modelo);

//crea las relaciones
Artefacto.hasMany(Formulario_sertec, { foreignKey: 'codigo_artefacto' });
Formulario_sertec.belongsTo(Artefacto, { foreignKey: 'codigo_artefacto' });

Modelo.hasMany(Formulario_sertec, { foreignKey: 'codigo_modelo' });
Formulario_sertec.belongsTo(Modelo, { foreignKey: 'codigo_modelo' });




sequelize.sync({ force: true })
    .then(async() => {
        try {
            console.log('**** CONECTADO A LA BASE DE DATOS ****');

            const usuarios = await Usuario.bulkCreate([{
                rut: '162323695',
                clave: '$2a$10$9wpsEopYMcnCbEjQSGYaMu4xcOZoLN5t5TAHV.4sja8ayFrUeEy.G',
                nombre: 'Alan Patricio Alvarez Vargas',
                email: 'alvarez.vargas@gmail.com',
                telefono: 12345633,
                codigo_rol: '3'
            }]);
            console.log('USUARIOS INSERTADOS');

            const artefactos = await Artefacto.bulkCreate([{
                codigo: '1',
                descripcion: 'CALEFON'
            }, {
                codigo: '2',
                descripcion: 'TERMO'
            }, {
                codigo: '3',
                descripcion: 'SOLAR'
            }, {
                codigo: '4',
                descripcion: 'LAVAPLATOS'
            }]);
            console.log('ARTEFACTOS INSERTADOS');

            const modelos = await Modelo.bulkCreate([{
                codigo: '1',
                descripcion: 'TF1-1000'
            }, {
                codigo: '2',
                descripcion: 'TF1-1100'
            }, {
                codigo: '3',
                descripcion: 'TF1-1200'
            }]);
            console.log('MODELOS INSERTADOS');

        } catch (error) {
            console.log('aqui watea', error);
        }

    })



module.exports = {
    Usuario,
    Artefacto,
    Modelo,
    Formulario_sertec
}