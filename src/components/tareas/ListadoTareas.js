import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../contexts/proyectos/proyectoContext";
import tareaContext from "../../contexts/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTarea = () => {

  //Extrer el context de Proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;
  //Extraer el context de Tareas
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;
  //Si no hay proyectos seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  //Array destructuring
  const [proyectoActual] = proyecto;

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul>
        {tareasproyecto.length === 0 ? (
          <li className="tareas">No hay tareas</li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition
                key={Math.random()*10}
                timeout={200}
                classNames="tarea"
              >
                <Tarea
                
                tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => eliminarProyecto(proyectoActual._id)}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTarea;
