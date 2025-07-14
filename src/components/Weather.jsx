// weather-app/src/components/Weather.jsx
// Este componente se encarga de mostrar los datos del clima actual para una ciudad seleccionada.
// Incluye la temperatura, descripción del clima, velocidad del viento y un icono representativo.
// También gestiona la imagen de fondo del contenedor del clima, que puede ser una imagen de la ciudad
// o una imagen genérica basada en el tipo de clima.

import React, { useEffect, useState } from 'react'; // Importa hooks de React para manejar efectos y estado.
import { getWeatherIcon, getWeatherDescription, getCityImageUrl } from '../utils/weatherUtils.jsx'; // Importa utilidades para obtener iconos, descripciones y URLs de imágenes de ciudades.
import '../styles/Weather.css'; // Importa los estilos CSS para este componente.

// Mapeo de códigos de clima a URLs de imágenes de fondo realistas (Unsplash)
const weatherBackgrounds = {
  clear: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  cloudy: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  fog: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
  rain: 'https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=800&q=80',
  snow: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
  thunder: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
};

/**
 * Función auxiliar para obtener la URL de la imagen de fondo basada en el código del clima.
 * @param {number} code - El código del clima.
 * @returns {string} La URL de la imagen de fondo correspondiente.
 */
function getWeatherBg(code) {
  if (code === 0) return weatherBackgrounds.clear; // Despejado
  if ([1,2,3].includes(code)) return weatherBackgrounds.cloudy; // Nublado
  if ([45,48].includes(code)) return weatherBackgrounds.fog; // Niebla
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return weatherBackgrounds.rain; // Lluvia
  if ([71,73,75,77,85,86].includes(code)) return weatherBackgrounds.snow; // Nieve
  if ([95,96,99].includes(code)) return weatherBackgrounds.thunder; // Tormenta
  return weatherBackgrounds.default; // Por defecto, usa la imagen de cielo despejado.
}

/**
 * Componente funcional que muestra el clima actual de una ciudad.
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.weatherData - Objeto que contiene los datos del clima actual (temperatura, viento, etc.).
 * @param {string|null} props.error - Mensaje de error si la obtención del clima falla.
 * @param {boolean} props.loading - Indica si los datos del clima están cargando.
 * @param {object|null} props.selectedCity - El objeto de la ciudad actualmente seleccionada.
 * @returns {JSX.Element} El componente de visualización del clima.
 */
const Weather = ({ weatherData, error, loading, selectedCity }) => {
  // Inicializa weathercode a 0 (despejado) si no hay datos del clima.
  let weathercode = 0;
  if (weatherData && weatherData.current_weather) {
    weathercode = weatherData.current_weather.weathercode; // Obtiene el código de clima de los datos.
  }
  // Obtiene una imagen de fondo de respaldo basada en el código del clima.
  const fallbackBg = getWeatherBg(weathercode);

  // Estado para almacenar la URL de la imagen de fondo de la ciudad obtenida de Unsplash/Pexels.
  const [cityBg, setCityBg] = useState(null);

  // Efecto para obtener la imagen de fondo de la ciudad cuando `selectedCity` cambia.
  useEffect(() => {
    let ignore = false; // Bandera para evitar actualizaciones de estado en componentes desmontados.
    /**
     * Función asíncrona para buscar la imagen de fondo de la ciudad.
     */
    async function fetchBg() {
      if (selectedCity && selectedCity.name) {
        // Si hay una ciudad seleccionada, busca una imagen de la ciudad.
        const img = await getCityImageUrl(selectedCity.name);
        if (!ignore) setCityBg(img); // Actualiza el estado si el componente sigue montado.
      } else {
        setCityBg(null); // Si no hay ciudad seleccionada, no muestra imagen específica.
      }
    }
    fetchBg(); // Llama a la función para buscar la imagen.
    // Función de limpieza que se ejecuta al desmontar el componente o antes de que el efecto se vuelva a ejecutar.
    return () => { ignore = true; };
  }, [selectedCity]); // El efecto se vuelve a ejecutar cuando `selectedCity` cambia.

  // Determina la URL de la imagen de fondo a usar: la imagen de la ciudad si está disponible, de lo contrario, la de respaldo.
  const bgUrl = cityBg || fallbackBg;

  return (
    // Contenedor principal del clima con estilos en línea para el fondo y efectos visuales.
    <div className="weather-container" style={{
      backgroundImage: `url(${bgUrl})`, // Establece la imagen de fondo.
      backgroundSize: 'cover', // Cubre todo el contenedor.
      backgroundPosition: 'center', // Centra la imagen de fondo.
      transition: 'background-image 0.8s cubic-bezier(.4,2,.6,1)', // Transición suave al cambiar la imagen.
      boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)', // Sombra para un efecto de profundidad.
      borderRadius: '24px', // Bordes redondeados.
      position: 'relative', // Posicionamiento relativo para elementos internos.
      overflow: 'hidden', // Oculta el contenido que se desborda.
      minHeight: '400px', // Altura mínima del contenedor.
      display: 'flex', // Usa flexbox para el diseño interno.
      alignItems: 'center', // Centra los elementos verticalmente.
      justifyContent: 'center', // Centra los elementos horizontalmente.
    }}>
      {/* Contenedor interno con efecto de "vidrio esmerilado" (glassmorphism). */}
      <div className="weather-glass" style={{
        borderRadius: '24px', // Bordes redondeados.
        padding: '2rem 2.5rem', // Espaciado interno.
        boxShadow: '0 4px 32px 0 rgba(31,38,135,0.12)', // Sombra.
        backdropFilter: 'blur(12px)', // Efecto de desenfoque en el fondo.
        minWidth: '320px', // Ancho mínimo.
        maxWidth: '90vw', // Ancho máximo relativo al viewport.
        transition: 'background 0.5s', // Transición para cambios de fondo.
        animation: 'fadeIn 1s', // Animación de aparición.
      }}>
        {/* Muestra un mensaje de carga si los datos están siendo obtenidos. */}
        {loading && (
          <div className="loading">Cargando datos del clima...</div>
        )}
        {/* Muestra un mensaje de error si ocurre un problema al obtener los datos. */}
        {error && (
          <div className="weather-container error">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        )}
        {/* Muestra un mensaje para seleccionar una ciudad si no hay datos ni ciudad seleccionada. */}
        {!loading && !error && (!weatherData || !selectedCity) && (
          <div className="weather-container">
            <p>Selecciona una ciudad para ver el clima</p>
          </div>
        )}
        {/* Muestra los datos del clima si no hay carga, no hay error y hay datos disponibles. */}
        {!loading && !error && weatherData && selectedCity && (
          <>
            {/* Título con el nombre de la ciudad. */}
            <h2 style={{marginBottom: '1.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>Clima en {selectedCity.name}</h2>
            {/* Contenido principal del clima (icono, temperatura, descripción, viento). */}
            <div className="weather-content" style={{alignItems: 'center'}}>
              {/* Icono del clima. */}
              <div className="weather-icon" style={{fontSize: '6rem', color: '#fff', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.18))', transition: 'font-size 0.3s'}}>
                {getWeatherIcon(weathercode)}
              </div>
              {/* Información detallada del clima. */}
              <div className="weather-info">
                {/* Temperatura actual. */}
                <div className="temperature" style={{fontSize: '3.5rem', fontWeight: 400, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
                  {weatherData.current_weather.temperature}°C
                </div>
                {/* Descripción del clima. */}
                <div className="weather-description" style={{fontSize: '1.5rem', color: '#fff', opacity: 0.95, marginBottom: '0.5rem'}}>
                  {getWeatherDescription(weathercode)}
                </div>
                {/* Detalles adicionales del clima (ej. velocidad del viento). */}
                <div className="weather-details" style={{color: '#fff', opacity: 0.85}}>
                  <p>Viento: {weatherData.current_weather.windspeed} km/h</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather; // Exporta el componente Weather para su uso en otros archivos.
