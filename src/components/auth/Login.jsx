import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = () => {
  let navigate = useNavigate();

  // extraer los valoresdel context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso que el pasword sea incorrecto o el usuario no exista
  useEffect(() => {
    if (autenticado) {
      navigate('/vehiculos');
    }
    
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado]);
  
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  const [usuario, setUsuario] = useState({
    nombre: '',
    password: '',
  });

  const { nombre, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quier iniciar sesion
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (nombre.trim() === '' || password.trim() === '')
      mostrarAlerta('Todos los campos son Obligatorios', 'alerta-error');

    //Pasarlo al action
    iniciarSesion({ nombre, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

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
            <button type="submit" className="btn btn-primario btn-block">Iniciar Sesion</button>

            {/* <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            /> */}
          </div>
        </form>
        <Link to={'/nueva-cuenta'} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
