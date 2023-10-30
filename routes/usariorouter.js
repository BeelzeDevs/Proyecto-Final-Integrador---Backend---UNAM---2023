import express from 'express'
import tokenAuthentication from '../middlewares/tokenAuthentication.js'

const userRouter = express.Router()

import {listUsersStateTrue,listAllUsers,listUserByID,addUser,editUserByID,deleteUserByID} from '../controllers/usuariocontroller.js'

userRouter.get('/usuarios',tokenAuthentication,listUsersStateTrue)
userRouter.get('/usuarios/todos',tokenAuthentication,listAllUsers)
userRouter.post('/usuarios/agregar',tokenAuthentication,addUser)
userRouter.get('/usuarios/:id', tokenAuthentication,listUserByID)
userRouter.patch('/usuarios/editar/:id',tokenAuthentication,editUserByID)
userRouter.delete('/usuarios/baja/:id',tokenAuthentication,deleteUserByID)

export default userRouter