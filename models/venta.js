/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'
import Cliente from './cliente.js'
import Existencia from './existencia.js'


const Venta = DB.define('Venta', {
  id_venta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_cliente: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tiempo_venta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cantidad_productos: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  total_venta: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  estado_venta: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'ventas',
  timestamps: false,
})
Venta.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'clientes'})
Venta.belongsTo(Existencia, { foreignKey: 'id_existencia', as: 'existencias' })




export default Venta