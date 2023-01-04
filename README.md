# M2_DASHBOARD
Dashboard del Clima

## Descripción
Esta aplicacion permite ver el clima en una ciudad o ubicación en el mundo. Permite ingresar la ciudad o elegir la ubicación en el mapa. Para esa ubicación presentara 3 tarjetas. Una con las condiciones actuales. La segunda con un grafico de las condiciones de 5 dias y la tercera con las condiciones de 1 dia cada 3 horas.
![image](https://user-images.githubusercontent.com/112987800/210631699-ace3f1e7-ba0d-4b85-89a2-9d2bbdacfd2f.png)

## Forma de uso
Este dashboard permite 4 interacciones según se muestra en la figra
![image](https://user-images.githubusercontent.com/112987800/210631635-c79edfcb-e42d-418e-b60b-e80e3387ac13.png)

## Integraciones
Este dashboard tiene las siguientes integraciones

### mapbox 
Para incluir el mapa del mundo y seleccionar las latitudes y longitudes.

### Char.js 
Para los graficos

### Openweather 
Para rescatar las condiciones climáticas de un lugar, en este caso se usan las api de weather para traer los datos actuales y la de forecast para traer el pronóstico de varios días y con ello hacer los dos graficos. Un de ellos muestra 5 dias a una hora especifica y el otro 1 dia a intervalos de 3 horas.

## Para instalar
Debe crear una carpeta y copiar los archivos en ella. Las imagenes van en la carpeta img, que a su vez tiene subcarpetas dia, noche y vientos. Tambien esta la carpeta de node_modules

## Forma de implementar
La estructura de la página está construida en HTML, las funcionalidades están diseñadas en los archivos de JavaScript. El archivo principal de javascript es app.js
Esta aplicación tiene los siguientes elementos:
1.	El Navbar, que permite escribir una ciudad y refresca las 3 tarjetas para esa ciudad.
2.	El mapa central, que permite pinchar un lugar y refresca las 3 tarjetas para esa latitud y longitud
3.	Tarjeta izquierda que muestra las condiciones del lugar en el momento actual. 
4.	Tarjeta central, grafico2, que muestra el pronóstico de 5 días y permite verlo a una hora determinada, permite elegir una hora para refrescar el gráfico
5.	Tarjeta derecha, grafico1, que muestra el pronóstico de 1 día cada 3 horas y permite verlo a una hora determinada, permite elegir una fecha para refrescar el gráfico
6.  Footer

##
 ### Archivo app.js
Contiene las funcionalidades del Mapbox y de las tarjetas con la inforamción de clima para cada ciudad y zona geográfica y los graficos. Este archivo tiene las siguientes funciones.
#### initOpciones   
Realiza la carga inicial para Santiago

#### Funciones para el clima actual
![image](https://user-images.githubusercontent.com/112987800/210627451-21008111-c50a-4916-ad55-095188e4fae2.png)

##### tituloLugar    
Permite seleccionar la imagen para el pais o ciudad.
##### Fclima         
ecupera los datos del clima de este momento mediante la api weather.
##### armarClima   
Arma la tarjeta que depliega los datos del clima

#### Grafico 1
![image](https://user-images.githubusercontent.com/112987800/210627241-6b5bf61d-5028-40ec-b534-04d8d0ea62d2.png)

##### refresh1     
Refresca el grafico 1, limpia y crea el mapa nuevamente
##### fforecastF1    
Recupera los datos de la api forecast que tiene la proyección a 5 dias y los prepara para char.io para el grafico 1
##### graficoF1   
Arma la tarjeta del grafico 1

#### Grafico 2
![image](https://user-images.githubusercontent.com/112987800/210627098-d170c9c3-72ae-4166-8dee-7a9a74423608.png)

##### graficoF2    
Arma la tarjeta del grafico 2

##### fforecastF2   
Recupera los datos de la api forecast que tiene la proyección a 5 dias y los prepara para char.io para el grafico 2

##### refresh2       
Refresca el grafico 2, limpia y crea el mapa nuevamente


### Archivo imagenes.js
Contiene las funcionalidades que que devuelvan el nombre del archivo que corresponde desplegar.
Este archivo tiene las siguientes funciones.

#### imagenClima    
Retorna la imagen que corresponde a la glosa de la descripcion del tiempo. Para algunas imagenes necesita la hora para saber si es de dia o de noche y devolver un sol o luna.

##### Imagenes para el Dia
![image](https://user-images.githubusercontent.com/112987800/210626255-6fb70a65-30a9-42e1-bb4b-95fcce135f2f.png)

##### Imagenes para la Noche
![image](https://user-images.githubusercontent.com/112987800/210626268-badd3d0a-2092-47a0-8146-fa48178dea84.png)

#### imagenViento   
Retorna la imagen correspondiente a la orientación del viento, que calcula en base a los grados que devuelve la api
           
![image](https://user-images.githubusercontent.com/112987800/210625396-f57ebfdf-68af-4997-82ce-2d199a2e0bd8.png)

#### imagenTermometro
Devuelve la imagen del termometro dependiendo la temperatura en azul, amarillo y rojo


 ### Archivo fechas.js
El proposito de estas funciones es dada una fecha y una diferencia del uso horario del lugar que devuelva un string con lo solicitado
#### fhora         
Devuelve la hora hh-mi minutos
#### ffecha        
Devuelve la fecha aaaa-mm-dd
#### fdia           
Devuelve el dia de la semana
