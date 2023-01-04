# M2_DASHBOARD
 Dashboard del Clima

 ## Descripción
Este dashboard tiene las siguientes integraciones:
mapbox para incluir el mapa del mundo y seleccionar las latitudes y longitudes.
Char.js api de gráficos.
Openweather para rescatar las condiciones climáticas de un lugar, en este caso se usan las api de weather para traer los datos actuales y la de forecast para traer el pronóstico de varios días y con ello hacer los dos graficos. Un de ellos muestra 5 dias a una hora especifica y el otro 1 dia a intervalos de 3 horas.
Las funciones para los iconos variables del termómetro, viento e imagen central se dejaron en un modulo separado imágenes.js y se exportan e importan en la aplicación principal.
fechas.js contiene Las funciones del que hacen calculos de fecha tambien estan en un modulo separado fechas.js
 
 ## Forma de implementar
La estructura de la página está construida en HTML, las funcionalidades están diseñadas en los archivos de JavaScript. El archivo principal de javascript es app.js
Esta aplicación tiene los siguientes elementos:
1.	El Navbar, que permite escribir una ciudad y refresca las 3 tarjetas para esa ciudad.
2.	El mapa central, que permite pinchar un lugar y refresca las 3 tarjetas para esa latitud y longitud
3.	Tarjeta izquierda que muestra las condiciones del lugar en el momento actual. 
4.	Tarjeta central, grafico2, que muestra el pronóstico de 5 días y permite verlo a una hora determinada, permite elegir una hora para refrescar el gráfico
5.	Tarjeta derecha, grafico1, que muestra el pronóstico de 1 día cada 3 horas y permite verlo a una hora determinada, permite elegir una fecha para refrescar el gráfico
6.  Footer

 ### Archivo app.js
Contiene las funcionalidades del Mapbox y de las tarjetas con la inforamción de clima para cada ciudad y zona geográfica y los graficos. Este archivo tiene las siguientes funciones.
initOpciones:   Realiza la carga inicial para Santiago
tituloLugar:    Permite seleccionar la imagen para el pais o ciudad.
Fclima:         Recupera los datos del clima de este momento mediante la api weather.
armarClima:     Arma la tarjeta que depliega los datos del clima
refresh1:       Refresca el grafico 1, limpia y crea el mapa nuevamente
refresh2:       Refresca el grafico 2, limpia y crea el mapa nuevamente
fforecastF1:    Recupera los datos de la api forecast que tiene la proyección a 5 dias y los prepara para char.io para el grafico 1
fforecastF2:    Recupera los datos de la api forecast que tiene la proyección a 5 dias y los prepara para char.io para el grafico 2
graficoF1:      Arma la tarjeta del grafico 1
graficoF2:      Arma la tarjeta del grafico 2

 ### Archivo imagenes.js
Contiene las funcionalidades que que devuelvan el nombre del archivo que corresponde desplegar.
Este archivo tiene las siguientes funciones.
imagenClima:    Retorna la imagen que corresponde a la glosa de la descripcion del tiempo. 
                Para algunas imagenes necesita la hora para saber si es de dia o de noche y devolver un sol o luna.
imagenViento:   Retorna la imagen correspondiente a la orientación del viento
imagenTermometro: Devuelve la imagen del termometro dependiendo la temperatura en azul, amarillo y rojo

 ### Archivo fechas.js
El proposito de estas funciones es dada una fecha y una diferencia del uso horario del lugar que devuelva un string con lo solicitado
fhora:         Devuelve la hora hh-mi minutos
ffecha:        Devuelve la fecha aaaa-mm-dd
fdia:          Devuelve el dia de la semana
