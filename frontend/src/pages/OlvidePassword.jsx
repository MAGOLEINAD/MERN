import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/ClienteAxios'





const OlvidePassword = () => {
  const [email, setEmail] = useState("")
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (email.length < 6 ) {
      setAlerta({
        error: true,
        mensaje:"Completa el email por favor"
      })
      return
    }
    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{email})
      // console.log(data)
      setAlerta({
        error:false,
        mensaje: data.msg
      })
    } catch (error) {
      setAlerta({
        error:true,
        mensaje: error.response.data.msg
      })
    }
  }

   const {mensaje} = alerta
  return (
    <>
    <h1 className='text-6xl font-black text-sky-600'>Recupera tu acceso y no pierdas tus <span className='text-gray-700'>Proyectos</span></h1>

    {mensaje && <Alerta alerta={alerta}/>}
    <form className='my-10 shadow-md rounded-md bg-white p-5' onSubmit={handleSubmit}>
      
      <div className='my-5'>
      <label htmlFor='email' className='uppercase text-gray-600 block text-xl font-bold'>email</label>
      <input 
      id='email'
      type='email'
      placeholder='Email de Registro'
      className='w-full border rounded-xl p-2 mt-3 bg-gray-50'
      value={email}
      onChange={e => setEmail(e.target.value)}
      
      />
       <input 
      type='submit' 
      value="Enviar instrucciones"
      className='font-bold text-white uppercase text-xl rounded bg-sky-700 w-full p-2 mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors' />
      </div>
     
   
    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link  to="/"
        className='block text-center my-5 text-slate-500 uppercase text-sm' >
       
             Ya tienes una cuenta? Inicia sesión   
        </Link>
        <Link to="/registrar"
        className='block text-center my-5 text-slate-500 uppercase text-sm' >
       
             No tienes una cuenta, Registrate
        </Link>
    </nav>
    </>
  )
}

export default OlvidePassword