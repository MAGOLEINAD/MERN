import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";

  return (
    <main className="">
      <div className="bg-gray-100">
        {auth._id ? (
          <div className="">
            <Header />

            <div className="md:flex md:min-h-screen mt-8">
              <Sidebar />
              <main className=" flex-1">
                <Outlet />
              </main>
            </div>
          </div>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </main>
  );
};

export default RutaProtegida;
