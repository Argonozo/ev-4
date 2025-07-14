// weather-app/src/services/storageService.js
// Este servicio se encarga de la interacción con el almacenamiento local (localStorage)
// para guardar, recuperar y gestionar la lista de ciudades del usuario.

// Clave utilizada para almacenar las ciudades en localStorage.
const CITIES_STORAGE_KEY = 'cities';

/**
 * Objeto de servicio para gestionar las operaciones de almacenamiento local de ciudades.
 */
export const storageService = {
  /**
   * Recupera la lista de ciudades del almacenamiento local.
   * @returns {Array<object>} Un arreglo de objetos de ciudad. Retorna un arreglo vacío si no hay ciudades guardadas o si ocurre un error.
   */
  getCities() {
    try {
      const stored = localStorage.getItem(CITIES_STORAGE_KEY); // Intenta obtener el string JSON de localStorage.
      return stored ? JSON.parse(stored) : []; // Si existe, lo parsea; de lo contrario, retorna un arreglo vacío.
    } catch (error) {
      console.error('Error al cargar ciudades del almacenamiento:', error); // Loguea el error si el parseo falla.
      return []; // Retorna un arreglo vacío para evitar que la aplicación se rompa.
    }
  },

  /**
   * Guarda la lista actual de ciudades en el almacenamiento local.
   * @param {Array<object>} cities - El arreglo de objetos de ciudad a guardar.
   */
  saveCities(cities) {
    try {
      localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(cities)); // Convierte el arreglo a JSON string y lo guarda.
    } catch (error) {
      console.error('Error al guardar ciudades en el almacenamiento:', error); // Loguea el error si la operación falla.
    }
  },

  /**
   * Añade una nueva ciudad a la lista existente en el almacenamiento local.
   * @param {object} city - El objeto de la ciudad a añadir.
   * @returns {Array<object>} La lista actualizada de ciudades después de añadir la nueva.
   */
  addCity(city) {
    const cities = this.getCities(); // Obtiene la lista actual de ciudades.
    const updatedCities = [...cities, city]; // Crea un nuevo arreglo con la ciudad añadida.
    this.saveCities(updatedCities); // Guarda la lista actualizada.
    return updatedCities; // Retorna la lista actualizada.
  },

  /**
   * Elimina una ciudad de la lista existente en el almacenamiento local por su ID.
   * @param {number} cityId - El ID de la ciudad a eliminar.
   * @returns {Array<object>} La lista actualizada de ciudades después de eliminar la especificada.
   */
  removeCity(cityId) {
    const cities = this.getCities(); // Obtiene la lista actual de ciudades.
    const updatedCities = cities.filter(city => city.id !== cityId); // Filtra la ciudad a eliminar.
    this.saveCities(updatedCities); // Guarda la lista actualizada.
    return updatedCities; // Retorna la lista actualizada.
  }
};
