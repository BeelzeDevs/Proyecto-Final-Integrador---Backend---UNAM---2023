import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const productRouter = express.Router()

import {deleteProductByID,listProducts,listProductsStateTrue,listProductsByID,productsDescByID,addProducts,} from '../controllers/productocontroller.js'

productRouter.get('/productos',tokenAuthentication,listProductsStateTrue)
productRouter.get('/productos/todos',tokenAuthentication,listProducts)
productRouter.post('/productos/agregar',tokenAuthentication,addProducts)
productRouter.get('/productos/nombre/:id',listProductsByID)
productRouter.get('/productos/descripcion/:id',productsDescByID)
productRouter.delete('/producto/baja/:id',tokenAuthentication,deleteProductByID)

export default productRouter