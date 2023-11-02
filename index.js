import  express  from 'express'
//import { createRequire} from 'node:module'
import DB from './BD/conection.js'
import makeBody from './middlewares/makeBody.js'
import authentication from './middlewares/authentication.js'
import error404 from './middlewares/404.js'
import trolleyRouter from './routes/carritorouter.js'
import clientRouter from './routes/clientrouter.js'
import existenceRouter from './routes/existencerouter.js'
import productRouter from './routes/productrouter.js'
import userRouter from './routes/usariorouter.js'
import saleRouter from './routes/ventarouter.js'
import adminRouter from './routes/adminrouter.js'
import providerRouter from './routes/provedorrouter.js'


const app = express()
const expossedPort = 192

/*
 FALTAN VALIDACIONES QUE MEJORAR: EJ,VALIDACIONES DE CANTIDAD DE CARACTERES
 FALTAN MODULARIZAR LOS PERMISOS DE NIVEL

*/

app.get('/', (req,res) => {

	res.status(200).send('<h1> Bienvenido a la API </h1><p> Los comandos disponibles son:<p><ul><li> GET: /clientes </li><li> GET: /clientes/todos </li><li> POST: /clientes/agregar </li><li> GET: /clientes/:id </li><li> PATCH:/clientes/editar/:id </li><li> DELETE: /clientes/baja/:id </li><li><ul><ul><li> GET: /admins </li><li> GET: /admins/todos </li><li> POST: /admins/agregar </li><li> GET: /admins/:id </li><li> PATCH: /admins/editar/:id </li><li> DELETE: /admins/baja/:id </li><li><ul><ul><li> GET: /proveedores </li><li> GET: /proveedores/todos </li><li> POST: /proveedores/agregar </li><li> GET: /proveedores/:id </li><li> PATCH:/proveedores/editar/:id </li><li> DELETE: /proveedores/baja/:id </li><li><ul>')
})

//Middleware del patch y post para obtener el body
app.use(makeBody)

//Enrutamientos
app.use('/',trolleyRouter)
app.use('/',clientRouter)
app.use('/',existenceRouter)
app.use('/',productRouter)
app.use('/',userRouter)
app.use('/',saleRouter)
app.use('/',providerRouter)
app.use('/',adminRouter)


//Validación al logear
app.post('/auth',authentication)



// error 404
app.use('',error404)


try {
	await DB.authenticate() //es asincrono y lanza una consulta random para probar la conexión
	console.log('database connected successfully')
} catch (error) {
	console.log('database conection error')
}

app.listen(expossedPort, () => {
	console.log('Servidor montado, escuchando en http://localhost:'+expossedPort)
})

