/* eslint-disable indent */
import { DataTypes } from 'sequelize'
import DB from '../BD/conection.js'
import Existencia from './existencia.js'

const Carrito = DB.define('Carrito', {
  id_cliente: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tiempo_carrito: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cantidad_productos: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
}, {
  tableName: 'carritos',
  timestamps: false,
})

Carrito.belongsTo(Existencia, { foreignKey: 'id_existencia', as: 'existencias' })

export default Carrito