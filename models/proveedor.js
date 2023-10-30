/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'

const Proveedor = DB.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
  },
  cuit: {
    type: DataTypes.BIGINT,
  },
  razon_social: {
    type: DataTypes.STRING,
  },
  estado_proveedor: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  telefono_prov: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
}, 
    {
  tableName: 'proveedores',
  timestamps: false,
}
)

export default Proveedor