import Proyecto from "../models/proyecto.js"
import Tarea from "../models/tarea.js"


const agregarTarea = async (req,res) => {
    //La proxima linea desestructura un campo definido en el modelo de 
    //tareas que es proyecto asociado con proyecto del modelo de proyecto
   const {proyecto} = req.body
   const existeProyecto = await Proyecto.findById(proyecto)
   if (!existeProyecto) {
    const error = new Error("El proyecto no existe")
    return res.status(404).json({msg:error.message})
   }
//    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
//     const error = new Error ("No tienes los permisos para añadir tareas")
//     return res.status(404).json({msg:error.message})
//    }
// const tareaAlmacenada = await new Tarea(req.body)
//La linea proxima es una variante de la linea de arriba, hacen lo mismo.
try {
    const tareaAlmacenada = await Tarea.create(req.body)
    //Almacenar ID en el proyecto
    existeProyecto.tareas.push(tareaAlmacenada._id)
    await existeProyecto.save()
   res.json(tareaAlmacenada)
} catch (error) {
    console.log(error)
}


}
const obtenerTarea = async (req,res) => {
    const {id} = req.params
    console.log(id)
    //Populate es genial, me cruza y me envia toda la informacion de lo que esta en ese Proyecto.
    const tarea = await Tarea.findById(id).populate("proyecto")
    if (!tarea) {
        const error = new Error("Tarea no encontrada")
        return res.status(404).json({msg:error.message})
    }
    
    // if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    //     const error = new Error("No tienes permisos para ver esta tarea")
    //     return res.status(403).json({msg:error.message})
    // }

    res.json(tarea)

}
const actualizarTarea = async (req,res) => {
    const {id} = req.params
    console.log(id)
    //Populate es genial, me cruza y me envia toda la informacion de lo que esta en ese Proyecto.
    const tarea = await Tarea.findById(id)
    if (!tarea) {
        const error = new Error("Tarea no encontrada")
        return res.status(404).json({msg:error.message})
    }
    
    // if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    //     const error = new Error("No tienes permisos para ver esta tarea")
    //     return res.status(403).json({msg:error.message})
    // }
    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

    try {
        const tareaActualizada = await tarea.save()
        res.json(tareaActualizada)
    } catch (error) {
        console.log(error)
    }
}
const eliminarTarea = async (req,res) => {
    const {id} = req.params
    console.log(id)
    //Populate es genial, me cruza y me envia toda la informacion de lo que esta en ese Proyecto.
    const tarea = await Tarea.findById(id)
    if (!tarea) {
        const error = new Error("Tarea no encontrada")
        return res.status(404).json({msg:error.message})
    }
    
    // if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    //     const error = new Error("No tienes permisos para ver esta tarea")
    //     return res.status(403).json({msg:error.message})
    // }

    try {
        await tarea.deleteOne()
        res.json({msg:"Tarea Eliminada"})
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req,res) => {}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}