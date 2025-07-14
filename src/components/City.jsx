// weather-app/src/components/City.jsx
// Este componente representa una ciudad individual en la lista de ciudades guardadas.
// Permite seleccionar una ciudad para ver su clima y eliminarla de la lista.

import React from 'react'; // Importa React para la creación de componentes.
import '../styles/City.css'; // Importa los estilos CSS específicos para el componente City.

/**
 * Componente funcional que muestra una ciudad individual.
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.city - El objeto de la ciudad a mostrar, que contiene al menos un 'name' y un 'id'.
 * @param {function} props.onSelectCity - Función de callback que se ejecuta cuando se selecciona la ciudad.
 * @param {function} props.onDeleteCity - Función de callback que se ejecuta cuando se elimina la ciudad.
 * @returns {JSX.Element|null} Un elemento JSX que representa la ciudad o null si no se proporciona una ciudad.
 */
const City = ({ city, onSelectCity, onDeleteCity }) => {
  // Si no se proporciona un objeto de ciudad, el componente no renderiza nada.
  if (!city) return null;

  return (
    // Contenedor principal para cada elemento de ciudad.
    <div className="city-item">
      {/* Un span que muestra el nombre de la ciudad. Al hacer clic, se selecciona la ciudad. */}
      <span onClick={() => onSelectCity(city)}>{city.name}</span>
      {/* Un botón para eliminar la ciudad de la lista. Al hacer clic, se invoca onDeleteCity con el ID de la ciudad. */}
      <button onClick={() => onDeleteCity(city.id)}>Eliminar</button>
    </div>
  );
};

export default City; // Exporta el componente City para que pueda ser utilizado en otros archivos.
