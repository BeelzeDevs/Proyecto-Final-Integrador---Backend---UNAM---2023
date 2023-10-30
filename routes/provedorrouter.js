import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const providerRouter = express.Router()

import {listProvStateTrue,listAllProv,listProvByID,addProv,editProvByID,deleteProvByID} from '../controllers/proveedorcontroller.js'

providerRouter.get('/proveedores',tokenAuthentication,listProvStateTrue)
providerRouter.get('/proveedores/todos',tokenAuthentication,listAllProv)
providerRouter.post('/proveedores/agregar',tokenAuthentication,addProv)
providerRouter.get('/proveedores/:id', tokenAuthentication,listProvByID)
providerRouter.patch('/proveedores/editar/:id',tokenAuthentication,editProvByID)
providerRouter.delete('/proveedores/baja/:id',tokenAuthentication,deleteProvByID)


export default providerRouter