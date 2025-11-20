const CLAVE_LOCAL = 'mediciones_sanquinta';

function inicializarDatos() {
  const datosGuardados = localStorage.getItem(CLAVE_LOCAL);
  if (!datosGuardados) {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify([]));
  }
}
inicializarDatos();

export function obtenerMediciones() {
  const datos = localStorage.getItem(CLAVE_LOCAL);
  return datos ? JSON.parse(datos) : [];
}

export function agregarMedicion(medicion) {
  const mediciones = obtenerMediciones();
  mediciones.push(medicion);
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(mediciones));
}

export function eliminarMedicion(id) {
  const mediciones = obtenerMediciones();
  const filtradas = mediciones.filter(medicion => medicion.id !== id);
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(filtradas));
}

export function filtrarMedicionesPorTipo(tipo) {
  return obtenerMediciones().filter(medicion => medicion.tipo === tipo);
}