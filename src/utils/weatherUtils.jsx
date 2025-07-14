// weather-app/src/utils/weatherUtils.jsx
// Este archivo contiene funciones de utilidad para la aplicación del clima.
// Incluye funciones para mapear códigos de clima a iconos y descripciones,
// y una función para obtener imágenes de ciudades desde la API de Pexels.

import { WiDaySunny, WiCloudy, WiFog, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; // Importa iconos de clima de la librería react-icons.

/**
 * Retorna un componente de icono de clima de React basado en el código de clima proporcionado.
 * @param {number} code - El código de clima (según la API de Open-Meteo).
 * @returns {JSX.Element|null} Un componente de icono de React o null si el código no coincide.
 */
export const getWeatherIcon = (code) => {
  switch (code) {
    case 0: // Cielo despejado
      return <WiDaySunny />;
    case 1: // Principalmente despejado
    case 2: // Parcialmente nublado
    case 3: // Nublado
      return <WiCloudy />;
    case 45: // Niebla
    case 48: // Depósito de niebla
      return <WiFog />;
    case 51: // Llovizna ligera
    case 53: // Llovizna moderada
    case 55: // Llovizna densa
    case 56: // Llovizna helada ligera
    case 57: // Llovizna helada densa
    case 61: // Lluvia ligera
    case 63: // Lluvia moderada
    case 65: // Lluvia fuerte
    case 66: // Lluvia helada ligera
    case 67: // Lluvia helada fuerte
    case 80: // Chubascos ligeros
    case 81: // Chubascos moderados
    case 82: // Chubascos violentos
      return <WiRain />;
    case 71: // Caída de nieve ligera
    case 73: // Caída de nieve moderada
    case 75: // Caída de nieve fuerte
    case 77: // Granos de nieve
    case 85: // Chubascos de nieve ligeros
    case 86: // Chubascos de nieve fuertes
      return <WiSnow />;
    case 95: // Tormenta
    case 96: // Tormenta con granizo ligero
    case 99: // Tormenta con granizo fuerte
      return <WiThunderstorm />;
    default: // Código desconocido
      return null;
  }
};

/**
 * Retorna una descripción textual del clima basada en el código de clima proporcionado.
 * @param {number} code - El código de clima (según la API de Open-Meteo).
 * @returns {string} Una cadena de texto que describe el clima.
 */
export const getWeatherDescription = (code) => {
  switch (code) {
    case 0:
      return 'Despejado';
    case 1:
    case 2:
    case 3:
      return 'Nublado';
    case 45:
    case 48:
      return 'Niebla';
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return 'Lluvia';
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return 'Nieve';
    case 95:
    case 96:
    case 99:
      return 'Tormenta';
    default:
      return 'Desconocido';
  }
};

/**
 * Obtiene una URL de imagen de una ciudad desde la API de Pexels.
 * @param {string} city - El nombre de la ciudad para la cual buscar una imagen.
 * @returns {Promise<string|null>} Una promesa que resuelve con la URL de la imagen grande, o null si no se encuentra o hay un error.
 */
export async function getCityImageUrl(city) {
  // Clave de API de Pexels. (Nota: En una aplicación real, esta clave debería estar en una variable de entorno).
  const apiKey = 'nRu8kEXLmNzd994ci0HzqIit7hS6kht2trfOkfp60Fvy1VkFurBGSrfw';
  // Construye la URL de la API de Pexels para buscar una imagen de la ciudad.
  // Se limita a 1 resultado y se prefiere la orientación horizontal.
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=1&orientation=landscape`;

  try {
    // Realiza la solicitud fetch a la API de Pexels con la clave de autorización.
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey
      }
    });

    // Si la respuesta no es exitosa (ej. 404, 500), loguea el error y retorna null.
    if (!response.ok) {
      console.error('Error en la respuesta de Pexels:', response.status, response.statusText);
      return null;
    }

    // Parsea la respuesta JSON.
    const data = await response.json();
    console.log('Pexels data:', data); // Loguea los datos recibidos de Pexels.

    // Retorna la URL de la imagen grande del primer resultado, o null si no hay fotos.
    return data.photos[0]?.src?.large || null;
  } catch (err) {
    console.error('Error al buscar imagen en Pexels:', err); // Captura y loguea cualquier error de red o de la API.
    return null; // Retorna null en caso de error.
  }
}
