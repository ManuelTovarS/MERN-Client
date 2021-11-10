import React, { useContext } from "react";

import proyectoContext from "../../contexts/proyectos/proyectoContext";
import tareaContext from "../../contexts/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  //Context de tareas
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;
  //Context de paroyecto para extraer el prouyecto asociado a las tareas
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Extraer el proyecto
  const [proyectoActual] = proyecto;

  //Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
  const tareaEliminar = (id) => {
      eliminarTarea(id, proyectoActual._id);
      obtenerTareas(proyectoActual._id);
  };

  //Funcion que modifica el estado de las tarea
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  }

  //Funcion que selecciona la tarea para su edicion
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado
          ?
            (
              <button
                type="button"
                className="completo"
                onClick={() => cambiarEstado(tarea)}
              >
                Completo
              </button>
            )
          :
            (
              <button
                type="button"
                className="incompleto"
                onClick={() => cambiarEstado(tarea)}
              >
                Incompleto
              </button>
            )
        }
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={ () => seleccionarTarea(tarea)}
        >Editar</button>

        <button
          type="button"
          className="btn btin-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
