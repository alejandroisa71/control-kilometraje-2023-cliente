import React, { useState, useContext } from "react";
import vehiculoContext from "../../context/vehiculos/vehiculoContext";

const NuevoVehiculo = () => {
  //Obtener el State del Formulario
  const vehiculosContext = useContext(vehiculoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarVehiculo,
    mostrarError,
  } = vehiculosContext;

  //State para Vehiculo
  const [vehiculo, setVehiculo] = useState({
    patente: "",
    descripcion: "",
    promedio: 0,
  });

  const { patente, descripcion, promedio } = vehiculo;

  const onChangeVehiculo = (e) => {
    setVehiculo({
      ...vehiculo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitVehiculo = (e) => {
    e.preventDefault();

    //Validar El vehículo
    if (patente === "" || descripcion === "" || promedio === 0) {
      mostrarError()
      return;
    }

    //agregar al state
    agregarVehiculo(vehiculo);

    //Reinciar el form
    setVehiculo({});

    //TODO listando vehiculos creados
  };

  //Mostrar el Formulario
  const onClick = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClick}
      >
        Nuevo Vehículo
      </button>

      {formulario ? (
        <form className="formulario-nuevo-vehiculo" onSubmit={onSubmitVehiculo}>
          <input
            type="text"
            className="input-text"
            placeholder="Patente Vehículo"
            name="patente"
            value={patente}
            onChange={onChangeVehiculo}
          />
          <input
            type="text"
            className="input-text"
            placeholder="Modelo y Año"
            name="descripcion"
            value={descripcion}
            onChange={onChangeVehiculo}
          />
          <input
            type="number"
            className="input-text"
            placeholder="Promedio"
            name="promedio"
            value={promedio}
            onChange={onChangeVehiculo}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Vehículo"
          />
        </form>
      ) : null}
      {errorformulario 
      ?<p className="mensaje error">Todos los campos son obligatorios </p>
      :null
      } 
    </>
  );
};

export default NuevoVehiculo;
