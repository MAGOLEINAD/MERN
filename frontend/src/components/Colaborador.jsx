import useProyectos from "../hooks/useProyectos"



const Colaborador = ({colaborador}) => {
    const {handleModalEliminarColaborador} =  useProyectos()
    const {nombre,email} = colaborador
  return (
    <div className="border-b p-5 flex justify-between items-center">
       <div>
        <p>{nombre}</p>
        <p className="text-gray-700 text-sm">{email}</p>
       </div>
       <button 
       onClick={() => handleModalEliminarColaborador(colaborador)}
       className="bg-red-600 px-4 py-2 rounded-lg text-sm uppercase text-white font-bold"
       type="button">
         Eliminar
       </button>
    
    </div>
  )
}

export default Colaborador