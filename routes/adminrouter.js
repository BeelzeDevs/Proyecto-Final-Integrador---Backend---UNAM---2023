import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const adminRouter = express.Router()

import {listAdminStateTrue,listAllAdmin,listAdminByID,addAdmin,editAdminByID,deleteAdminByID} from '../controllers/admincontroller.js'

adminRouter.get('/admins',tokenAuthentication,listAdminStateTrue)
adminRouter.get('/admins/todos',tokenAuthentication,listAllAdmin)
adminRouter.post('/admins/agregar',tokenAuthentication,addAdmin)
adminRouter.get('/admins/:id', tokenAuthentication,listAdminByID)
adminRouter.patch('/admins/editar/:id',tokenAuthentication,editAdminByID)
adminRouter.delete('/admins/baja/:id',tokenAuthentication,deleteAdminByID)


export default adminRouter