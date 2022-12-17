/* JFE 16-12-2022 */
let weatherD=["cielo claro","nevada ligera","algo de nubes","nubes","muy nuboso","lluvia ligera","lluvia moderada","lluvia de gran intensidad","nubes dispersas"];
let weatherM=["Clear","Clouds","Rain","nubes","Snow"];
let data={};
let bloque= {};
let celda={};
let ciudad={};
let i=0;

window.onload = function() {
        ciudad=document.getElementById("ciudadId");
        ciudad.value=" ";
        fclimaLatLng(0,78.5249);
        ciudad.value="Paris";
        fclimaCiudad(ciudad.value);
        ciudad.value="Santiago";
        fclimaSantiago();
        ffooter(); 
}

function imagenTermometro (temp){
    let colorTerm='amarillo';
    if ( temp <18) colorTerm='azul';
    if ( temp >28) colorTerm='rojo';
    return  "./img/term_"+colorTerm+".png" ;
}

function imagenClima (descripcion,main){
        let img = 'D_'+weatherD.findIndex(weather => weather === descripcion);
        if (img==='D_-1') img = 'M_'+weatherM.findIndex(weather => weather === main);
        return "./img/weather"+img+".png";
 }

 function imagenUbicacion(pais){
        let ubicacion='ubicacion_1'  
        if (data.sys.country != undefined || data.sys.country != null) { pais=data.sys.country; ubicacion='ubicacion_0'; }  
        return ubicacion;
 }

function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
  }

function armar(ciudad,caja){
        // Pais
        let pais=" ";
        let ubicacion='ubicacion_1'  
        if (data.sys.country != undefined || data.sys.country != null) { pais=data.sys.country; ubicacion='ubicacion_0'; }
        let imgterm= imagenTermometro (data.main.temp);
        let imgWeather=imagenClima (data.weather[0].description,data.weather[0].main)
        bloque=document.getElementById(caja);    
        celda=bloque.getElementsByTagName("th")[0];
        celda.innerHTML = 
                `<h3><img src="./img/${ubicacion}.png"  style="height: 40px" >${pais} ${ciudad} </h3> 
                <div class="row"><p><img src="./img/viento.png"  style="height: 40px; width:40px;" > Viento ${data.wind.speed} m/s</p></div> 
                <div class="row"><p><img src="./img/humedad.png" style="height: 40px; width:40px;" >Humedad ${data.main.humidity}%</p></div> 
                <p>${capitalizar(data.weather[0].description)}</p>  ` 
        celda=bloque.getElementsByTagName("th")[1];
        celda.innerHTML = 
                `<p class="align-middle""><img src="${imgWeather}" style="width: 140px" ></p> ` 
        celda=bloque.getElementsByTagName("th")[2];
        celda.innerHTML = 
                `<h3><img src="${imgterm}"  style="height: 80px" > ${data.main.temp}℃  </h3> 
                <p><small>Min ${data.main.temp_min}℃</p>  
                <p>Max ${data.main.temp_max}℃ </p>     
                <p>Sens.Térmica ${data.main.feels_like}℃</p>`  
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
        armar(" ","pLatLon")
        map.flyTo({
            center: [longitud, latitud],
            zoom: 3,
            essential: true            
        }); 
        fforecastLatLng(latitud,longitud) ;
}

async function fclimaCiudad() {   
        ciudad=document.querySelector("#ciudadId")
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url);
        data=await response.json();
        armar(ciudad.value,"pCiudad");
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            zoom: 3,
            essential: true            
        }); 
        fforecastCiudad();
}

async function fclimaSantiago()  {  
        const url=`https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        data=await response.json()
        armar("Santiago","pSantiago")
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            zoom: 0,
            essential: true            
        }); 
        fforecastSantiago();
}

function ffooter(){
        const opciones = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        const fecha=capitalizar(new Date().toLocaleDateString("es-ES",opciones));   
        const hora=new Date().toTimeString();
        bloque=document.createElement("div") 
        bloque.innerHTML = ` <div>
                                <HR> &copy; ${fecha}. Página desarrollada por Camilo Salas - Jaffa Friedman</HR> 
                                </div>`           
        footerText.appendChild(bloque)
}

async function fforecastLatLng(latitud,longitud)  {    
        const url=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url);
        data=await response.json(); 
        bloque=document.getElementById("gLatLon");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){
                celda[i].innerHTML =armarForecast(i)
        }  
}

async function fforecastCiudad() {   
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad.value}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url);
        data=await response.json();  
        bloque=document.getElementById("gCiudad");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i)
        }  
}

async function fforecastSantiago() {   
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url);
        data=await response.json(); 
        bloque=document.getElementById("gSantiago");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i)
        }    
}

function armarForecast(idx){
        const img = imagenClima ( data.list[idx].weather[0].description,data.list[idx].weather[0].main);
        const texto =`<img src="${img}" style="width: 40px"> 
                <P><small>Min ${data.list[idx].main.temp_min}℃</p>  
                <p>Max ${data.list[idx].main.temp_max}℃ </p>   
        `
        return texto;
}