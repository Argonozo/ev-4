// weather-app/src/App.jsx
// Este archivo define el componente principal de la aplicación, 'App'.
// Es el contenedor de todos los demás componentes y gestiona el estado global de la aplicación
// relacionado con las ciudades y los datos del clima.

import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado.
import AnimatedBackground from './components/AnimatedBackground'; // Importa el componente de fondo animado.
import Weather from './components/Weather'; // Importa el componente para mostrar el clima.
import CityList from './components/CityList'; // Importa el componente para listar ciudades guardadas.
import CitySearch from './components/CitySearch'; // Importa el componente para buscar ciudades.
import { useCities } from './hooks/useCities'; // Importa el hook personalizado para gestionar las ciudades.
import { useWeather } from './hooks/useWeather'; // Importa el hook personalizado para gestionar los datos del clima.
import './App.css'; // Importa los estilos CSS específicos para el componente App.

/**
 * Componente principal de la aplicación Klima-Kun.
 * Gestiona la lógica central de la aplicación, incluyendo la búsqueda, adición y eliminación de ciudades,
 * así como la obtención y visualización de los datos del clima.
 * @returns {JSX.Element} El componente principal de la aplicación.
 */
function App() {
  // Utiliza el hook useCities para gestionar la lista de ciudades guardadas.
  const { cities, addCity, removeCity } = useCities();
  // Utiliza el hook useWeather para gestionar los datos del clima de la ciudad seleccionada.
  const { weatherData, selectedCity, error, loading, fetchWeatherForCity } = useWeather();
  // Estado para controlar si la barra lateral de ciudades está colapsada o expandida.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /**
   * Maneja la selección de una ciudad de la lista.
   * @param {object} city - El objeto de la ciudad seleccionada.
   */
  const handleSelectCity = (city) => {
    fetchWeatherForCity(city); // Obtiene y muestra el clima para la ciudad seleccionada.
  };

  /**
   * Maneja la adición de una nueva ciudad.
   * @param {object} city - El objeto de la ciudad a añadir.
   */
  const handleAddCity = (city) => {
    addCity(city); // Agrega la ciudad a la lista de ciudades guardadas.
    fetchWeatherForCity(city); // Obtiene y muestra el clima para la ciudad recién añadida.
  };

  /**
   * Maneja la visualización del clima para una ciudad sin guardarla.
   * Se utiliza principalmente para las sugerencias de búsqueda.
   * @param {object} city - El objeto de la ciudad para la cual mostrar el clima.
   */
  const handleShowWeather = (city) => {
    fetchWeatherForCity(city); // Obtiene y muestra el clima para la ciudad.
  };

  return (
    // Fragmento de React para agrupar elementos sin añadir nodos extra al DOM.
    <>
      {/* Componente de fondo animado que proporciona un efecto visual dinámico. */}
      <AnimatedBackground />
      {/* Contenedor principal de la aplicación. */}
      <div className="App">
        {/* Encabezado de la aplicación con el título y una descripción. */}
        <header className="App-header">
          <h1>Klima-Kun</h1>
          <p>Consulta el clima de tus ciudades favoritas</p>
        </header>
        {/* Sección principal de la aplicación que contiene la barra lateral y la sección del clima. */}
        <main className="App-main">
          {/* Barra lateral que muestra la lista de ciudades guardadas. */}
          {/* La clase 'collapsed' se aplica condicionalmente para ocultar/mostrar la barra lateral. */}
          <div className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
            <CityList
              cities={cities} // Lista de ciudades a mostrar.
              onSelectCity={handleSelectCity} // Función para manejar la selección de una ciudad.
              onDeleteCity={removeCity} // Función para manejar la eliminación de una ciudad.
              selectedCityId={selectedCity ? selectedCity.id : null} // ID de la ciudad actualmente seleccionada.
              collapsed={sidebarCollapsed} // Estado de colapso de la barra lateral.
              setCollapsed={setSidebarCollapsed} // Función para cambiar el estado de colapso.
            />
          </div>
          {/* Sección principal donde se muestra el buscador de ciudades y el componente del clima. */}
          <div className="weather-section">
            <div style={{width: '100%'}}>
              {/* Componente de búsqueda de ciudades. */}
              <CitySearch
                onAddCity={handleAddCity} // Función para añadir una ciudad.
                onShowWeather={handleShowWeather} // Función para mostrar el clima de una ciudad sin añadirla.
                selectedCity={selectedCity} // Ciudad actualmente seleccionada (para posibles usos internos del componente).
              />
              {/* Contenedor para el componente del clima, con un margen superior y una transición suave. */}
              <div style={{marginTop: '2rem', transition: 'all 0.5s'}}>
                {/* Componente que muestra los datos del clima. */}
                <Weather
                  weatherData={weatherData} // Datos del clima a mostrar.
                  error={error} // Mensaje de error si la obtención del clima falla.
                  loading={loading} // Indicador de carga.
                  selectedCity={selectedCity} // Ciudad para la cual se muestran los datos del clima.
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App; // Exporta el componente App para que pueda ser utilizado en main.jsx.
