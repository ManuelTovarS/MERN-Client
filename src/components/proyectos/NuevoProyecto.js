import React, { Fragment, useState, useContext } from "react";

import proyectoContext from "../../contexts/proyectos/proyectoContext";

const NuevoProyecto = () => {

  //Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  //State para proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //Extraccion de datos
  const { nombre } = proyecto;

  //Lee los contenidos del input
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario envia un proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //Validar el proyecto
    if (nombre.trim() === "") {
      mostrarError();
      return;
    } 
    //Agregar al state
    agregarProyecto(proyecto);

    //Reinicar el form
    guardarProyecto({
      nombre: ''
    })
  };

  //Mostrar el Formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  }

  return (
    <Fragment>
      <button 
        type="button" 
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >Nuevo Proyecto</button>

      {formulario
        ?
        (
          <form
            className="formulario-nuevo-proyecto"
             onSubmit={onSubmitProyecto}
           >
              <input
                type="text"
                name="nombre"
                value={nombre}
                className="input-text"
                placeholder="Nombre del Proyecto"
                onChange={onChangeProyecto}
              />

              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar proyecto"
              />
          </form>
        )  
        :
        (null)
      }
      { errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}
      
    </Fragment>
  );
};

export default NuevoProyecto;
