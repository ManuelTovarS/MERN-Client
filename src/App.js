import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from "./contexts/proyectos/proyectoState";
import TareaState from "./contexts/tareas/tareaState";
import AlertaState from "./contexts/alertas/alertaState";
import AuthState from "./contexts/autenticacion/authState";

import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";

//Revisar si existe un token activo
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token); 
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
