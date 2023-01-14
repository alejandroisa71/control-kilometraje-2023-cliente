import React, { useContext, useEffect } from 'react';
import Vehiculo from './Vehiculo';
import vehiculoContext from '../../context/vehiculos/vehiculoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoVehiculos = () => {
  const nodeRef = React.useRef(null);

  //Extraer vehiculos de state inicial
  const vehiculosContext = useContext(vehiculoContext);
  const { mensaje, vehiculos, obtenerVehiculos } = vehiculosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Obtener vehiculos cuando carga el componente
  useEffect(() => {
    //si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerVehiculos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje]);

  // revisar si vehiculos tiene contenido
  if (vehiculos.length === 0) return <p>No hay Vehiculos, Agrega uno</p>;

  return (
    <ul className="listado-vehiculos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div>
      ) : null}
      <TransitionGroup>
        {vehiculos.map((vehiculo) => (
          <CSSTransition
            key={vehiculo._id}
            nodeRef={nodeRef}
            in
            timeout={200}
            classNames="vehiculo"
          >
            <Vehiculo vehiculo={vehiculo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoVehiculos;
