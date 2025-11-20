import { Routes, Route, Navigate } from 'react-router-dom';
import BarraNavegacion from './components/navbar';
import RegistrarLectura from './components/RegistrarLectura';
import MedicionesExistentes from './components/MedicionesExistentes';

export default function App() {
  return (
    <>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<Navigate to="/registrar-lectura" replace />} />
        <Route path="/registrar-lectura" element={<RegistrarLectura />} />
        <Route path="/mediciones-existentes" element={<MedicionesExistentes />} />
      </Routes>
    </>
  );
}
