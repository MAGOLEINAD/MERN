import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js'


const checkAuth = async (req,res,next) => {
    let token 

  
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            //Asignar un objeto a una propiedad de req de esta manera permite que el objeto usuario esté disponible 
            // para su uso posterior en otros middleware o controladores que manejen la solicitud.
            // Esto es útil para compartir datos entre diferentes partes del flujo de solicitud y respuesta.
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v")
            // console.log(req.usuario)
         
            return next()
          
        } catch (error) {
            console.log(error)
          return res.status(404).json({msg:"Hubo un error"})
        }
    }

    if (!token) {
        const error = new Error('Token no valido')
        return res.status(401).json({msg:error.message})
    }
    next()
}

export default checkAuth