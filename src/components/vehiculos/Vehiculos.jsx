import React, { useContext, useEffect }from "react";
import Barra from "../layouts/Barra";
import Sidebar from "../layouts/Sidebar";
import FormMovimiento from "../movimientos/FormMovimiento";
import ListadoMovimientos from '../movimientos/ListadoMovimientos'
import AuthContext from '../../context/autenticacion/authContext'

const Vehiculos = () => {

//Extraer la información de autenticacion
const authContext = useContext(AuthContext)
const{usuarioAutenticado,}= authContext


useEffect(() => {
  usuarioAutenticado()
  
},

// // eslint-disable-next-line react-hooks/exhaustive-deps
[]);



  return (
    <>
      <Barra />
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <main>
            <FormMovimiento />
          <div className="contenedor-movimientos">
            <ListadoMovimientos/>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default Vehiculos;
