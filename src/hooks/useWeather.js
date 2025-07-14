// weather-app/src/hooks/useWeather.js
// Este hook personalizado gestiona la obtención y el estado de los datos del clima.
// Permite buscar el clima para una ciudad específica, manejar los estados de carga y error,
// y almacenar los datos del clima y la ciudad seleccionada.

import { useState } from 'react'; // Importa el hook useState para manejar el estado local.
import { weatherService } from '../services/weatherService'; // Importa el servicio de clima para interactuar con la API del clima.

/**
 * Hook personalizado para gestionar los datos del clima.
 * Proporciona el estado del clima, la ciudad seleccionada, errores, estado de carga
 * y una función para obtener los datos del clima para una ciudad.
 * @returns {object} Un objeto que contiene el estado y las funciones relacionadas con el clima.
 * @property {object|null} weatherData - Los datos del clima obtenidos de la API, o null si no hay datos.
 * @property {object|null} selectedCity - El objeto de la ciudad para la cual se están mostrando los datos del clima.
 * @property {string|null} error - Un mensaje de error si la obtención del clima falla, o null.
 * @property {boolean} loading - Un booleano que indica si los datos del clima están cargando.
 * @property {function} fetchWeatherForCity - Función asíncrona para obtener los datos del clima de una ciudad.
 */
export const useWeather = () => {
  // Estado para almacenar los datos del clima. Inicialmente null.
  const [weatherData, setWeatherData] = useState(null);
  // Estado para almacenar la ciudad actualmente seleccionada. Inicialmente null.
  const [selectedCity, setSelectedCity] = useState(null);
  // Estado para almacenar mensajes de error. Inicialmente null.
  const [error, setError] = useState(null);
  // Estado para indicar si la operación de obtención de datos está en curso. Inicialmente false.
  const [loading, setLoading] = useState(false);

  /**
   * Función asíncrona para obtener los datos del clima de una ciudad específica.
   * Actualiza los estados de carga, error y datos del clima.
   * @param {object} city - El objeto de la ciudad para la cual se desea obtener el clima (ej. { name: 'Santiago' }).
   */
  const fetchWeatherForCity = async (city) => {
    setSelectedCity(city); // Establece la ciudad seleccionada.
    setError(null); // Limpia cualquier error anterior.
    setLoading(true); // Activa el estado de carga.

    try {
      // Obtiene las coordenadas de la ciudad usando el servicio de clima.
      const { latitude, longitude } = await weatherService.getCityCoordinates(city.name);
      // Obtiene los datos del clima usando las coordenadas.
      const data = await weatherService.getWeatherData(latitude, longitude);
      setWeatherData(data); // Almacena los datos del clima.
    } catch (error) {
      console.error('Error al obtener datos del clima:', error); // Loguea el error en la consola.
      setError(error.message); // Almacena el mensaje de error.
    } finally {
      setLoading(false); // Desactiva el estado de carga, independientemente del resultado.
    }
  };

  // Retorna el estado y las funciones para ser utilizadas por los componentes que consumen este hook.
  return {
    weatherData,
    selectedCity,
    error,
    loading,
    fetchWeatherForCity
  };
};
