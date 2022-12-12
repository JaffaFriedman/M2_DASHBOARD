  function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
  }

window.onload = function() {
        fclimaLatLng(0,78.5249);
        const ciudad=document.getElementById('ciudadId')
        ciudad.value='Paris'
        fclimaCiudad();
        fclimaSantiago();
        ffooter();
}

function borrar(bloque){
        const borrar=document.getElementById(bloque) 
        borrar.innerHTML = "" 
}

function armar(bloque,data,ciudad){
    let pais=" "   
    if (data.sys.country != undefined || data.sys.country != null) { pais=data.sys.country }
        bloque.innerHTML = ` <div class="card bg-dark text-white text-center">  
            <div class="card-body" style="height: 180px">                          
                <h2 class="card-text"">${pais} ${ciudad}    ${data.main.temp} ℃</h2>    
                <p class="card-text">Latitud ${data.coord.lat}  Longitud ${data.coord.lon} </p>   
                <HR>Sensación Térmica ${data.main.feels_like} ℃   Min ${data.main.temp_min} ℃   Max ${data.main.temp_max} ℃ </HR> 
                <p class="card-text">Humedad ${data.main.humidity}%   Viento ${data.wind.speed} m/s   ${capitalizar(data.weather[0].description)}}</p>                           
            </div>
        </div>`    
}
 
mapboxgl.accessToken = 'pk.eyJ1IjoiamFmZmFmcmllZG1hbiIsImEiOiJjbGJpYTJwajYwbjh3M3JxYmYzbWZmbTB0In0.Be-Ftie95WrhEJUrOUV7QQ';
const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-70.6483, -33.4569], 
        zoom: 3
});
 
map.on('click', (e) => {
        fclimaLatLng(e.lngLat.lat,e.lngLat.lng)  
});

async function fclimaLatLng(latitud,longitud)  {    
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        const data=await response.json()
        borrar("resumenLatLon")
        const bloque=document.createElement("div") 
        armar(bloque,data,' ')
        resumenLatLon.appendChild(bloque) 
        map.flyTo({
            center: [longitud, latitud],
            zoom: 3,
            essential: true            
        }); 
}

async function fclimaCiudad() {   
        ciudad=document.querySelector("#ciudadId")
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        const data=await response.json()
        borrar("resumenCiudad")
        const bloque=document.createElement("div") 
        armar(bloque,data,ciudad.value) 
        resumenCiudad.appendChild(bloque) 
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            zoom: 3,
            essential: true            
        }); 
}

async function fclimaSantiago()  {   
        const url=`https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        const data=await response.json()
        borrar("resumenSantiago")
        const bloque=document.createElement("div") 
        armar(bloque,data,'Santiago')
        resumenSantiago.appendChild(bloque)
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            zoom: 0,
            essential: true            
        }); 
}

function ffooter(){
        const opciones = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const fecha=capitalizar(new Date().toLocaleDateString('es-ES',opciones));   
        const hora=new Date().toTimeString();
        const bloque=document.createElement("div") 
        bloque.innerHTML = ` <div>
                                <HR> &copy; ${fecha}. Página desarrollada por Camilo Salas - Jaffa Friedman</HR> 
                                </div>`           
                                footerText.appendChild(bloque)
}