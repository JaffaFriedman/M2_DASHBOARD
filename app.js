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
    bloque.innerHTML = `<div class="card" style="height: 200px width: 550px;" >
    <div class="row text-bg-light">  
            <div class="col ms-2 mt-2" style="height: 200px width: 150px;">                        
                    <p class=".fs-1 fw-bold"><img src="./img/${ubicacion}.png"  style="height: 40px" >${pais} ${ciudad} </p> 
                    <div class="row"><p class=".fs-6"><img src="./img/viento.png"  style="height: 40px; width:40px;" > Viento ${data.wind.speed} m/s</p></div> 
                    <div class="row"><p class=".fs-6"><img src="./img/humedad.png" style="height: 40px; width:40px;" >Humedad ${data.main.humidity}%</p></div> 
                    <p class=".fs-6">${capitalizar(data.weather[0].description)}</p> 
            </div>
            <div class="col mt-2" style="height: 200px width: 150px;"> 
                    <p class="align-middle""><img src="./img/weather${imgWeather}.png" style="width: 140px" ></p>
            </div> 
            <div class="col mt-2" style="height: 200px width: 230px;">                 
                    <p class=".fs-1"><img src="./img/term_${color}.png"  style="height: 80px" > ${data.main.temp}℃  </p> 
                    <p class=".fs-6"><snakk>Min ${data.main.temp_min}℃</p>  
                    <p class=".fs-6"><snakk>Max ${data.main.temp_max}℃ </p>     
                    <figcaption class=".fs-6"">Sens.Térmica ${data.main.feels_like}℃</p>     
            </div> 
    </div>  
</div>` 
    
}
 
 
  
               
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

async function fforecastLatLng(latitud,longitud)  {    
        const url=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        data=await response.json()
        borrar("resumenForecast")
        const bloque=document.createElement("div") 
        armarForecast(bloque," ")
        resumenForecast.appendChild(bloque) 
}


async function fforecastCiudad() {   
        ciudad=document.querySelector("#ciudadId")
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad.value}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        data=await response.json()
        borrar("resumenForecast")
        const bloque=document.createElement("div") 
        armarForecast(bloque,ciudad.value)
        resumenForecast.appendChild(bloque) 
}