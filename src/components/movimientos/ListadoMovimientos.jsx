import React, { useContext } from 'react';
import Movimiento from './Movimiento';
import vehiculoContext from '../../context/vehiculos/vehiculoContext';
import movimientoContext from '../../context/movimientos/movimientoContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoMovimientos = () => {
  const nodeRef = React.useRef(null);
  //Obtener el State de vehiculo
  const vehiculosContext = useContext(vehiculoContext);
  const { vehiculo, eliminarVehiculo } = vehiculosContext;

  //Obtener los movimientos del  vehiculo
  const movimientosContext = useContext(movimientoContext);
  const { movimientosvehiculo } = movimientosContext;

  //Si no hay vehiculo seleccionado
  if (!vehiculo) return <h2>Selecciona un Vehiculo</h2>;

  //Array destructuring para extraer el proyecto actual
  const [vehiculoActual] = vehiculo;

  //Elimina un Vehiculo
  const onClickEliminar = () => {
    eliminarVehiculo(vehiculoActual._id);
    // console.log(vehiculoActual);
  };

  return (
    <>
      <h2>Vehiculo: {vehiculoActual.patente}</h2>

      <ul className="listado-movimientos">
        {!movimientosvehiculo.length === 0 ? (
          <li className="movimiento">
            <p>No hay movimientos</p>
          </li>
        ) : (
          <TransitionGroup>
            {movimientosvehiculo.map((movimiento) => (
              <CSSTransition
                key={movimiento._id}
                nodeRef={nodeRef}
                in
                timeout={200}
                classNames="movimiento"
              >
                <Movimiento movimiento={movimiento} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Vehiculo &times;
      </button>
    </>
  );
};

export default ListadoMovimientos;
