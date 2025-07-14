// weather-app/src/main.jsx
// Este archivo es el punto de entrada principal de la aplicación React.
// Configura el renderizado de la aplicación en el DOM.

import { StrictMode } from 'react' // Importa StrictMode para habilitar comprobaciones adicionales en modo de desarrollo.
import { createRoot } from 'react-dom/client' // Importa createRoot para renderizar la aplicación React en el DOM.
import './index.css' // Importa los estilos CSS globales de la aplicación.
import App from './App.jsx' // Importa el componente principal de la aplicación.

// Crea una raíz de React para la aplicación, adjuntándola al elemento con el ID 'root' en el HTML.
createRoot(document.getElementById('root')).render(
  // StrictMode activa advertencias y comprobaciones adicionales para sus descendientes.
  // Ayuda a identificar problemas potenciales en la aplicación durante el desarrollo.
  <StrictMode>
    {/* Renderiza el componente principal de la aplicación. */}
    <App />
  </StrictMode>,
)
