import React, { useReducer } from 'react';

// import { v4 as uuidv4 } from 'uuid'

import vehiculoContext from './vehiculoContext';
import vehiculoReducer from './vehiculoReducer';
import {
  FORMULARIO_VEHICULO,
  OBTENER_VEHICULOS,
  AGREGAR_VEHICULO,
  VEHICULO_ERROR,
  VALIDAR_FORMULARIO,
  VEHICULO_ACTUAL,
  ELIMINAR_VEHICULO,
} from '../../types';

import clienteAxios from '../../config/axios';

const VehiculoState = (props) => {

  const initialState = {
    vehiculos: [],
    formulario: false,
    errorformulario: false,
    vehiculo: null,
    mensaje: null,
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(vehiculoReducer, initialState);

  //Serie de funciones para el CRUD

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_VEHICULO,
    });
  };

  //Obtener los vehiculos
  const obtenerVehiculos = async() => {
   try {
    const resultado = await clienteAxios.get('/api/vehiculos')
    dispatch({
      type: OBTENER_VEHICULOS,
      payload: resultado.data.vehiculos,
    });
   } catch (error) {
    const alerta={
      msg:'Hubo un Error',
      categoria:'alerta-error'
    }
    dispatch(({
      type:VEHICULO_ERROR,
      payload:alerta
    }))
   }
  };

  //Agregar nuevo Vehiculo
  const agregarVehiculo = async (vehiculo) => {
    // vehiculo.id = uuidv4()
    try {
      const resultado = await clienteAxios.post('api/vehiculos', vehiculo);
      console.log(resultado);
      //Insertar el vehiculo en el state
      dispatch({
        type: AGREGAR_VEHICULO,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta={
        msg:'Hubo un Error',
        categoria:'alerta-error'
      }
      dispatch(({
        type:VEHICULO_ERROR,
        payload:alerta
      }))
    }
  };

  //Valida Formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Selecciona el Vehículo que el usuario dio click
  const vehiculoActual = (vehiculoId) => {
    dispatch({
      type: VEHICULO_ACTUAL,
      payload: vehiculoId,
    });
  };

  //Elimina un vehiculo
  const eliminarVehiculo =async (vehiculoId) => {
    try {
      await clienteAxios.delete(`/api/vehiculos/${vehiculoId}`)
      dispatch({
        type: ELIMINAR_VEHICULO,
        payload: vehiculoId,
      });

    } catch (error) {
      const alerta={
        msg:'Hubo un Error',
        categoria:'alerta-error'
      }
      dispatch(({
        type:VEHICULO_ERROR,
        payload:alerta
      }))
    }
  };

  return (
    <vehiculoContext.Provider
      value={{
        vehiculos: state.vehiculos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        vehiculo: state.vehiculo,
        mensaje:state.mensaje,
        mostrarFormulario,
        obtenerVehiculos,
        agregarVehiculo,
        mostrarError,
        vehiculoActual,
        eliminarVehiculo,
      }}
    >
      {props.children}
    </vehiculoContext.Provider>
  );
};

export default VehiculoState;
