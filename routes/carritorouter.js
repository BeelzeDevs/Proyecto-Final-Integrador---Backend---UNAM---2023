import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const trolleyRouter = express.Router()

import {addTrolleyItem,deleteTrolleyItem,editQuantityItemByTrolleyID,listTrolleyExistences,emptyTrolley} from '../controllers/carritocontroller.js'

trolleyRouter.post('/carrito/agregar',tokenAuthentication,addTrolleyItem)
trolleyRouter.get('/carrito/listar',tokenAuthentication,listTrolleyExistences)
trolleyRouter.delete('/carrito/vaciar',tokenAuthentication,emptyTrolley)
trolleyRouter.delete('/carrito/:idCarrito',tokenAuthentication,deleteTrolleyItem)
trolleyRouter.patch('/carrito/modcantidad/:idCarrito',tokenAuthentication,editQuantityItemByTrolleyID)


export default trolleyRouter