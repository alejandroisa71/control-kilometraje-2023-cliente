import {
  FORMULARIO_VEHICULO,
  OBTENER_VEHICULOS,
  AGREGAR_VEHICULO,
  VEHICULO_ERROR,
  VALIDAR_FORMULARIO,
  VEHICULO_ACTUAL,
  ELIMINAR_VEHICULO,
} from '../../types';

const reducer = (state, action) => {
  switch (action.type) {
    case FORMULARIO_VEHICULO:
      return {
        ...state,
        formulario: true,
      };
    case OBTENER_VEHICULOS:
      return {
        ...state,
        vehiculos: action.payload,
      };
    case AGREGAR_VEHICULO:
      return {
        ...state,
        vehiculos: [...state.vehiculos, action.payload],
        formulario: false,
        errorformulario: false,
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorformulario: true,
      };
    case VEHICULO_ACTUAL:
      return {
        ...state,
        vehiculo: state.vehiculos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };
    case ELIMINAR_VEHICULO:
      return {
        ...state,
        vehiculos: state.vehiculos.filter(
          (vehiculo) => vehiculo._id !== action.payload
        ),
        vehiculo: null,
      };
     case VEHICULO_ERROR:
      return {
        ...state,
        message: action.payload
      } 
    default:
      return state;
  }
};

export default reducer;
