import React, { useContext } from "react";
import vehiculoContext from "../../context/vehiculos/vehiculoContext";
import movimientoContext from "../../context/movimientos/movimientoContext";

const Vehiculo = ({ vehiculo }) => {
  //Obtener vehiculos d State inicial de vehiculo
  const vehiculosContext = useContext(vehiculoContext);
  const { vehiculoActual } = vehiculosContext;

  

   //Obtener la funcion del context de movimiento
   const movimientosContext = useContext(movimientoContext);
   const{obtenerMovimientos} = movimientosContext;
  


//Funcion para agregar el vehiculo Actual 
const seleccionarVehiculo= id =>{
  vehiculoActual(id) // Fijar un vehiculo actual
   obtenerMovimientos(id) //Filtrar los movimientos cuando se de Click
  }
 

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarVehiculo(vehiculo._id)}
      >
        {vehiculo.patente}
      </button>
    </li>
  );
};

export default Vehiculo;
