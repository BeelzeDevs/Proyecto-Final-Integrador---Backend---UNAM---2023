/* eslint-env node */
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

//Crear instancia de conexion
const DB = new Sequelize(
	process.env.DB_NAME, // Name database
	process.env.DB_USERNAME, // Username
	process.env.DB_PASSWORD, // Password
	{
		host: process.env.DB_HOSTNAME, // Server
		dialect: process.env.DB_DIALECT,  // Dialecto o lenguaje de BD para seguir el standard
		logging:true // el loggin va a permitir que te informe en la terminal la interaccion entre la BD y el ORM sequelize
	}
    
)

export default DB
