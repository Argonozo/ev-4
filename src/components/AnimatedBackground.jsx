// weather-app/src/components/AnimatedBackground.jsx
// Este componente crea un fondo animado con efectos visuales de bolas y sombras
// que reaccionan al movimiento del ratón.

import { useEffect } from "react"; // Importa useEffect para manejar efectos secundarios en componentes funcionales.
import "./AnimatedBackground.css"; // Importa los estilos CSS para este componente.

// Crea un arreglo de 12 elementos para representar las "bolas" animadas.
const balls = Array.from({ length: 12 });
// Crea un arreglo de 12 elementos para representar las "sombras" animadas.
const shadows = Array.from({ length: 12 });

/**
 * Componente funcional que renderiza un fondo animado.
 * El fondo incluye elementos visuales que se mueven y proyectan sombras
 * en respuesta a la posición del cursor del ratón.
 * @returns {JSX.Element} El fondo animado.
 */
export default function AnimatedBackground() {
  // useEffect se utiliza para añadir y limpiar un event listener del ratón.
  // Este efecto se ejecuta una sola vez al montar el componente (debido al arreglo de dependencias vacío []).
  useEffect(() => {
    /**
     * Manejador de eventos para el movimiento del ratón.
     * Actualiza las propiedades CSS personalizadas '--mx' y '--my' en el body del documento,
     * lo que permite que los elementos animados reaccionen a la posición del ratón.
     * @param {MouseEvent} e - El evento del ratón.
     */
    const handler = (e) => {
      document.body.style.setProperty('--mx', e.clientX);
      document.body.style.setProperty('--my', e.clientY);
    };

    // Añade el event listener para el movimiento del ratón al objeto window.
    window.addEventListener('mousemove', handler);

    // Función de limpieza que se ejecuta cuando el componente se desmonta.
    // Elimina el event listener para evitar fugas de memoria.
    return () => window.removeEventListener('mousemove', handler);
  }, []); // El arreglo vacío asegura que el efecto se ejecute solo una vez al montar y limpiar al desmontar.

  return (
    // Fragmento de React para agrupar múltiples elementos sin añadir un nodo extra al DOM.
    <>
      {/* Elemento base de luz que puede servir como fuente de iluminación para las sombras. */}
      <div className="baseLight"></div>
      {/* Contenedor para las sombras animadas. */}
      <div className="shadows">
        {/* Mapea el arreglo 'shadows' para renderizar múltiples elementos de sombra. */}
        {shadows.map((_, i) => (
          // Cada sombra tiene una propiedad CSS personalizada '--i' para diferenciar su animación.
          <div className="shadow" style={{ "--i": i }} key={i}></div>
        ))}
      </div>
      {/* Contenedor para las bolas animadas. */}
      <div className="balls">
        {/* Mapea el arreglo 'balls' para renderizar múltiples elementos de bola. */}
        {balls.map((_, i) => (
          // Cada bola tiene una propiedad CSS personalizada '--i' para diferenciar su animación.
          <div className="ball" style={{ "--i": i }} key={i}></div>
        ))}
      </div>
    </>
  );
}
