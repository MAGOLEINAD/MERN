import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <>
    <div className={alerta.error === true ? 'bg-red-500 text-white text-center uppercase mt-6 rounded-lg font-medium p-2 text-sm' 
                                          : 'bg-sky-600 text-white text-center uppercase mt-6 rounded-lg font-medium p-2 text-sm' }>{alerta.mensaje}
    </div>
    </>
  )
}

export default Alerta