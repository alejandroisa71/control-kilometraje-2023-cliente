import React, { useReducer } from 'react';
// import { v4 as uuidv4 } from 'uuid';

import MovimientoContext from './movimientoContext';
import MovimientoReducer from './movimientoReducer';

import {
  MOVIMIENTOS_VEHICULO,
  AGREGAR_MOVIMIENTO,
  VALIDAR_MOVIMIENTO,
  ELIMINAR_MOVIMIENTO,
  MOVIMIENTO_ACTUAL,
  ACTUALIZAR_MOVIMIENTO,
  LIMPIAR_MOVIMIENTO,
} from '../../types';

import clienteAxios from '../../config/axios';

const MovimientoState = (props) => {
  const initialState = {
    movimientosvehiculo: [],
    errormovimiento: false,
    movimientoseleccionado: null,
  };
  //Crear el dispatch y el state
  const [state, dispatch] = useReducer(MovimientoReducer, initialState);

  //Crear las funciones

  //Obtener los movimientos de un vehiculo
  const obtenerMovimientos = async (vehiculo) => {
    try {
      const resultado = await clienteAxios.get('/api/movimientos', {
        params: { vehiculo },
      });
      dispatch({
        type: MOVIMIENTOS_VEHICULO,
        payload: resultado.data.movimientos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Agregar un movimiento al vehiculo seleccionado
  const agregarMovimiento = async (movimiento) => {
    try {
      const resultado = await clienteAxios.post('/api/movimientos', movimiento);
      console.log(resultado);
      dispatch({
        type: AGREGAR_MOVIMIENTO,
        payload: movimiento,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Valida y muestra un error en caso que sea necesario
  const validarMovimiento = () => {
    dispatch({
      type: VALIDAR_MOVIMIENTO,
    });
  };

  //Eliminar movimiento por su Id
  const eliminarMovimiento = async (id, vehiculo) => {
    try {
      await clienteAxios.delete(`/api/movimientos/${id}`, {
        params: { vehiculo },
      });
      dispatch({
        type: ELIMINAR_MOVIMIENTO,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Edita o modifica un movimiento
  const actualizarMovimiento = async(movimiento) => {
   try {
    const resultado = await clienteAxios.put(`/api/movimientos/${movimiento._id}`, movimiento)
    console.log(resultado)
    dispatch({
      type: ACTUALIZAR_MOVIMIENTO,
      payload: resultado.data.movimiento,
    });
   } catch (error) {
    console.log(error);
   }
  };

  //Extrae un movimiento para edicion
  const guardarMovimientoActual = (movimiento) => {
    dispatch({
      type: MOVIMIENTO_ACTUAL,
      payload: movimiento,
    });
  };

  

  //Elimina el movimiento seleccionado
  const limpiarMovimiento = () => {
    dispatch({ type: LIMPIAR_MOVIMIENTO });
  };

  return (
    <MovimientoContext.Provider
      value={{
        movimientosvehiculo: state.movimientosvehiculo,
        errormovimiento: state.errormovimiento,
        movimientoseleccionado: state.movimientoseleccionado,
        obtenerMovimientos,
        agregarMovimiento,
        validarMovimiento,
        eliminarMovimiento,
        guardarMovimientoActual,
        actualizarMovimiento,
        limpiarMovimiento,
      }}
    >
      {props.children}
    </MovimientoContext.Provider>
  );
};

export default MovimientoState;
