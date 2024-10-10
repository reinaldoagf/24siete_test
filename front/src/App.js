import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Doctors from "./components/Doctors";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";
import Dashboard from "./components/Dashboard";
import Login from './components/Login'; 
import Signup from './components/Signup'; 

const App = () => {
  const { token, status } = useSelector((state) => state.auth); 

  // Mostrar un loading mientras se verifica el estado de autenticación
  if (status === 'loading') {
    return <div>Loading...</div>; // Puedes cambiar esto por un spinner o mensaje personalizado
  }

  return (
    <Router>
      <Routes>
        {/* Redirige al login si no hay token */}
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/doctores" element={token ? <Doctors /> : <Navigate to="/login" />} />
        <Route path="/citas" element={token ? <Appointments /> : <Navigate to="/login" />} />
        <Route path="/pacientes" element={token ? <Patients /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
