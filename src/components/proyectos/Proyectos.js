import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTarea from '../tareas/ListadoTareas';
import authContext from "../../contexts/autenticacion/authContext";


const Proyectos = () => {

    const authsContext = useContext(authContext);
    const { usuarioAutenticado } = authsContext;
    
    //Cargar la informacion de un usuario autenticado
    useEffect(() => {
      usuarioAutenticado();
      // eslint-disable-next-line
    }, []);


    return (
        <div className="contenedor-app">

            <Sidebar/>

            <div className="seccion-principal">

                <Barra />
                
                <main>

                    <FormTarea/>

                    <div className="contenedor-tareas">
                        <ListadoTarea/>

                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;