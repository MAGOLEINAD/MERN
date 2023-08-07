import React, { useState } from 'react'
import Alerta from './Alerta'
import useProyectos from '../hooks/useProyectos'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'




const FormularioProyecto = () => {
const navigate = useNavigate()
const {submitProyecto,setAlerta,alerta,proyecto} = useProyectos()

const [nombre, setNombre] = useState('')
const [descripcion, setDescripcion] = useState('')
const [fechaEntrega, setFechaEntrega] = useState('')
const [cliente, setCliente] = useState('')
const [ID, setID] = useState(null)
const params = useParams()

useEffect(() => {
if (params.id && proyecto.nombre) {
   setNombre(proyecto.nombre)
   setDescripcion(proyecto.descripcion)
   setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
   setCliente(proyecto.cliente)
   setID(proyecto._id)
}

}, [params])


const handleSubmit = async (e) => {
    e.preventDefault()
    if([nombre,descripcion,fechaEntrega,cliente].includes("")) {
        setAlerta({mensaje:"Todos los campos son obligatorios", error: true})
    }
    else {
        setAlerta({mensaje:"", error: false})
        //Pasando los datos hacia el Provider de Proyectos
        await submitProyecto({ID,nombre,descripcion,fechaEntrega,cliente})
        //Resetear Form
        setID(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
        }, 3000);
    }
    setTimeout(() => {
        setAlerta({mensaje:"", error: false})
    }, 5000)
}

  return (
    <>

    <form onSubmit={handleSubmit} className='bg-white py-5 px-5 md:w-1/2 rounded-lg shadow'>
    {<div className='mb-4'>{alerta.mensaje && <Alerta alerta={alerta}/>}</div> }
        <div className='mb-5'>
            <label 
            className='text-gray-700 uppercase text-sm font-bold' 
            htmlFor='nombre'
            >
                Nombre proyecto
            </label>
            <input 
            id='nombre'
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text' 
            placeholder='Nombre del proyecto'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />

        </div>
        <div className='mb-5'>
            <label 
            className='text-gray-700 uppercase text-sm font-bold' 
            htmlFor='descripcion'
            >
               Descripcion
            </label>
            <textarea 
            id='descripcion'
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text' 
            placeholder='Descripcion del proyecto'
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            />

        </div>
        <div className='mb-5'>
            <label 
            className='text-gray-700 uppercase text-sm font-bold' 
            htmlFor='cliente'
            >
               Cliente
            </label>
            <input 
            id='cliente'
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='text' 
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            />

        </div>
        <div className='mb-5'>
            <label 
            className='text-gray-700 uppercase text-sm font-bold' 
            htmlFor='descripcion'
            >
               Fecha de entrega
            </label>
            <input 
            id='fecha-entrega'
            className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            type='date' 
            value={fechaEntrega}
            onChange={e => setFechaEntrega(e.target.value)}
            />

        </div>
 
        <input
        value={ID? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className='w-full bg-sky-600 p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
        type='submit' />
    </form>
    </>
  )
}

export default FormularioProyecto