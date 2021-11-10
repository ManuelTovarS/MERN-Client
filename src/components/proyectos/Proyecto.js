import React, { useContext } from "react";
import proyectoContext from "../../contexts/proyectos/proyectoContext";
import tareaContext from "../../contexts/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  //Obtener la funcion del context de tarea (el state de tareas)
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar un proyecto actual
    obtenerTareas(id); //Obtener las tareas del proyecto actual
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
