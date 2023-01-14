import React, { useContext, useState, useEffect } from 'react';
import vehiculoContext from '../../context/vehiculos/vehiculoContext';
import movimientoContext from '../../context/movimientos/movimientoContext';

const FormMovimiento = () => {
  //Extraer si el vehiculo esta activo
  const vehiculosContext = useContext(vehiculoContext);
  const { vehiculo } = vehiculosContext;
  // console.log(vehiculo[0]._id)
  // const {_id}=vehiculo
  // console.log(_id);

  //Obtener la funcion del context de movimiento
  const movimientosContext = useContext(movimientoContext);
  const {
    movimientoseleccionado,
    errormovimiento,
    agregarMovimiento,
    validarMovimiento,
    obtenerMovimientos,
    actualizarMovimiento,
    limpiarMovimiento,
  } = movimientosContext;

  //Effect que detecta que hay un movimiento seleccionado
  useEffect(() => {
    if (movimientoseleccionado !== null) {
      guardarMovimiento(movimientoseleccionado);
    } else {
      guardarMovimiento({final:'',detalle:''});
    }
  }, [movimientoseleccionado]);

  //State del formulario
  const [movimiento, guardarMovimiento] = useState({
    // fecha: "",
    final: 0,
    detalle: '',
  });

  // extraer campos del movimiento
  // const { fecha, final, detalle } = movimiento;
  const { final, detalle } = movimiento;

  //Si no hay vehiculo seleccionado
  if (!vehiculo) return null;

  //Array destructuring para extraer el proyecto actual
  const [vehiculoActual] = vehiculo;
  // console.log(vehiculoActual)

  //leer los valores del formulario
  const handleChange = (e) => {
    guardarMovimiento({
      ...movimiento,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validar
    // if (fecha.trim() === "" || final === 0 || detalle.trim() === "") {
    if (final === 0 || detalle.trim() === '') {
      validarMovimiento();
      return;
    }

    //Si es edicion o es nuevo movimiento
    if (movimientoseleccionado === null) {
      //agregar el nuevo movimiento al state de movimientos
      movimiento.vehiculo = vehiculoActual._id;
      agregarMovimiento(movimiento);
    } else {
      //actualizar movimiento existente
      actualizarMovimiento(movimiento);

      //Elimina movimiento seleccionado del state
      limpiarMovimiento();
    }

    //Obtener y filtrar los movimientos del vehiculo actual
    obtenerMovimientos(vehiculoActual._id);

    //reiniciar el formulario
    guardarMovimiento({
      // fecha: "",
      final: 0,
      detalle: '',
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        {/* <div className="contenedor-input">
          <input
            type="date"
            className="input-text"
            placeholder="Detalle Movimiento..."
            name="fecha"
            value={fecha}
            onChange={handleChange}
          />
        </div> */}
        <div className="contenedor-input">
          <input
            type="number"
            className="input-text"
            placeholder="Kilometro Final..."
            name="final"
            value={final}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Detalle Movimiento..."
            name="detalle"
            onChange={handleChange}
            value={detalle}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={
              movimientoseleccionado
                ? 'Editar Movimiento'
                : 'Agregar Movimiento'
            }
          />
        </div>
      </form>

      {errormovimiento ? (
        <p className="mensaje error">Todos los campos son Obligatorios</p>
      ) : null}
    </div>
  );
};

export default FormMovimiento;
