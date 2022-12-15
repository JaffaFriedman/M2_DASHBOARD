let weatherD=["cielo claro","nevada ligera","algo de nubes","nubes","muy nuboso","lluvia ligera","lluvia moderada","lluvia de gran intensidad","nubes dispersas"];
let weatherM=["Clear","Clouds","Rain","nubes","Snow"];
let data={};

window.onload = function() {
        fclimaLatLng(0,78.5249);
        const ciudad=document.getElementById("ciudadId");
        ciudad.value="Paris";
        fclimaCiudad();
        fclimaSantiago();
        ffooter();
}

function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
  }

function borrar(bloque){
        const borrar=document.getElementById(bloque);
        borrar.innerHTML = "";
}

function armar(bloque,ciudad){
    // Pais
    let pais=" ";
    let ubicacion='ubicacion_1'  
    if (data.sys.country != undefined || data.sys.country != null) { pais=data.sys.country; ubicacion='ubicacion_0'; }
    // Imagen central
    console.log(data.weather[0].description);
    console.log(data.weather[0].main);
    // Termometro
    let color='amarillo';
    if ( data.main.temp <18) color='azul';
    if ( data.main.temp >28) color='rojo';
    //
    let imgWeather = 'D_'+weatherD.findIndex(weather => weather === data.weather[0].description);
    if (imgWeather==='D_-1') imgWeather = 'M_'+weatherM.findIndex(weather => weather === data.weather[0].main);
    console.log(imgWeather);
    //const index = fruits.findIndex(fruit => fruit === "blueberries");
        bloque.innerHTML = `<div class="card" style="height: 200px width: 550px;" >
                <div class="row">  
                        <div class="col ms-2 mt-2">                        
                                <p class=".fs-1 fw-bold"><img src="./img/${ubicacion}.png"  style="height: 40px" >${pais} ${ciudad} </p>  
                                <p class=".fs-1"><img src="./img/term_${color}.png"  style="height: 80px" > ${data.main.temp}℃  </p> 
                                <p class=".fs-6">Min ${data.main.temp_min}℃ Max ${data.main.temp_max}℃ </p>    
                                <figcaption class=".fs-6"">Sens.Térmica ${data.main.feels_like}℃</p>      
                        </div>
                        <div class="col mt-2 text-center"> 
                                <p class="align-middle""><img src="./img/weather${imgWeather}.png" style="height: 140px" ></p>
                        </div> 
                        <div class="col mt-2">
                                <p class=".fs-6">${capitalizar(data.weather[0].description)}</p>
                                <div class="row"><p class=".fs-6"><img src="./img/viento.png"  style="height: 40px; width:40px;" > Viento ${data.wind.speed} m/s</p></div> 
                                <div class="row"><p class=".fs-6"><img src="./img/humedad.png" style="height: 40px; width:40px;" >Humedad ${data.main.humidity}%</p></div> 
                        </div> 
                </div>  
        </div>`    
}
 
/*
<h2 class="card-text">${pais} ${ciudad}    ${data.main.temp} ℃</h2>    
                <p class="card-text">Latitud ${data.coord.lat}  Longitud ${data.coord.lon} </p>   
                <HR>Sensación Térmica ${data.main.feels_like} ℃   Min ${data.main.temp_min} ℃   Max ${data.main.temp_max} ℃ </HR> 
                <p class="card-text">Humedad ${data.main.humidity}%   Viento ${data.wind.speed} m/s   ${capitalizar(data.weather[0].description)}}</p>   
                */
 
mapboxgl.accessToken = "pk.eyJ1IjoiamFmZmFmcmllZG1hbiIsImEiOiJjbGJpYTJwajYwbjh3M3JxYmYzbWZmbTB0In0.Be-Ftie95WrhEJUrOUV7QQ";
const map = new mapboxgl.Map({
        container: "map", 
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-70.6483, -33.4569], 
        zoom: 3
});
 
map.on("click", (e) => {
        fclimaLatLng(e.lngLat.lat,e.lngLat.lng)  
});

async function fclimaLatLng(latitud,longitud)  {    
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        data=await response.json()
        borrar("resumenLatLon")
        const bloque=document.createElement("div") 
        armar(bloque," ")
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
        data=await response.json()
        borrar("resumenCiudad")
        const bloque=document.createElement("div") 
        armar(bloque,ciudad.value) 
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
        data=await response.json()
        borrar("resumenSantiago")
        const bloque=document.createElement("div") 
        armar(bloque,"Santiago")
        resumenSantiago.appendChild(bloque)
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            zoom: 0,
            essential: true            
        }); 
}

function ffooter(){
        const opciones = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        const fecha=capitalizar(new Date().toLocaleDateString("es-ES",opciones));   
        const hora=new Date().toTimeString();
        const bloque=document.createElement("div") 
        bloque.innerHTML = ` <div>
                                <HR> &copy; ${fecha}. Página desarrollada por Camilo Salas - Jaffa Friedman</HR> 
                                </div>`           
                                footerText.appendChild(bloque)
}