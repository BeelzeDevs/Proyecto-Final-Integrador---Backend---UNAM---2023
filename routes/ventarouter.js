import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const saleRouter = express.Router()

import {listSales,listSalesByIDClient} from '../controllers/ventascontroller.js'

saleRouter.get('/ventas/listar/',tokenAuthentication,listSales)
saleRouter.get('/ventas/listar/:idCliente',tokenAuthentication,listSalesByIDClient)

export default saleRouter