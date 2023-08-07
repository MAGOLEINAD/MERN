import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/ClienteAxios";
import Alerta from "../components/Alerta";
import { useNavigate } from "react-router-dom";




const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const navigate = useNavigate()

    const [proyectos,setProyectos] = useState([])
    const [proyecto,setProyecto] = useState({})
    const [alerta, setAlerta] = useState({error:false, mensaje:""})
    const [cargando,setCargando] = useState(false)
    const [ModalFormularioTarea,setModalFormularioTarea] = useState(false)
    const [ModalEliminarTarea,setModalEliminarTarea] = useState(false)
    const [ModalEliminarColaborador,setModalEliminarColaborador] = useState(false)
    const [Tarea,setTarea] = useState({})
    const [colaborador,setColaborador]= useState({})

  


    const agregarColaborador = async(email) => {
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            console.log(data)
            setAlerta({
                error:true, 
                mensaje:data.msg
            })
            setColaborador({})
        } catch (error) {
            console.log(error.response)
            setAlerta({
                error:true, 
                mensaje:error.response.data.msg
            })
            // setAlerta({})
    }
}

    const submitColaborador = async (email) => {
        setColaborador({})
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/colaboradores`, {email}, config)
            setColaborador(data)
            setAlerta({})
            console.log(data)
        } catch (error) {
            console.log(error.response)
            setAlerta({
                error:true, 
                mensaje:error.response.data.msg
            })
        } finally {
            setCargando(false)
        }
            
    }



    const handleModalTarea = () => {
        setModalFormularioTarea(!ModalFormularioTarea)
        setTarea({})
    }

    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }
    const handleModalEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(!ModalEliminarTarea)
    }
    const handleModalEliminarColaborador = (colaborador) => {
       setModalEliminarColaborador(!ModalEliminarColaborador)
       setColaborador (colaborador)
       console.log(colaborador)
    }
    const eliminarColaborador = async (colaborador) => {
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaborador/${proyecto._id}`, {id: colaborador._id}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            console.log(data)
            setAlerta({
                error:true, 
                mensaje:data.msg
            })
            setColaborador({})
            setModalEliminarColaborador(!ModalEliminarColaborador)
        } catch (error) {
            console.log(error.response)
            setAlerta({
                error:true, 
                mensaje:error.response.data.msg
            })
            // setAlerta({})
    }
    }

    const submitTarea = async (tarea) => {
        if (tarea?.ID) {
        await  editarTarea(tarea)
        } else {
        await crearTarea(tarea)
        }
    }
    const eliminarTarea = async () => {
        console.log(Tarea)
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/tareas/${Tarea._id}`,config)
            console.log(data)
            //Actualizar DOM
            const proyectoActualizado = {...proyecto}
            console.log(proyectoActualizado)
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== Tarea._id)
            setProyecto(proyectoActualizado)
            setAlerta({error:false, mensaje:"La tarea se elimino Correctamente"})
            setModalEliminarTarea(false)
           } catch (error) {
            console.log(error)
           }
        }

const crearTarea = async (tarea) => {
       try {
        const token = localStorage.getItem('token')
        // console.log(token)
        if (!token) 
        return 
        const config = {
            headers: {
               "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await clienteAxios.post(`/tareas/`,tarea,config)
        // console.log(data)
        //Agrega la tarea al state
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyecto.tareas,data]
        setProyecto(proyectoActualizado)
        setAlerta({})
        setModalFormularioTarea(false)
       } catch (error) {
        console.log(error)
       }
    }

const editarTarea = async (tarea) => {
       try {
        const token = localStorage.getItem('token')
        // console.log(token)
        if (!token) 
        return 
        const config = {
            headers: {
               "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        }
        const {data} = await clienteAxios.put(`/tareas/${tarea.ID}`,tarea,config)
        console.log(data)
        //Actualizar DOM
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState )
        setProyecto(proyectoActualizado)
        setAlerta({})
        setModalFormularioTarea(false)
       } catch (error) {
        console.log(error)
       }
    }

    const submitProyecto = async (proyecto) => {
        // console.log(proyecto)
        if (proyecto.ID) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
        
        // console.log(proyecto)
    }


    const nuevoProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/proyectos', proyecto, config)
            setAlerta({error:false, mensaje:"Su proyecto se ha cargado correctamente"})
            // La proxima linea es para que se actualice de inmediato el front
            setProyectos([...proyectos, data])
        } catch (error) {
            console.log(error)
        }
    }
    const editarProyecto = async (proyecto) => {
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/proyectos/${proyecto.ID}`, proyecto, config)
            setAlerta({error:false, mensaje:"Su proyecto se ha modificado correctamente"})
            // La proxima linea es para que se actualice de inmediato el front
            //La siguiente linea es para que devuelva todos los proyectos y asigne el nuevo valor modificado al que tenga el mismo ID.
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            // console.log(proyectosActualizados)
            setProyectos(proyectosActualizados)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token) 
            return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/proyectos/${id}`, config)
            setAlerta({error:false, mensaje:"Su proyecto se ha eliminado"})
            
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            // console.log(proyectosActualizados)
            setProyectos(proyectosActualizados)
            setTimeout(() => {
                
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
             
        } catch (error) {
            console.log(error)
        }
    }

  
    const obtenerProyectos = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return 
            const config = {
                headers: {
                   "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios('/proyectos', config)
            console.log(data)
            setProyectos(data)
        } catch (error) {
            console.log(error)
        }
    }
    
      
        

        const obtenerProyecto = async (id) => {
            try {
                setCargando(true)
                const token = localStorage.getItem('token')
                if (!token) return 
                const config = {
                    headers: {
                       "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios(`/proyectos/${id}`, config)
                // console.log(data)
                setProyecto(data.proyecto)
            } catch (error) {
                console.log(error)
            }
            finally {
                setCargando(false)
            }
        }


    return (
        <ProyectosContext.Provider value={{
            proyectos,
            setProyectos,
            submitProyecto,
            alerta,
            setAlerta,
            obtenerProyecto,
            proyecto,
            cargando,
            eliminarProyecto,
            handleModalTarea,
            ModalFormularioTarea,
            submitTarea,
            handleModalEditarTarea,
            Tarea,
            ModalEliminarTarea,
            handleModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            agregarColaborador,
            handleModalEliminarColaborador,
            ModalEliminarColaborador,
            eliminarColaborador,
            obtenerProyectos
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export {ProyectosProvider}
export default ProyectosContext