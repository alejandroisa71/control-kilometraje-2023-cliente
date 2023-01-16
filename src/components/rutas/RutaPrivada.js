import React,{ useContext, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = () => {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;
  // console.log(autenticado);

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  if (!autenticado && !cargando) {
    return <Navigate to="/" />;
  }
  return <Outlet />
};

export default RutaPrivada;
