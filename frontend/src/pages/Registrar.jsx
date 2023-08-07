import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/ClienteAxios";



const Registrar = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });
  const [alerta, setAlerta] = useState({
    mensaje: "",
    error: false,
  });
  const limpiarFormulario = () => {
    setFormulario(
      Object.fromEntries(
        Object.keys(formulario).map(key => [key, ""])
      )
    );
  };


  const { nombre, email, password, confirmarPassword } = formulario;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if ([nombre, email, password, confirmarPassword].includes("")) {
      setAlerta({
        error: true,
        mensaje: "Todos los campos son Obligatorios",
      });
    } 
    else if (password !== confirmarPassword) {
      setAlerta({
        error: true,
        mensaje: "Los passwords no son iguales",
      })
    }
    else if (password.length < 6 ) {
      setAlerta({
        error: true,
        mensaje: "El password es muy corto, son minimo 6 caracteres",
      })
    }
    else {
    setAlerta({ ...alerta, error: false });
    //Conectar con API
    try {
        const {data} = await clienteAxios.post(`/usuarios`, {nombre,email,password})
        // console.log(data)
        setAlerta ({
          error: false,
          mensaje: "Usuario creado correctamente, revisa tu email para confirmar tu cuenta",
        })
        limpiarFormulario()
          
    } catch (error) {
      console.log(error.response.data.msg)
      setAlerta ({
        error: true,
        mensaje: error.response.data.msg
      })
    }
    
  }
  };

  return (
    <>
      <h1 className="text-6xl font-black text-sky-600">
        Crea tu cuenta y administra tus{" "}
        <span className="text-gray-700">Proyectos</span>
      </h1>
      {alerta.mensaje && <Alerta alerta={alerta} />}
      <form
        className="my-10 shadow-md rounded-md bg-white p-5"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) =>
              setFormulario({ ...formulario, nombre: e.target.value })
            }
            placeholder="Tu nombre"
            className="w-full border rounded-xl p-2 mt-3 bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setFormulario({ ...formulario, email: e.target.value })
            }
            placeholder="Email de Registro"
            className="w-full border rounded-xl p-2 mt-3 bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) =>
              setFormulario({ ...formulario, password: e.target.value })
            }
            type="password"
            placeholder="Tu password"
            className="w-full border rounded-xl p-2 mt-3 bg-gray-50"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repite tu password
          </label>
          <input
            id="password2"
            value={confirmarPassword}
            onChange={(e) =>
              setFormulario({
                ...formulario,
                confirmarPassword: e.target.value,
              })
            }
            type="password"
            placeholder="Repite tu password"
            className="w-full border rounded-xl p-2 mt-3 bg-gray-50"
          />
          <input
            type="submit"
            value="Crear cuenta"
            className="font-bold text-white uppercase text-xl rounded bg-sky-700 w-full p-2 mt-3 hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </div>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
