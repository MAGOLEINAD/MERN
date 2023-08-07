import Proyecto from '../models/proyecto.js'
import Usuario from '../models/usuario.js'




const nuevoProyecto = async (req,res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json (proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerProyectos = async (req,res) => {
    const proyectos = await Proyecto.find({
        '$or': [
            {colaboradores: {$in: req.usuario}},
            {creador: {$in :req.usuario}}
        ]
    })
    // .where('creador')
    // .equals(req.usuario)
    .select('-tareas')
    res.json(proyectos)
 
 }
const obtenerProyecto = async (req,res) => {
    const {id} = req.params
    if (id.length !== 24) {
        const error = new Error('ID inválido');
        return res.status(400).json({ msg: error.message });
      }

    const proyecto = await Proyecto.findById(id)
    .populate('tareas')
    .populate('colaboradores' , 'nombre email')
    if (!proyecto) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }
    //No me funciona esto video numero 446
    // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    //     const error = new Error('No tienes los permisos');
    //     return res.status(401).json({ msg: error.message });
    // }

    //Obtener las tareas del proyecto
    // const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)
    res.json({
        proyecto,
        // tareas
    })
}
const editarProyecto = async (req,res) => {
    const {id} = req.params
    if (id.length !== 24) {
        const error = new Error('ID inválido');
        return res.status(400).json({ msg: error.message });
      }

    const proyecto = await Proyecto.findById(id)
    if (!proyecto) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }
    //No me funciona esto video numero 446
    // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    //     const error = new Error('No tienes los permisos');
    //     return res.status(401).json({ msg: error.message });
    // }
    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente

    try {
        const proyectoModificado = await proyecto.save()
        res.json(proyectoModificado)
    } catch (error) {
        console.log(error)
    }
}
const eliminarProyecto = async (req,res) => {

    const {id} = req.params
    if (id.length !== 24) {
        const error = new Error('ID inválido');
        return res.status(400).json({ msg: error.message });
      }

    const proyecto = await Proyecto.findById(id)
    if (!proyecto) {
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message });
    }
    //No me funciona esto video numero 446
    // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    //     const error = new Error('No tienes los permisos');
    //     return res.status(401).json({ msg: error.message });
    // }
    try {
        await proyecto.deleteOne();
        res.json({msg:"Proyecto Eliminado"})
    } catch (error) {
        console.log(error)
    }
}

const buscarColaborador = async (req,res) => {
    const {email} = req.body
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -__v -token -updatedAt')
    if (!usuario) {
       const error = new Error('Usuario no encontrado')
       return res.status(404).json ({msg: error.message})
    }
    return res.json(usuario)
}
const agregarColaborador = async (req,res) => {
    const proyecto = await Proyecto.findById(req.params.id)
    // console.log(proyecto)
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msg:error.mensaje})
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(404).json({msg:error.mensaje})
    }
    const {email} = req.body
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -__v -token -updatedAt')
    if (!usuario) {
       const error = new Error('Usuario no encontrado')
       return res.status(404).json ({msg: error.message})
    }
    //El colaborador no es el admin del proyecto.
    if (proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('El creador del proyecto no puede ser colaborador')
        return res.status(404).json ({msg: error.message})
    }
    //Revisar que no este ya agregado al proyecto
    if (proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya pertenece al proyecto')
        return res.status(404).json ({msg: error.message})
    }
    //Esta bien , se puede agregar

    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    res.json({msg: 'Colaborador Agregado correctamente'})
// console.log(req.body)
}

const eliminarColaborador = async (req,res) => {
    const proyecto = await Proyecto.findById(req.params.id)
    // console.log(proyecto)
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msg:error.mensaje})
    }
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(404).json({msg:error.mensaje})
    }
 //Esta bien , se puede eliminar
 proyecto.colaboradores.pull(req.body.id)
 await proyecto.save()
 res.json({msg: 'Colaborador eliminado correctamente'})
// console.log(req.body)

}


export {obtenerProyectos,nuevoProyecto,obtenerProyecto,editarProyecto,eliminarColaborador,eliminarProyecto,agregarColaborador,buscarColaborador}