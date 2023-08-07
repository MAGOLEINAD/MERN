import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5">
          Up Task
        </h2>
        {/* <input
          type="search"
          placeholder="Buscador sin programar"
          className="rounded-lg lg:w-96 block p-2 border "
        /> */}
        <div className="flex justify-between items-center gap-4">
          <Link className="font-bold uppercase" to={"/proyectos"}>
            Proyectos
          </Link>
          <button className="font-bold uppercase bg-sky-600 text-white text-sm p-3 rounded-md">
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
