import { Routes, Route } from 'react-router-dom';
import RouterDemo from './components/navbar';
import RegistrarLectura from './components/RegistrarLectura';
import MedicionesExistentes from './components/MedicionesExistentes';

export default function App() {
  return (
    <>
      <RouterDemo />
      <Routes>
        <Route path="/registrar-lectura" element={<RegistrarLectura />} />
        <Route path="/mediciones-existentes" element={<MedicionesExistentes />} />
      </Routes>
    </>
  );
}
