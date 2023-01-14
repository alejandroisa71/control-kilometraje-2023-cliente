import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Vehiculos from './components/vehiculos/Vehiculos';

import VehiculoState from './context/vehiculos/vehiculoState';
import MovimientoState from './context/movimientos/movimientoState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
  //  console.log(token)
}

function App() {
  return (
    <AuthState>
      <AlertaState>
        <VehiculoState>
          <MovimientoState>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route element={<RutaPrivada/>}>
                  <Route path="/vehiculos" element={<Vehiculos />} />
                </Route>
              </Routes>
            </Router>
          </MovimientoState>
        </VehiculoState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
