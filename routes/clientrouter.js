import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'
const clientRouter = express.Router()

import {getUserTelByID,getUserNameByID,addClient,listClientStateTrue,listAllClient,listClientByID,editClientByID,deleteClientByID} from '../controllers/clientecontroller.js'


clientRouter.get('/clientes',tokenAuthentication,listClientStateTrue)
clientRouter.get('/clientes/todos',tokenAuthentication,listAllClient)
clientRouter.post('/clientes/agregar',tokenAuthentication,addClient)
clientRouter.get('/clientes/:id', tokenAuthentication,listClientByID)
clientRouter.get('/clientes/telefono/:id',tokenAuthentication,getUserTelByID)
clientRouter.get('/clientes/nombre/:id',tokenAuthentication,getUserNameByID)
clientRouter.patch('/clientes/editar/:id',tokenAuthentication,editClientByID)
clientRouter.delete('/clientes/baja/:id',tokenAuthentication,deleteClientByID)

export default clientRouter