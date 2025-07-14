import React, { useEffect, useState, useRef } from 'react';
import { useCitySearch } from '../hooks/useCitySearch';
import '../styles/CitySearch.css';

// weather-app/src/components/CitySearch.jsx
// Este componente proporciona una interfaz para que los usuarios busquen ciudades,
// vean sugerencias de búsqueda y añadan ciudades a su lista o muestren su clima.

/**
 * Componente funcional para la búsqueda de ciudades.
 * Permite al usuario buscar ciudades, ver sugerencias y realizar acciones como añadir una ciudad
 * o mostrar su clima.
 * @param {object} props - Las propiedades del componente.
 * @param {function} props.onAddCity - Función de callback para agregar una ciudad al listado.
 * @param {function} props.onShowWeather - Función de callback para mostrar el clima de una ciudad sin agregarla.
 * @returns {JSX.Element} El componente de búsqueda de ciudades.
 */
const CitySearch = ({ onAddCity, onShowWeather}) => {
  // Desestructura los valores y funciones del hook useCitySearch.
  const { searchTerm, setSearchTerm, suggestions, loading,  clearSuggestions } = useCitySearch();
  // Estado para controlar el índice de la sugerencia seleccionada (para navegación con teclado).
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // Ref para indicar si una ciudad acaba de ser seleccionada (útil para evitar comportamientos no deseados).
  const justSelected = useRef(false);

  // Efecto que reinicia el índice de selección cuando las sugerencias cambian.
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]); // Se ejecuta cada vez que la lista de sugerencias cambia.

  /**
   * Maneja la acción de agregar una ciudad.
   * Solo agrega la ciudad si el nombre no está vacío.
   * @param {string} cityName - El nombre de la ciudad a agregar.
   */
  const handleAddCity = (cityName) => {
    if (cityName && cityName.trim() !== '') {
      onAddCity({ name: cityName }); // Llama a la función onAddCity pasada por props.
      setSelectedIndex(-1); // Reinicia el índice de selección.
      justSelected.current = true; // Marca que una selección acaba de ocurrir.
      clearSuggestions(); // Oculta sugerencias después de agregar
    }
  };

  /**
   * Maneja el clic en una sugerencia de búsqueda.
   * Muestra el clima de la ciudad sugerida sin guardarla y oculta las sugerencias.
   * @param {object} suggestion - El objeto de la ciudad sugerida.
   */
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name); // Establece el término de búsqueda al nombre de la sugerencia.
    setTimeout(() => clearSuggestions(), 100); // Oculta las sugerencias después de un pequeño retraso.
    setSelectedIndex(-1); // Reinicia el índice de selección.
    justSelected.current = true; // Marca que una selección acaba de ocurrir.
    if (onShowWeather) onShowWeather({ name: suggestion.name }); // Si onShowWeather está disponible, muestra el clima.
  };

  /**
   * Limpia el término de búsqueda y las sugerencias.
   */


  /**
   * Maneja las pulsaciones de teclas para la navegación y selección en las sugerencias.
   * @param {KeyboardEvent} e - El evento de teclado.
   */
  const handleKeyDown = (e) => {
    // Si no hay sugerencias, solo maneja la tecla Enter para agregar la ciudad.
    if (suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleAddCity(searchTerm); // Agrega la ciudad si se presiona Enter.
        justSelected.current = true; // Marca que una selección acaba de ocurrir.
        clearSuggestions(); // Oculta sugerencias después de agregar
      }
      return;
    }

    // Maneja las teclas de flecha y Enter cuando hay sugerencias.
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault(); // Previene el comportamiento por defecto del navegador (scroll).
        // Mueve el índice de selección hacia abajo, volviendo al inicio si llega al final.
        setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault(); // Previene el comportamiento por defecto del navegador (scroll).
        // Mueve el índice de selección hacia arriba, volviendo al final si llega al inicio.
        setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
        break;
      case 'Enter':
        e.preventDefault(); // Previene el comportamiento por defecto del navegador (envío de formulario).
        // Si hay una sugerencia seleccionada, la usa; de lo contrario, agrega el término de búsqueda actual.
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          setSearchTerm(suggestions[selectedIndex].name); // Establece el término de búsqueda a la sugerencia seleccionada.
          setSelectedIndex(-1); // Reinicia el índice de selección.
          justSelected.current = true; // Marca que una selección acaba de ocurrir.
          if (onShowWeather) onShowWeather({ name: suggestions[selectedIndex].name }); // Muestra el clima de la sugerencia.
          clearSuggestions(); // Oculta sugerencias después de seleccionar
        } else {
          handleAddCity(searchTerm); // Agrega la ciudad si no hay sugerencia seleccionada.
          justSelected.current = true; // Marca que una selección acaba de ocurrir.
          clearSuggestions(); // Oculta sugerencias después de agregar
        }
        break;
      case 'Escape':
        setSelectedIndex(-1); // Reinicia el índice de selección si se presiona Escape.
        clearSuggestions(); // Oculta sugerencias al presionar Escape
        break;
      default:
        break;
    }
  };

  return (
    // Contenedor principal del componente de búsqueda de ciudades.
    <div className="city-search">
      {/* Contenedor para el campo de entrada y el botón de agregar. */}
      <div className="search-input-container">
        {/* Campo de entrada para buscar ciudades. */}
        <input
          type="text"
          value={searchTerm} // El valor del input está controlado por el estado searchTerm.
          onChange={(e) => { setSearchTerm(e.target.value); }} // Actualiza searchTerm al escribir.
          onKeyDown={handleKeyDown} // Maneja las pulsaciones de teclas para navegación.
          placeholder="Buscar una ciudad..." // Texto de marcador de posición.
          className="search-input" // Clase CSS para estilos.
        />
        {/* Botón para agregar la ciudad ingresada. */}
        <button
          onClick={() => handleAddCity(searchTerm)} // Llama a handleAddCity al hacer clic.
          disabled={!searchTerm.trim()} // Deshabilita el botón si el término de búsqueda está vacío.
          className="add-button" // Clase CSS para estilos.
        >
          Agregar
        </button>
        {/* Lista de sugerencias que se muestra solo si hay un término de búsqueda y sugerencias disponibles. */}
        {searchTerm.trim() && suggestions.length > 0 && (
          <ul className="suggestions">
            {/* Mapea las sugerencias para renderizar cada una como un elemento de lista. */}
            {suggestions.map((suggestion, idx) => (
              <li
                // Clave única para cada elemento de la lista, combinando id, nombre, país e índice.
                key={
                  (suggestion.id || '') +
                  (suggestion.name || '') +
                  (suggestion.country || '') +
                  idx
                }
                onClick={() => handleSuggestionClick(suggestion)} // Maneja el clic en una sugerencia.
                // Aplica la clase 'selected' si la sugerencia está actualmente seleccionada por el teclado.
                className={`suggestion-item${idx === selectedIndex ? ' selected' : ''}`}
              >
                <span style={{color: '#222'}}>
                  {suggestion.name}
                  {/* Muestra el país si está disponible. */}
                  {suggestion.country ? `, ${suggestion.country}` : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Muestra un indicador de carga si la búsqueda está en progreso. */}
      {loading && <div className="loading">Buscando...</div>}
    </div>
  );
};

export default CitySearch;
