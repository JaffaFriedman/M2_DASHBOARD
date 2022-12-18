# M2_DASHBOARD
 Dashboard del Clima

 ## Descripción
Este dashboard tiene las siguientes integraciones:
mapbox para incluir el mapa del mundo y seleccionar las latitudes y longitudes.
Char.js api de gráficos.
Openweather para rescatar las condiciones climáticas de un lugar, en este caso se usan las api de weather para traer los datos actuales y la de forecast para traer el pronóstico de varios días y con ello hacer el grafico.
Las funciones para los iconos variables del termómetro e imagen central se dejaron en un modulo separado imágenes.js y se exportan e importan en la aplicación principal.

 ## Forma de implementar
La estructura de la página está construida en HTML, las funcionalidades están diseñadas en los archivos de JavaScript. En el archivo app.js encontrarás las funcionaldiades del Mapbox y de las tarjetas con la inforamción de clima para cada ciudad y zona geográfica.
En el archivo grafico.js se encuentran las funciones de los gráficos extraídos de Chart.js.
En el archivo imagenes.js se encuentran las funciones que permiten la disposición de las imágenes correspondientes a cada tipo de clima.

 ### Consideraciones