import {
  MOVIMIENTOS_VEHICULO,
  AGREGAR_MOVIMIENTO,
  VALIDAR_MOVIMIENTO,
  ELIMINAR_MOVIMIENTO,
  MOVIMIENTO_ACTUAL,
  ACTUALIZAR_MOVIMIENTO,
  LIMPIAR_MOVIMIENTO,
} from '../../types';

const MovimientoReducer = (state, action) => {
  switch (action.type) {
    case MOVIMIENTOS_VEHICULO:
      return {
        ...state,
        movimientosvehiculo: action.payload,
      };

    case AGREGAR_MOVIMIENTO:
      return {
        ...state,
        movimientosvehiculo: [action.payload, ...state.movimientosvehiculo],
        errormovimiento: false,
      };

    case VALIDAR_MOVIMIENTO:
      return {
        ...state,
        errormovimiento: true,
      };
    case ELIMINAR_MOVIMIENTO:
      return {
        ...state,
        movimientosvehiculo: state.movimientosvehiculo.filter(
          (movimiento) => movimiento._id !== action.payload
        ),
      };
    case ACTUALIZAR_MOVIMIENTO:
      return {
        ...state,
        movimientosvehiculo: state.movimientosvehiculo.map((movimiento) =>
          movimiento._id === action.payload._id ? action.payload : movimiento
        ),
      };
    case MOVIMIENTO_ACTUAL:
      return {
        ...state,
        movimientoseleccionado: action.payload,
      };
    case LIMPIAR_MOVIMIENTO:
      return {
        ...state,
        movimientoseleccionado: null,
      };

    default:
      return state;
  }
};

export default MovimientoReducer;
