import React, {useState, useContext, useEffect} from "react";
import { Link } from 'react-router-dom';

import alertaContext from "../../contexts/alertas/alertaContext";
import authContext from "../../contexts/autenticacion/authContext";

const Login = (props) => {

  //Extraer los valores del context
  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const authsContext = useContext(authContext);
  const { mensaje, autenticado, iniciarSesion } = authsContext;

  //En caso del que el password o usuario no exista 
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //State para iniciar sesión
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  //Extraccion del usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quiere iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
      return;
    }

    //Pasarlo al action
    iniciarSesion({ email, password });

  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div>): null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
