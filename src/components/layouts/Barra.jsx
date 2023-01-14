import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {
  const navigate = useNavigate();

  //Extraer la información de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  const logout = () => {
    cerrarSesion();
    navigate("/");
  };
  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-sesion" onClick={logout}>
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Barra;
