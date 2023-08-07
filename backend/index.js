import express from "express"
import cors from 'cors'
import conectarDB from "./config/db.js"
import dotenv from "dotenv"
//Cuando tenes un export default podes llamar al archivo como quieras al importarlo.
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from './routes/tareaRoutes.js'



const app = express()
//La linea siguiente es una dependencia a instalar llamada dotenv, sirve para poder leer las variables de entorno a traves del process.ENV.variable en cuestion.
dotenv.config()

// Cors antes de definir rutas debe colocarse
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin:function(origin,callback) {
        if(whitelist.includes(origin))  {
            //Puede consultar la API
            callback(null,true)
        } else {
            //No esta permitido su request
            callback(new Error("Error de Cors"))
        }
    }
}
// app.use(cors("*")) asi acepta de cualquier lado
app.use(cors(corsOptions))
//La linea siguiente me permite leer los JSON que vienen en el req.body
app.use(express.json())
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/proyectos", proyectoRoutes)
app.use("/api/tareas", tareaRoutes)

const PORT = process.env.PORT || 4000
//Esta es una funcion que defino dentro de la carpeta config para conectarme a la base de datos de Mongo.
conectarDB()
//Configurar cors



//con esto creo el servidor local por medio de express.
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT} `))