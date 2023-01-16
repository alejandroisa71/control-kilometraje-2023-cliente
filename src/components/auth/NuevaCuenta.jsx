import React,{ useState, useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
  let navigate = useNavigate();

  // extraer los valoresdel context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //En caso de que el usuario se hya autenticado o registrado o sea un registro duplicado

  useEffect(() => {
    if (autenticado) {
      //   // props.history.push("/vehiculos");
      //   // <Navigate to="/vehiculos" />;
      //   // console.log(token);
      // } else {
      // registrarUsuario({ nombre, password})
      // console.log(token)
      // navigate('/vehiculos', { replace: true });
      navigate('/vehiculos');
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autenticado, mensaje]);

  //State para inicio de sesion
  const [usuario, setUsuario] = useState({
    nombre: '',
    password: '',
    confirmar: '',
  });

  const { nombre, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quier iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que np haya campos vacios
    if (
      nombre.trim() === '' ||
      password.trim() === '' ||
      confirmar.trim() === ''
    ) {
      mostrarAlerta('Todos los campos son Obligatorios', 'alerta-error');
      return;
    }

    //Password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        'La constraseña debe ser de al menos 6 caracteres',
        'alerta-error'
      );
      return;
    }

    //Los 2 password son iguales
    if (password !== confirmar) {
      mostrarAlerta('No coinciden las constraseñas', 'alerta-error');
      return;
    }

    //Pasarlo al action
    // console.log(token)
    registrarUsuario({ nombre, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Usuario</label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              name="nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="pasword"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmar"
              placeholder="Repite Password"
              name="confirmar"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar"
            />
          </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
