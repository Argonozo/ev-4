// weather-app/src/hooks/useCitySearch.js
// Este hook personalizado gestiona la lógica de búsqueda de ciudades,
// incluyendo el término de búsqueda, las sugerencias y el estado de carga.
// Implementa un "debounce" para optimizar las llamadas a la API de búsqueda.

import { useState, useEffect } from 'react'; // Importa hooks de React para manejar el estado y efectos secundarios.
import { weatherService } from '../services/weatherService'; // Importa el servicio de clima para realizar búsquedas de ciudades.

/**
 * Hook personalizado para la funcionalidad de búsqueda de ciudades.
 * Proporciona el término de búsqueda, las sugerencias de ciudades, el estado de carga
 * y funciones para limpiar la búsqueda y las sugerencias.
 * @returns {object} Un objeto que contiene el estado y las funciones relacionadas con la búsqueda.
 * @property {string} searchTerm - El término de búsqueda actual ingresado por el usuario.
 * @property {function} setSearchTerm - Función para actualizar el término de búsqueda.
 * @property {Array<object>} suggestions - Lista de ciudades sugeridas basada en el término de búsqueda.
 * @property {boolean} loading - Indica si la búsqueda de ciudades está en progreso.
 * @property {function} clearSearch - Función para limpiar el término de búsqueda y las sugerencias.
 * @property {function} clearSuggestions - Función para limpiar solo las sugerencias.
 */
export const useCitySearch = () => {
  // Estado para el término de búsqueda ingresado por el usuario.
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para almacenar las sugerencias de ciudades.
  const [suggestions, setSuggestions] = useState([]);
  // Estado para indicar si la búsqueda está en progreso.
  const [loading, setLoading] = useState(false);

  // Efecto que se ejecuta cada vez que el `searchTerm` cambia.
  // Implementa un "debounce" para retrasar la llamada a la API y evitar búsquedas excesivas.
  useEffect(() => {
    /**
     * Función asíncrona para buscar ciudades.
     * Se ejecuta solo si el término de búsqueda tiene al menos 2 caracteres.
     */
    const searchCities = async () => {
      // Si el término de búsqueda es muy corto, limpia las sugerencias y no hace la llamada a la API.
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true); // Establece el estado de carga a true.
      try {
        // Llama al servicio de clima para buscar ciudades.
        const results = await weatherService.searchCity(searchTerm);
        console.log('API Search Results:', results); // Log de los resultados de la API.
        setSuggestions(results.slice(0, 5)); // Limita las sugerencias a las primeras 5.
      } catch (error) {
        console.error('Error al buscar ciudades:', error); // Captura y loguea cualquier error.
        setSuggestions([]); // Limpia las sugerencias en caso de error.
      } finally {
        setLoading(false); // Siempre establece el estado de carga a false al finalizar.
      }
    };

    // Establece un temporizador para ejecutar `searchCities` después de 300ms (debounce).
    const timeoutId = setTimeout(searchCities, 300);

    // Función de limpieza que se ejecuta antes de que el efecto se vuelva a ejecutar o el componente se desmonte.
    // Limpia el temporizador para evitar llamadas a la API obsoletas.
    return () => clearTimeout(timeoutId);
  }, [searchTerm]); // El efecto se vuelve a ejecutar cada vez que `searchTerm` cambia.

  /**
   * Limpia completamente el término de búsqueda y las sugerencias.
   */
  const clearSearch = () => {
    setSearchTerm(''); // Borra el término de búsqueda.
    setSuggestions([]); // Borra las sugerencias.
  };

  /**
   * Limpia solo las sugerencias de búsqueda.
   */
  const clearSuggestions = () => {
    setSuggestions([]); // Borra las sugerencias.
  };

  // Retorna el estado y las funciones para ser utilizadas por los componentes que consumen este hook.
  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    loading,
    clearSearch,
    clearSuggestions
  };
};
