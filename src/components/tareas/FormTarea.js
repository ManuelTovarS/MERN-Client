import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../contexts/proyectos/proyectoContext";
import tareaContext from "../../contexts/tareas/tareaContext";

const FormTarea = () => {
  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea
  } = tareasContext;

  //State del formulario  nueva tarea
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //Extraccion de valores del state
  const { nombre } = tarea;

  //Effect que detecta si una tarea fue seleccionada para su edición
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  //Para ocultar la barra de tareas cuando no se haya seleccionado un proyecto
  if (!proyecto) return null;
  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };
  //Enviar una tarea
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Revisar si es una edicion o una nueva tarea
    if (tareaseleccionada === null) {

      //Agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);

    } else {
      //Actualizar tarea existente
      actualizarTarea(tarea);
    }

    //Obtener y filtrar las nuevas tareas del proyecto
    obtenerTareas(proyectoActual._id);

    //reinicar el form  
    guardarTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={
              tareaseleccionada === null ? "Agregar Tarea" : "Editar Tarea"
            }
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obilgatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
