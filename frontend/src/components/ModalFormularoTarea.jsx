import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'


const ModalFormularioTarea = () => {
 const {handleModalTarea,ModalFormularioTarea,setAlerta,alerta,submitTarea,Tarea} = useProyectos()

 const [ID,setID] = useState()
 const [nombre,setNombre] = useState('')
 const [descripcion,setDescripcion] = useState('')
 const [fechaEntrega,setFechaEntrega] = useState()
 const [prioridad,setPrioridad] = useState('')
 const {id} = useParams()
 

 const tarea = {ID,nombre,descripcion,prioridad,fechaEntrega,proyecto:id}

const PRIORIDAD = ['Baja','Media','Alta']
const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre,descripcion,prioridad].includes('')) {
        setAlerta({error:true, mensaje:"Todos los campos son obligatorios"})
        setTimeout(() => {
            setAlerta({error:false, mensaje:""})
        }, 3000);
        return
    }
    await submitTarea(tarea)
    setID('')
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setPrioridad('')
}
useEffect(() => {
    if (Tarea?._id) {
        setID(Tarea._id)
        setNombre(Tarea.nombre)
        setDescripcion(Tarea.descripcion)
        setFechaEntrega(Tarea.fechaEntrega)
        setPrioridad(Tarea.prioridad)
    } else {
        setID('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
    }
}, [Tarea])


    return (
        <Transition.Root show={ ModalFormularioTarea } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTarea}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalTarea }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {!ID ? 'Crear Tarea' : 'Modificar Tarea'}
                                    </Dialog.Title>
                            {alerta.mensaje && <Alerta alerta={alerta}/>}

                                        <form onSubmit={handleSubmit} className='my-10'>
                                            <div className='mb-5'>
                                            <label htmlFor='nombre' className='text-gray-700 uppercase font-bold text-sm'>Nombre Tarea</label>
                                            <input 
                                                type='text' 
                                                id='nombre'
                                                placeholder='Nombre de la tarea'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md '
                                                value={nombre}
                                                onChange={e => setNombre (e.target.value)}
                                            
                                            />
                                            </div>
                                            <div className='mb-5'>
                                            <label htmlFor='descripción' className='text-gray-700 uppercase font-bold text-sm'>Descripción de Tarea</label>
                                            <textarea 
                                                type='text' 
                                                id='descripción'
                                                placeholder='Descripción de la tarea'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md '
                                                value={descripcion}
                                                onChange={e => setDescripcion (e.target.value)}
                                            
                                            />
                                            </div>
                                            <div className='mb-5'>
                                            <label htmlFor='fecha' className='text-gray-700 uppercase font-bold text-sm'>Fecha de Entrega</label>
                                            <input 
                                                type='date' 
                                                id='fecha'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md '
                                                value={fechaEntrega}
                                                onChange={e => setFechaEntrega(e.target.value)}
                                            
                                            />
                                            </div>
                                            <div className='mb-5'>
                                            <label htmlFor='prioridad' className='text-gray-700 uppercase font-bold text-sm'>Prioridad de la Tarea</label>
                                            <select 
                                                type='text' 
                                                id='prioridad'
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md '
                                                value={prioridad}
                                                onChange={e => setPrioridad (e.target.value)}
                                            
                                            >
                                                <option value=''>Seleccione una Opcion</option>
                                                {PRIORIDAD.map(opcion => 
                                                <option value={opcion} key={opcion}>{opcion}</option>
                                                )}
                                            </select>
                                            </div>
                                                <input type='submit'
                                                className='bg-sky-600 p-3 text-white font-bold w-full uppercase text-sm hover:bg-sky-700 transition-colors cursor-pointer rounded' 
                                                value= {!ID ? 'Crear Tarea' : 'Modificar Tarea'}
                                                
                                                />
                                        </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea