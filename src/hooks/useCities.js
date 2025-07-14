// weather-app/src/hooks/useCities.js
// Este hook personalizado gestiona la lista de ciudades guardadas por el usuario.
// Permite añadir, eliminar y recuperar ciudades del almacenamiento local.

import { useState, useEffect } from 'react'; // Importa hooks de React para manejar el estado y efectos secundarios.
import { storageService } from '../services/storageService'; // Importa el servicio de almacenamiento para interactuar con localStorage.

/**
 * Hook personalizado para gestionar la lista de ciudades.
 * Proporciona funciones para añadir, eliminar y acceder a las ciudades guardadas.
 * @returns {object} Un objeto que contiene la lista de ciudades y funciones para modificarlas.
 * @property {Array<object>} cities - La lista actual de ciudades.
 * @property {function} addCity - Función para añadir una nueva ciudad.
 * @property {function} removeCity - Función para eliminar una ciudad por su ID.
 */
export const useCities = () => {
  // Estado local para almacenar la lista de ciudades.
  const [cities, setCities] = useState([]);

  // Efecto que se ejecuta una vez al montar el componente para cargar las ciudades del almacenamiento local.
  useEffect(() => {
    const storedCities = storageService.getCities(); // Obtiene las ciudades del almacenamiento.
    setCities(storedCities); // Actualiza el estado con las ciudades cargadas.
  }, []); // El arreglo de dependencias vacío asegura que este efecto se ejecute solo una vez.

  /**
   * Añade una nueva ciudad a la lista.
   * Asigna un ID único a la ciudad usando la marca de tiempo actual.
   * @param {object} city - El objeto de la ciudad a añadir (ej. { name: 'Santiago' }).
   */
  const addCity = (city) => {
    const newCity = { ...city, id: Date.now() }; // Crea un nuevo objeto de ciudad con un ID único.
    const updatedCities = storageService.addCity(newCity); // Añade la ciudad al almacenamiento y obtiene la lista actualizada.
    setCities(updatedCities); // Actualiza el estado con la nueva lista de ciudades.
  };

  /**
   * Elimina una ciudad de la lista por su ID.
   * @param {number} cityId - El ID de la ciudad a eliminar.
   */
  const removeCity = (cityId) => {
    const updatedCities = storageService.removeCity(cityId); // Elimina la ciudad del almacenamiento y obtiene la lista actualizada.
    setCities(updatedCities); // Actualiza el estado con la lista de ciudades modificada.
  };

  // Retorna el estado de las ciudades y las funciones para interactuar con ellas.
  return {
    cities,
    addCity,
    removeCity
  };
};
