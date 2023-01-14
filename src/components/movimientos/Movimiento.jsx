import React, { useContext } from "react";
import vehiculoContext from "../../context/vehiculos/vehiculoContext";
import movimientoContext from "../../context/movimientos/movimientoContext";

const Movimiento = ({ movimiento }) => {
  //Obtener vehiculos d State inicial de vehiculo
  const vehiculosContext = useContext(vehiculoContext);
  const { vehiculo } = vehiculosContext;

  //Obtener la funcion del context de movimiento
  const movimientosContext = useContext(movimientoContext);
  const {
    eliminarMovimiento,
    obtenerMovimientos,
    actualizarMovimiento,
    guardarMovimientoActual,
  } = movimientosContext;

  //Extraer el vehiculo
  const [vehiculoActual] = vehiculo;

  //Funcion que se ejecuta cuand el usario presiona el boton Eliminar
  const movimientoEliminar = (id) => {
    eliminarMovimiento(id, vehiculoActual._id);
    obtenerMovimientos(vehiculoActual._id);
  };

  // Funcion que modifica el estado del movimiento
  const cambiarEstado = (movimiento) => {
    if (!movimiento.estado) {
      movimiento.estado = true;
    } else {
      movimiento.estado = false;
    }
    console.log(movimiento.estado)

    actualizarMovimiento(movimiento);
  };

  //Agrega un movimiento actual cuando el usuario desea editarla
  const seleccionarMovimiento = (movimiento)=>{
    guardarMovimientoActual(movimiento)
  }

  return (
    <li className="movimiento sombra">
      {/* <p>{movimiento.fecha}</p> */}
      <p>{movimiento.detalle}</p>
      {/* <p>{movimiento.final}</p> */}
      <div className="estado">
        {movimiento.estado === true ? (
          <button
            type="button"
            className="anulado"
            onClick={() => cambiarEstado(movimiento)}
          >
            Anulado
          </button>
        ) : (
          <button
            type="button"
            className="activo"
            onClick={() => cambiarEstado(movimiento)}
          >
            Activo
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={()=>seleccionarMovimiento(movimiento)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => movimientoEliminar(movimiento._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Movimiento;
