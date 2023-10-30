import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const existenceRouter = express.Router()

import {addExistence,modExistenceByID,deleteExistenceByID,editExistenceStateTrueByID,listExistencesStateTrue,editExistencePriceByID,getExistencePriceByID,getTotalStockPrice} from '../controllers/existenciacontroller.js'

existenceRouter.get('/existencias', tokenAuthentication,listExistencesStateTrue)
existenceRouter.get('/existencias/totalstock',tokenAuthentication,getTotalStockPrice)
existenceRouter.post('/existencias/agregar',tokenAuthentication,addExistence)
existenceRouter.patch('/existencias/:id',tokenAuthentication,modExistenceByID)
existenceRouter.delete('/existencias/baja/:id',tokenAuthentication,deleteExistenceByID)
existenceRouter.patch('/existencias/alta/:id',tokenAuthentication,editExistenceStateTrueByID)
existenceRouter.patch('/existencias/precio/:id',tokenAuthentication,editExistencePriceByID)
existenceRouter.get('/existencias/precio/:id',getExistencePriceByID)



export default existenceRouter