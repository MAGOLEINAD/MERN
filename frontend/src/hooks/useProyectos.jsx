import { useContext } from "react";
import ProyectosContext from "../context/ProyectoProvider";




const useProyectos = () => {
  return (
    useContext(ProyectosContext)
  )
}

export default useProyectos