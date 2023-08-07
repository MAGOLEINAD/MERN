import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import clienteAxios from '../../config/ClienteAxios'
import { useNavigate } from 'react-router-dom'




const AuthContext = createContext()

const AuthProvider = ({ children }) => {
const [auth, setAuth] = useState({})
const [cargando, setCargando] = useState(true)
const navigate = useNavigate()

// console.log(auth)
// console.log(cargando)

useEffect(() => {

const autenticarUsuario = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        setCargando(false)
        return
    }
    const config = {
        headers : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
   try {
        const {data} = await clienteAxios('/usuarios/perfil', config)
        console.log(data)
        setAuth(data)
        navigate('/proyectos')
      
   } catch (error) {
    setAuth({})
   } finally {
         setCargando(false)
   }
  
}
  //Este codigo de llamar una funcion que llame a la funcion confirmar cuenta evita un doble renderizado del UseEffect
  return () => autenticarUsuario();

}, [])


    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando
                
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
export default AuthContext