import React, {useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'

import Alerta from '../components/Alerta'
import clienteAxios from '../../config/ClienteAxios'


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
  const {id} = params

  useEffect(() => {

    const confirmarCuenta = async() => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const {data} = await clienteAxios(url)
        // console.log(data)
        setAlerta ({
          error: false,
          mensaje: data.msg
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta ({
          error: true,
          mensaje: error.response.data.msg
        })
      }
    }
    //Este codigo de llamar una funcion que llame a la funcion confirmar cuenta evita un doble renderizado del UseEffect
   return () => confirmarCuenta();
  }, [])
  
const {mensaje} = alerta


  return (
    <>
    <h1 className='text-6xl font-black text-sky-600'>Confirma tu cuenta y comienza a crear tus <span className='text-gray-700'>Proyectos</span></h1>
    {mensaje &&  <Alerta alerta={alerta}/> }
    {cuentaConfirmada && <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={"/"}>Inicia Sesion</Link>}
   
    </>

  )
}

export default ConfirmarCuenta