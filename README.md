# Klima-Kun: Tu Asistente del Clima

## 1. Problemática

En el día a día, consultar el pronóstico del tiempo es una necesidad común. Sin embargo, muchas plataformas meteorológicas están sobrecargadas de información, anuncios y presentan interfaces poco intuitivas. Esto dificulta obtener rápidamente los datos esenciales que un usuario busca, como la temperatura actual y el pronóstico para los próximos días en sus ciudades de interés.

## 2. Solución Propuesta

**Klima-Kun** es una aplicación web de página única (SPA) diseñada para ofrecer una experiencia de usuario limpia, rápida y agradable. La solución se centra en resolver la problemática anterior mediante las siguientes características:

*   **Interfaz Minimalista:** Se elimina todo el ruido visual para presentar únicamente la información relevante: el clima de la ciudad que te interesa.
*   **Búsqueda Inteligente:** Permite a los usuarios buscar cualquier ciudad del mundo y obtener resultados precisos al instante.
*   **Lista de Favoritos:** Los usuarios pueden guardar sus ciudades más consultadas en una lista persistente en el navegador, permitiendo un acceso rápido sin necesidad de buscarlas cada vez.
*   **Visualización Clara:** Muestra la temperatura actual, el estado del cielo (soleado, nublado, etc.) y un pronóstico básico de una manera fácil de entender.
*   **Experiencia Agradable:** Incluye un fondo animado sutil que mejora la estética de la aplicación sin distraer del contenido principal.

La aplicación se ha construido como una Single Page Application (SPA) utilizando **React** y **Vite**, lo que garantiza una carga rápida y una navegación fluida sin recargas de página.

## 3. Instrucciones de Uso

La aplicación es muy intuitiva. Sigue estos pasos para sacarle el máximo provecho:

1.  **Buscar una Ciudad:**
    *   Utiliza la barra de búsqueda en la parte superior para escribir el nombre de la ciudad que deseas consultar.
    *   La aplicación te mostrará sugerencias a medida que escribes.

2.  **Consultar el Clima:**
    *   Haz clic en el botón de búsqueda (o presiona Enter) para ver el clima de la ciudad buscada sin añadirla a tus favoritos.

3.  **Guardar una Ciudad en Favoritos:**
    *   Después de buscar una ciudad, haz clic en el botón "Agregar" para guardarla en tu lista personal.
    *   La ciudad aparecerá en la barra lateral izquierda.

4.  **Navegar entre Favoritos:**
    *   Haz clic sobre el nombre de cualquier ciudad en tu lista de favoritos para ver su información climática actualizada.

5.  **Eliminar una Ciudad:**
    *   En la lista de favoritos, cada ciudad tiene un icono de papelera al lado. Haz clic en él para eliminar la ciudad de tu lista.

## 4. Instalación y Ejecución en Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el Repositorio:**
    ```bash
    git clone <"https://github.com/Argonozo/ev-4.git">
    cd weather-app
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar la Aplicación:**
    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## 5. Tecnologías Utilizadas

*   **Frontend:** React, Vite, JavaScript (ES6+), CSS.
*   **APIs Externas:**
    *   **Open-Meteo Geocoding API:** Para la búsqueda y obtención de coordenadas de ciudades.
    *   **Open-Meteo Weather API:** Para obtener los datos del pronóstico del tiempo.
