/* JFE 17-12-2022 18:18 */
import { imagenClima,imagenTermometro } from "./imagenes.js";
let dataW={};
let bloque= {};
let canvas={};
let celda={};
let ciudad={};
let i=0;
let etiqueta=[];
let minima=[];
let maxima=[];



window.onload = function() {
        ciudad=document.getElementById("ciudadId");
        ciudad.value=" ";
        fclimaLatLng(0,78.5249);
        ciudad.value="Paris";
        fclimaCiudad(ciudad.value);
        ciudad.value="Santiago";
        fclimaSantiago();
    //    grafico();
        ffooter(); 
}



 function imagenUbicacion(pais){
        let ubicacion='ubicacion_1'  
        if (dataW.sys.country != undefined || dataW.sys.country != null) { pais=dataW.sys.country; ubicacion='ubicacion_0'; }  
        return ubicacion;
 }

function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
  }

function armar(ciudad,caja){
        // Pais
        let pais=" ";
        let ubicacion='ubicacion_1'  
        if (dataW.sys.country != undefined || dataW.sys.country != null) { pais=dataW.sys.country; ubicacion='ubicacion_0'; }
        let imgterm= imagenTermometro (dataW.main.temp);
        let imgWeather=imagenClima (dataW.weather[0].description,dataW.weather[0].main)
        bloque=document.getElementById(caja);    
        celda=bloque.getElementsByTagName("th")[0];
        celda.innerHTML = 
                `<h3><img src="./img/${ubicacion}.png"  style="height: 40px" >${pais} ${ciudad} </h3> 
                <div class="row"><p><img src="./img/viento.png"  style="height: 40px; width:40px;" > Viento ${dataW.wind.speed} m/s</p></div> 
                <div class="row"><p><img src="./img/humedad.png" style="height: 40px; width:40px;" >Humedad ${dataW.main.humidity}%</p></div> 
                <p>${capitalizar(dataW.weather[0].description)}</p>  ` 
        celda=bloque.getElementsByTagName("th")[1];
        celda.innerHTML = 
                `<p class="align-middle""><img src="${imgWeather}" style="width: 140px" ></p> ` 
        celda=bloque.getElementsByTagName("th")[2];
        celda.innerHTML = 
                `<h3><img src="${imgterm}"  style="height: 80px" > ${dataW.main.temp}℃  </h3> 
                <p><small>Min ${dataW.main.temp_min}℃</p>  
                <p>Max ${dataW.main.temp_max}℃ </p>     
                <p>Sens.Térmica ${dataW.main.feels_like}℃</p>`  
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
        dataW=await response.json()   
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
        dataW=await response.json();
        armar(ciudad.value,"pCiudad");
        map.flyTo({
            center: [dataW.coord.lon, dataW.coord.lat],
            zoom: 3,
            essential: true            
        }); 
        fforecastCiudad();
}

async function fclimaSantiago()  {  
        const url=`https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url)
        dataW=await response.json()
        armar("Santiago","pSantiago")
        console.log(dataW)
        map.flyTo({
            center: [dataW.coord.lon, dataW.coord.lat],
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
        dataW=await response.json(); 
        bloque=document.getElementById("gLatLon");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){
                celda[i].innerHTML =armarForecast(i)
        }  
}

async function fforecastCiudad() {   
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad.value}&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url);
        dataW=await response.json();  
        bloque=document.getElementById("gCiudad");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i)
        }  
}

async function fforecastSantiago() {   
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
        const response=await fetch(url);
        dataW=await response.json(); 
        bloque=document.getElementById("gSantiago");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i)
        }   
        for(i=0;i<40;i++){        
                etiqueta.push(dataW.list[i].dt_text);
                maxima.push(dataW.list[i].main.temp_max);
                minima.push(dataW.list[i].main.temp_min);
             }   
      //  bloque=document.getElementById("g1");
        //console.log(dataW)
}

function armarForecast(idx){
        const img = imagenClima ( dataW.list[idx].weather[0].description,dataW.list[idx].weather[0].main);
        const texto =`<img src="${img}" style="width: 40px"> 
                <P><small>Min ${dataW.list[idx].main.temp_min}℃</p>  
                <p>Max ${dataW.list[idx].main.temp_max}℃ </p>   
        `
        return texto;
}

 

 
        /*
        const chart = new Chart(canvas, {
        type: 'line',
        dataW: { labels : etiqueta,
                dataWsets: [
                                {label: 'Maxima', dataW: maxima,},
                                {label: 'Minima', dataW: minima,}
                        ],
                },
        }
      })
      */;

 
