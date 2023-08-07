import {  useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"




const FormularioColaborador = () => {
    const {alerta, setAlerta,submitColaborador} = useProyectos()
    const [email, setEmail] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '') {
            setAlerta({mensaje:'Debes completar el email', error: true})
        }
        submitColaborador(email)
    }
  return (
    <>

    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 shadow rounded-lg w-full mx-4 md:w-1/2">
    {alerta.error && <Alerta alerta={alerta}/>}
             <div className='mb-5'>
            <label 
            className='text-gray-700 uppercase text-sm font-bold' 
            htmlFor='email'
            >
               Nombre
            </label>
            <input 
            id='email'
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='email' 
            value={email}
            onChange={e => setEmail(e.target.value)}
            />

        </div>
 
        <input
        value= 'Buscar colaborador'
        className='w-full bg-sky-600 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
        type='submit' />
    
    </form>
    </>
  )
}

export default FormularioColaborador