import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/ClienteAxios'
import useAuth from '../hooks/useAuth'
// import authStore from '../store/authStore'





const Login = () => {
  const {setAuth} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const Navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault()
    if ([email,password].includes("")) {
      setAlerta({
        error: true,
        mensaje: "Todos los campos son obligatorios"
      })
      return
    }
    try {
      const {data} = await clienteAxios.post(`/usuarios/login`, {email,password})
      console.log(data)
      localStorage.setItem('token',data.token)
      setAuth(data)
      Navigate('/proyectos')
      
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
    <h1 className='text-6xl font-black text-sky-600'>Inicia sesión y administra tus <span className='text-gray-700'>Proyectos</span></h1>

    {mensaje && <Alerta alerta={alerta}/>}

    <form 
    onSubmit={handleSubmit}
    className='my-10 shadow-md rounded-md bg-white p-5'>
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
      </div>
      <div className='my-5'>
      <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
      <input 
      id='password'
      type='password'
      placeholder='Password'
      className='w-full border rounded-xl p-2 mt-3 bg-gray-50'
      value={password}
      onChange={e => setPassword(e.target.value)}
      />
      <input 
      type='submit' 
      value="Iniciar sesión"
      className='font-bold text-white uppercase text-xl rounded bg-sky-700 w-full p-2 mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors' />
      </div>
   
    </form>

    <nav className='lg:flex lg:justify-between'>
        <Link  to="/registrar"
        className='block text-center my-5 text-slate-500 uppercase text-sm' >
       
             No tienes una cuenta? Registrate   
        </Link>
        <Link to="/olvide-password"
        className='block text-center my-5 text-slate-500 uppercase text-sm' >
       
             Olvide Password 
        </Link>
    </nav>

    {/* Osos:{osos}
    Perros: {perros} 
    <button className='bg-red-900 text-white p-4 ml-4' onClick={incrementarPerro}>Incrementar Perro</button>
    <button className='bg-red-900 text-white p-4 ml-4' onClick={incrementarOso}>Incrementar Oso</button> */}
    </>
  )
}

export default Login