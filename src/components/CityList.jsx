// weather-app/src/components/CityList.jsx
// Este componente muestra una lista de ciudades que el usuario ha guardado.
// Permite seleccionar una ciudad para ver su clima y eliminarla de la lista.
// También gestiona el estado de colapso/expansión de la barra lateral.

import React from 'react'; // Importa React para la creación de componentes.
import City from './City'; // Importa el componente City para renderizar cada ciudad individual.
import '../styles/CityList.css'; // Importa los estilos CSS específicos para el componente CityList.
import { FaRegListAlt } from 'react-icons/fa'; // Importa un icono de React para la lista (aunque no se usa directamente en el JSX actual, se mantiene por si se añade).

/**
 * Componente funcional que muestra una lista de ciudades guardadas.
 * @param {object} props - Las propiedades del componente.
 * @param {Array<object>} props.cities - Un arreglo de objetos de ciudad a mostrar.
 * @param {function} props.onSelectCity - Función de callback para seleccionar una ciudad.
 * @param {function} props.onDeleteCity - Función de callback para eliminar una ciudad.
 * @param {string|number|null} props.selectedCityId - El ID de la ciudad actualmente seleccionada.
 * @param {boolean} props.collapsed - Indica si la barra lateral está colapsada.
 * @param {function} props.setCollapsed - Función para cambiar el estado de colapso de la barra lateral.
 * @returns {JSX.Element|null} Un elemento JSX que representa la lista de ciudades o null si no hay ciudades.
 */
const CityList = ({ cities, onSelectCity, onDeleteCity, selectedCityId, collapsed, setCollapsed }) => {
  // Si no hay ciudades o la lista está vacía, no renderiza nada.
  // Si la barra lateral está colapsada, renderiza un botón para expandirla.
  if (collapsed) {
    return (
      <div
        className="sidebar-tab"
        onClick={() => setCollapsed(false)} // Al hacer clic, expande la barra lateral.
        title="Abrir ciudades guardadas" // Título para accesibilidad.
        tabIndex={0} // Hace el elemento enfocable.
        role="button" // Define el rol semántico como un botón.
        aria-label="Abrir ciudades guardadas" // Etiqueta para lectores de pantalla.
      >
        <span>Ciudades guardadas</span>
      </div>
    );
  }

  // Si la barra lateral no está colapsada, renderiza la barra de navegación completa con la lista de ciudades.
  return (
    <nav className="city-navbar">
      {/* Pestaña para colapsar la barra lateral. */}
      <div
        className="sidebar-tab"
        onClick={() => setCollapsed(true)} // Al hacer clic, colapsa la barra lateral.
        title="Cerrar ciudades guardadas" // Título para accesibilidad.
        tabIndex={0} // Hace el elemento enfocable.
        role="button" // Define el rol semántico como un botón.
        aria-label="Cerrar ciudades guardadas" // Etiqueta para lectores de pantalla.
      >
        <span>Ciudades guardadas</span>
      </div>
      {/* Título de la barra de navegación. */}
      <h3 className="navbar-title">Ciudades Guardadas</h3>
      {/* Lista desordenada para las ciudades. */}
      <ul className="navbar-list">
        {/* Muestra un mensaje si no hay ciudades guardadas. */}
        {cities.length === 0 && (
          <li className="navbar-empty">No hay ciudades guardadas</li>
        )}
        {/* Mapea el arreglo de ciudades para renderizar un componente City para cada una. */}
        {cities.map((city) => (
          <City
            key={city.id || city.name} // Usa el ID o el nombre de la ciudad como clave única.
            city={city} // Pasa el objeto de la ciudad al componente City.
            onSelectCity={onSelectCity} // Pasa la función para seleccionar la ciudad.
            onDeleteCity={onDeleteCity} // Pasa la función para eliminar la ciudad.
            selected={selectedCityId === (city.id || city.name)} // Indica si esta ciudad está seleccionada actualmente.
          />
        ))}
      </ul>
    </nav>
  );
};

export default CityList; // Exporta el componente CityList para que pueda ser utilizado en otros archivos.
