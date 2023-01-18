import React, { useContext, useState, useEffect } from 'react';
import moment from 'react-moment';
import 'moment-timezone';
import Swal from 'sweetalert2';
import vehiculoContext from '../../context/vehiculos/vehiculoContext';
import movimientoContext from '../../context/movimientos/movimientoContext';
import AuthContext from '../../context/autenticacion/authContext';

const FormMovimiento = () => {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  // console.log(usuario.nombre);
  // const { nombre } = usuario;
  //   const dia =moment().format('L');
  //  console.log(dia);
  // const date = new Date()
  // console.log(date);

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
      guardarMovimiento({ final: '', detalle: '' });
    }
  }, [movimientoseleccionado]);

  //State del formulario
  const [movimiento, guardarMovimiento] = useState({
    fecha: '',
    inicial: 0,
    final: 0,
    detalle: '',
    origen:'',
    destino:'',
    chofer: '',
  });

  // extraer campos del movimiento
  const { fecha, inicial, final, detalle,origen, destino, chofer } = movimiento;
  // const {echa final, detalle } = movimiento;

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
    // if (fecha.trim() === '' || final === 0 || detalle.trim() === '') {
    if (inicial ===0 ||final === 0 || detalle.trim() === ''  || origen.trim() === ''  || destino.trim() === ''  || chofer.trim() ==='') {
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

    

    //reiniciar el formulario
    guardarMovimiento({
      fecha: '',
      inicial:0,
      final: 0,
      detalle: '',
      origen:'',
      destino:'',
      chofer:''
    });

    //Obtener y filtrar los movimientos del vehiculo actual
    obtenerMovimientos(vehiculoActual._id);
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="date"
            className="input-text"
            name="fecha"
            value={fecha}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="number"
            className="input-text"
            placeholder="Kilometro Inicial..."
            // readOnly
            name="inicial"
            value={inicial}
             onChange={handleChange}
          />
        </div>
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
            type="text"
            className="input-text"
            placeholder="Localidad Origen..."
            name="origen"
            onChange={handleChange}
            value={origen}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Localidad Destino..."
            name="destino"
            onChange={handleChange}
            value={destino}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Chofer..."
            name="chofer"
            onChange={handleChange}
            value={chofer}
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
