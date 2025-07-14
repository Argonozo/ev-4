// weather-app/src/services/weatherService.js
// Este servicio se encarga de interactuar con las APIs externas de clima y geocodificación
// para obtener datos meteorológicos y coordenadas de ciudades.

// URL base para la API de Open-Meteo (datos del clima).
const WEATHER_API_BASE = 'https://api.open-meteo.com/v1';
// URL base para la API de geocodificación de Open-Meteo (búsqueda de ciudades y coordenadas).
const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1';

/**
 * Objeto de servicio para interactuar con las APIs de clima y geocodificación.
 */
export const weatherService = {
  /**
   * Obtiene los datos del clima actual para una latitud y longitud dadas.
   * @param {number} latitude - La latitud de la ubicación.
   * @param {number} longitude - La longitud de la ubicación.
   * @returns {Promise<object>} Una promesa que resuelve con los datos del clima.
   * @throws {Error} Si la respuesta de la API no es exitosa.
   */
  async getWeatherData(latitude, longitude) {
    // Construye la URL de la API para obtener el clima actual.
    const response = await fetch(
      `${WEATHER_API_BASE}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    // Verifica si la respuesta de la red fue exitosa.
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos del clima.');
    }

    // Parsea la respuesta JSON y la retorna.
    return response.json();
  },

  /**
   * Busca ciudades por nombre utilizando la API de geocodificación.
   * @param {string} cityName - El nombre de la ciudad a buscar.
   * @returns {Promise<Array<object>>} Una promesa que resuelve con un arreglo de resultados de ciudades.
   * @throws {Error} Si la respuesta de la API no es exitosa o si no se encuentra la ciudad.
   */
  async searchCity(cityName) {
    // Construye la URL de la API para buscar ciudades, codificando el nombre de la ciudad.
    const response = await fetch(
      `${GEOCODING_API_BASE}/search?name=${encodeURIComponent(cityName)}`
    );

    // Verifica si la respuesta de la red fue exitosa.
    if (!response.ok) {
      throw new Error('No se pudo buscar la ciudad.');
    }

    // Parsea la respuesta JSON.
    const data = await response.json();

    // Verifica si la respuesta contiene resultados válidos.
    if (!data.results || data.results.length === 0) {
      throw new Error('Ciudad no encontrada.');
    }

    // Retorna el arreglo de resultados.
    return data.results;
  },

  /**
   * Obtiene las coordenadas (latitud y longitud) de una ciudad por su nombre.
   * Utiliza `searchCity` internamente y toma las coordenadas del primer resultado.
   * @param {string} cityName - El nombre de la ciudad.
   * @returns {Promise<{latitude: number, longitude: number}>} Una promesa que resuelve con un objeto de coordenadas.
   */
  async getCityCoordinates(cityName) {
    const results = await this.searchCity(cityName); // Busca la ciudad para obtener sus resultados.
    const { latitude, longitude } = results[0]; // Desestructura latitud y longitud del primer resultado.
    return { latitude, longitude }; // Retorna las coordenadas.
  }
};
