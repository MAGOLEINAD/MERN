import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Fragment } from "react"
import ModalFormularoTarea from "../components/ModalFormularoTarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Tarea from "../components/Tarea"
import Alerta from "../components/Alerta"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"






const Proyecto = () => {
    const { obtenerProyecto, proyecto, cargando,handleModalTarea,alerta,setAlerta} = useProyectos()
    const [modal, setModal] = useState(false)
    const { id } = useParams()

    useEffect(() => {
  console.log(proyecto)
    }, [])
    
   

const {mensaje} = alerta
function desvanecerMensajeAlerta() {
    setTimeout(() => {
        setAlerta({error:false, mensaje:''})
    }, 3000);
    return <Alerta alerta={alerta}/>
}

    useEffect(() => {
        obtenerProyecto(id)
    }, [])


    return (
        <Fragment>
            {cargando ? '...' : <>
                <div className="flex justify-between px-8">
                    <h1 className="text-4xl font-black">{proyecto.nombre}</h1>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <Link className="uppercase font-bold" to={`/proyectos/editar/${id}`}>Editar</Link>
                    </div>




                </div>
                <div className="md:mx-8 mx-5">
                    <button onClick={handleModalTarea} className="flex gap-2  items-center justify-center mt-5 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-500 text-white text-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg> 
                    Nueva Tarea
                    </button>
                    <p className="font-bold text-xl mt-10 ">Tareas del proyecto</p>

                    {mensaje && desvanecerMensajeAlerta()}

                    <div className="bg-white shadow mt-10 rounded-lg ">
                        {proyecto.tareas?.length? proyecto.tareas?.map(tarea => <Tarea key={tarea._id} tarea={tarea}/>) : <p className="text-center my-5 p-6">No hay tareas en este proyecto</p> }
                    </div>
                </div>

                <div className="justify-between flex mx-10 items-center mt-10">
                <p className="font-bold text-xl  ">Colaboradores</p>
                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>

                        
                        <Link className="uppercase font-bold" to={`/proyectos/nuevo-colaborador/${proyecto._id}`}>Añadir</Link>
                    </div>

                </div>

                <div className="bg-white shadow mt-10 rounded-lg mx-10 ">
                        {proyecto.colaboradores?.length? proyecto.colaboradores?.map(colaborador => <Colaborador key={colaborador._id} colaborador={colaborador}/>) : <p className="text-center my-5 p-6">No hay colaboradores en este Proyecto</p> }
                    </div>

                <ModalFormularoTarea />
                <ModalEliminarTarea/>
                <ModalEliminarColaborador/>


            </>
            }
        </Fragment>
    )
}

export default Proyecto