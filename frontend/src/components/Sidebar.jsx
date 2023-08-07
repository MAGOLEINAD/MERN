import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Sidebar = () => {
    const {auth} = useAuth()
  return (
   
    <aside className="md:w-80 lg:w-96 px-5 py-10 ">
    <p className="text-xl font-bold">Hola {auth.nombre}</p>
    <Link className="bg-sky-600 font-bold text-white p-3 block mt-5 text-center rounded-md" to={'nuevo-proyecto'}>Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar