import { useEffect } from "react"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useParams } from "react-router-dom"



export const NuevoColaborador = () => {

    const {obtenerProyecto,proyecto,cargando,colaborador,agregarColaborador} = useProyectos()
    const params = useParams()
    console.log(colaborador)
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [params.id])

    if (cargando) return 'Cargando...'
    
  return (
    <>
    <h1 className="text-3xl mx-4 font-black">Añadir colaborador al proyecto {proyecto.nombre}</h1>
    <div className="mt-10 flex justify-center  ">
        <FormularioColaborador/>
    </div>

    {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
        <div className="flex justify-center mt-10">
            <div className="bg-white rounded-lg shadow py-10 px-5 md:w-1/2 w-full mx-4">
                <h2 className=" text-2xl font-bold text-center mb-10" >Resultado:</h2>
                <div className="flex justify-between items-center">
                    <p>{colaborador.nombre}</p>
                    <button onClick={() => agregarColaborador({email: colaborador.email})} type='button' className="text-sm uppercase font-bold rounded-lg px-5 py-2 bg-slate-500 text-white">Agregar al Proyecto</button>
                </div>
            </div>
        </div>
    )}

    </>

  )
}
