import React, {useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../../config/ClienteAxios'


const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false)
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const {token} = useParams()
  // console.log(token)

  useEffect(() => {
 
    const comprobarToken = async() => {
      try {
         const data = await clienteAxios.get(`/usuarios/olvide-password/${token}`)
         console.log(data)
         setTokenValido(true)
      } catch (error) {
        setAlerta({
          error:true,
          mensaje: error.response.data.msg
        })
      }
    }
  
    return () => comprobarToken()
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (password.length < 4 ) {
      setAlerta({
        error: true,
        mensaje:"El password debe tener mas de 4 caracteres"
      })
      return
    }
    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url ,{password})
      console.log(data)
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
  
  return (
    <>
    <h1 className='text-6xl font-black text-sky-600'>Restablece tu password y no pierdas acceso a tus <span className='text-gray-700'>Proyectos</span></h1>
    {alerta.mensaje && <Alerta alerta={alerta}/>}
    {tokenValido &&
    <form className='my-10 shadow-md rounded-md bg-white p-5' onSubmit={handleSubmit}>

 
      <div className='my-5'>
      <label htmlFor='password' className='uppercase text-gray-600 block text-xl font-bold'>Nuevo password</label>
      <input 
      id='password'
      type='password'
      placeholder='Escribe tu nuevo password'
      className='w-full border rounded-xl p-2 mt-3 bg-gray-50'
      value={password}
      onChange={e => setPassword(e.target.value)}
      />
      <input 
      type='submit' 
      value="Guardar nuevo password"
      className='font-bold text-white uppercase text-xl rounded bg-sky-700 w-full p-2 mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors' />
      </div>
   
    </form>
    }
    </>
  )
}

export default NuevoPassword