// weather-app/src/constants/weatherCodes.js
// Este archivo define constantes clave utilizadas en la aplicación del clima,
// incluyendo códigos de clima, URLs de la API y claves para el almacenamiento local.

/**
 * Objeto que mapea descripciones de clima a sus códigos numéricos correspondientes
 * según la API de Open-Meteo.
 * Estos códigos se utilizan para determinar el tipo de clima y mostrar iconos o fondos adecuados.
 */
export const WEATHER_CODES = {
  CLEAR: 0, // Cielo despejado
  PARTLY_CLOUDY: [1, 2, 3], // Principalmente despejado, parcialmente nublado, nublado
  FOGGY: [45, 48], // Niebla y depósito de niebla
  RAINY: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], // Llovizna, lluvia, lluvia helada, chubascos
  SNOWY: [71, 73, 75, 77, 85, 86], // Caída de nieve, granos de nieve, chubascos de nieve
  THUNDERSTORM: [95, 96, 99] // Tormenta, tormenta con granizo ligero/fuerte
};

/**
 * URL base para la API de Open-Meteo.
 */
export const API_BASE_URL = 'https://api.open-meteo.com/v1';

/**
 * Objeto que define los endpoints específicos para las APIs de clima y geocodificación.
 */
export const API_ENDPOINTS = {
  WEATHER: 'https://api.open-meteo.com/v1', // Endpoint para obtener datos del clima.
  GEOCODING: 'https://geocoding-api.open-meteo.com/v1' // Endpoint para buscar coordenadas de ciudades.
};

/**
 * Objeto que define las claves utilizadas para almacenar datos en el almacenamiento local (localStorage).
 * Esto asegura consistencia y evita errores de escritura.
 */
export const STORAGE_KEYS = {
  CITIES: 'cities' // Clave para almacenar la lista de ciudades guardadas por el usuario.
};
