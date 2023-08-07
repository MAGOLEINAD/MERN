import React from 'react'
import useProyectos from '../hooks/useProyectos'
import PreviewProyecto from '../components/PreviewProyecto'
import { useEffect } from 'react'





const Proyectos = () => {
  

const {proyectos,obtenerProyectos} = useProyectos()
useEffect(() => {
obtenerProyectos()
}, [])

// console.log(proyectos)
  return (
    <>
    <h1 className='font-black text-4xl'>Proyectos</h1>
    <div className='bg-white shadow mt-12 rounded-lg p-3 mx-8'>
      {proyectos.length > 0 ? proyectos.map(proyecto => (<PreviewProyecto proyecto={proyecto} key={proyecto._id}/>)) : <p className=' text-gray-600 text-center uppercase '>No hay proyectos</p>}
    </div>
    
    </>
  )
}

export default Proyectos