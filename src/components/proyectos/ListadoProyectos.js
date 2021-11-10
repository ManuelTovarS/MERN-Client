import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../contexts/proyectos/proyectoContext";
import alertaContext from '../../contexts/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from "react-transition-group";


const ListadoProyectos = () => {

  //Extraer proyectos del contexto proyectoState
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta} = alertasContext;

  //Obtener proyectos cuando carga el componentes
  useEffect(() => {

    //Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    obtenerProyectos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje]);

  //Revision de si proyectos tiene contenido
  if (proyectos.length === 0)
    return <p>No hay Proyectos comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{ alerta.msg }</div>): null }
      <TransitionGroup>
        {proyectos.map((proyecto) => (
         
          <CSSTransition
            key={proyecto._id}
            timeout={200}
            classNames="proyecto"
          >
            <Proyecto
              proyecto={proyecto}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
