module.exports = (sequelize, type, Artefacto, Modelo) => {

    return sequelize.define('formulario_sertec', {
        nro_orden: {
            type: type.STRING(12),
            primaryKey: true,
            allowNull: false
        },
        rut_cliente: {
            type: type.STRING(12),
            allowNull: false
        },
        nombre_cliente: {
            type: type.STRING,
            allowNull: false
        },
        direccion_cliente: {
            type: type.STRING,
            allowNull: false
        },
        ciudad_cliente: {
            type: type.STRING,
            allowNull: false
        },
        referencia_dir_cliente: {
            type: type.STRING,
            allowNull: false
        },
        telefono_cliente: {
            type: type.INTEGER,
            allowNull: false
        },
        kms_rec: {
            type: type.STRING,
            allowNull: false
        },
        fecha_orden: {
            type: type.DATEONLY,
            allowNull: false
        },
        codigo_artefacto: {
            type: type.STRING(12),
            allowNull: false,
            references: {
                model: Artefacto,
                key: 'codigo'
            }
        },
        codigo_modelo: {
            type: type.STRING(12),
            allowNull: false,
            references: {
                model: Modelo,
                key: 'codigo'
            }
        },
        tipo_gas: {
            type: type.BOOLEAN,
            allowNull: false
        },
        tipo_calefont: {
            type: type.BOOLEAN,
            allowNull: false
        },
        lugar_instalacion: {
            type: type.BOOLEAN,
            allowNull: false
        },
        nro_serie: {
            type: type.STRING,
            allowNull: false
        },
        garantia: {
            type: type.BOOLEAN,
            allowNull: false
        },
        nro_documento: {
            type: type.STRING,
            allowNull: false
        },
        fecha_compra: {
            type: type.DATEONLY,
            allowNull: false
        },
        distribuidor: {
            type: type.STRING,
            allowNull: false
        },
        codigo_falla: {
            type: type.STRING,
            allowNull: false
        },
        falla_indicada: {
            type: type.TEXT('long'),
            allowNull: false
        },
        falla_encontrada: {
            type: type.TEXT('long'),
            allowNull: false
        },
        reparacion_efectuada: {
            type: type.TEXT('long'),
            allowNull: false
        },
        observaciones: {
            type: type.TEXT('long'),
            allowNull: false
        },
        total_atencion: {
            type: type.INTEGER,
            allowNull: false
        },
        rut_tecnico: {
            type: type.STRING,
            allowNull: false
        },
        nombre_tecnico: {
            type: type.STRING,
            allowNull: false
        },
        fecha_atencion: {
            type: type.DATEONLY,
            allowNull: false
        }
    }, {
        //agrega atributos timestamp (updatedAt, createdAt).
        timestamps: true,
        //evita que sequelize ponga el nombre de la tabla en plural.
        freezeTableName: true,
        //agrega el nombre de la tabla.
        tableName: 'formularios_sertec'
    })
}