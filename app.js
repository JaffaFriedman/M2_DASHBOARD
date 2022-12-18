/*Version 1.0 18-12-2022*/  
import { imagenClima,imagenTermometro } from "./imagenes.js";
let dataW={};
let bloque= {};
let celda={};
let ciudad={};
let i=0;
let etiqueta= new Array();
let minima= new Array();
let maxima= new Array(); 
let keyOpenWeather="24407ce777d816d8c6aee20ffa3aeb63";
//let keyOpenWeather="02bf0d97e9e5722dd8664c905a770e50";

 
window.onload = function() {
        ciudad=document.getElementById("ciudadId");
        ciudad.value=" ";
        fclimaLatLng(0,78.5249);
        ciudad.value="Paris";
        fclimaCiudad();
        graficoSantiago ()  ;
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
        if (dataW.name != undefined ||  dataW.name != null) { ciudad=dataW.name; ubicacion='ubicacion_1'; }
        let imgterm= imagenTermometro (dataW.main.temp);
        let imgWeather=imagenClima (dataW.weather[0].description,dataW.weather[0].main)
        bloque=document.getElementById(caja);    
        celda=bloque.getElementsByTagName("th")[0];
        celda.innerHTML = 
                `<h5><img src="./img/${ubicacion}.png"  style="height: 40px" >${pais} ${ciudad} </h5> 
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
        const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${keyOpenWeather}&units=metric&lang=es`
        const response=await fetch(url)
        dataW=await response.json()   
        armar(" ","pLatLon")
        map.flyTo({
            center: [longitud, latitud],
            zoom: 3,
            essential: true            
        }); 
        graficoLatLng(latitud,longitud) ;
}

async function fclimaCiudad() {   
        ciudad=document.querySelector("#ciudadId")
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=${keyOpenWeather}&units=metric&lang=es`
        const response=await fetch(url);
        dataW=await response.json();
        armar(ciudad.value,"pCiudad");
        map.flyTo({
            center: [dataW.coord.lon, dataW.coord.lat],
            zoom: 3,
            essential: true            
        }); 
        graficoCiudad();
}

async function fclimaSantiago()  {  
        const url=`https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=${keyOpenWeather}&units=metric&lang=es`
        const response=await fetch(url)
        dataW=await response.json()
        armar("Santiago","pSantiago")
        map.flyTo({
            center: [dataW.coord.lon, dataW.coord.lat],
            zoom: 0,
            essential: true            
        }); 
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

async function fforecastLatLng(latitud,longitud,etiqueta,minima,maxima,sensacion)  {    
        const url=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${keyOpenWeather}&units=metric&lang=es`
        let string="";
        const response=await fetch(url);
        dataW=await response.json(); 
        bloque=document.getElementById("gLatLon");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i);
                string=dataW.list[i].dt_txt.substr(11,5)
                etiqueta.push(string);;
                maxima.push(dataW.list[i].main.temp_max);
                minima.push(dataW.list[i].main.temp_min);
                sensacion.push(dataW.list[i].main.feels_like);
        }       
        bloque=document.getElementById("tLatLng");   
        bloque.innerHTML = `<h6>${dataW.city.country} ${dataW.city.name} Lat. ${latitud} Lon.${longitud}</h6>`;
}

async function fforecastCiudad(etiqueta,minima,maxima,sensacion) {   
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad.value}&appid=${keyOpenWeather}&units=metric&lang=es`
        let string="";
        const response=await fetch(url);
        dataW=await response.json();  
        bloque=document.getElementById("gCiudad");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i);
                string=dataW.list[i].dt_txt.substr(11,5)
                etiqueta.push(string);
                maxima.push(dataW.list[i].main.temp_max);
                minima.push(dataW.list[i].main.temp_min);
                sensacion.push(dataW.list[i].main.feels_like);
        } 
        bloque=document.getElementById("tCiudad");   
        bloque.innerHTML = `<h6>${dataW.city.country} ${dataW.city.name} Lat. ${dataW.city.coord.lat} Lon.${dataW.city.coord.lat}</h6>`;
}

async function fforecastSantiago(etiqueta,minima,maxima,sensacion) {   
        const url=`https://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=${keyOpenWeather}&units=metric&lang=es`
        let string="";
        const response=await fetch(url);
        dataW=await response.json(); 
        bloque=document.getElementById("gSantiago");      
        celda = bloque.querySelectorAll("th");
        for(i=0;i<celda.length;i++){        
                celda[i].innerHTML =armarForecast(i);
                string=dataW.list[i].dt_txt.substr(11,5)
                etiqueta.push(string);
                maxima.push(dataW.list[i].main.temp_max);
                minima.push(dataW.list[i].main.temp_min);
                sensacion.push(dataW.list[i].main.feels_like);
        } 
        bloque=document.getElementById("tSantiago");   
        bloque.innerHTML = `<h6>${dataW.city.country} Santiago Lat. ${dataW.city.coord.lat} Lon.${dataW.city.coord.lat}</h6>`;
}


function armarForecast(idx){
        const img = imagenClima ( dataW.list[idx].weather[0].description,dataW.list[idx].weather[0].main);
        const texto =`<img src="${img}" style="width: 40px"> 
                <P><small>${dataW.list[idx].main.feels_like}℃</p>
        `
        return texto;
}

async function graficoSantiago () {
   const etiqueta= new Array();
   const minima= new Array();
   const maxima= new Array(); 
   const sensacion= new Array(); 
   await  fclimaSantiago();
   await  fforecastSantiago(etiqueta,minima,maxima,sensacion);
   const ctx = document.getElementById('cSantiago');
   const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: etiqueta,
        datasets: [{
            label: 'Mínima',
            data: minima,
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB',
        }, 
      {
        label: 'Sens Termica',
        borderColor: '#ffce56',
        backgroundColor: '#ffce56',
        data: sensacion,
    },
    {
            label: 'Máxima',
            borderColor: '#FF6384',
            backgroundColor: '#FF6384',
            data: maxima,
        }]
    },
});}


async function graficoCiudad () {
        const etiqueta= new Array();
        const minima= new Array();
        const maxima= new Array();
        const sensacion= new Array(); 
        await  fforecastCiudad(etiqueta,minima,maxima,sensacion);
        const ctx = document.getElementById('cCiudad');
        const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                        labels: etiqueta,
                        datasets: [{
                            label: 'Mínima',
                            data: minima,
                            borderColor: '#36A2EB',
                            backgroundColor: '#36A2EB',
                        }, 
                      {
                        label: 'Sens Termica',
                        borderColor: '#ffce56',
                        backgroundColor: '#ffce56',
                        data: sensacion,
                    },
                    {
                            label: 'Máxima',
                            borderColor: '#FF6384',
                            backgroundColor: '#FF6384',
                            data: maxima,
                        }]
                    },
                });
        
                
        }
     
     
 async function graficoLatLng (latitud,longitud) {
        const etiqueta= new Array();
        const minima= new Array();
        const maxima= new Array(); 
        const sensacion= new Array(); 
        await  fforecastLatLng(latitud,longitud,etiqueta,minima,maxima,sensacion);
        const ctx = document.getElementById('cLatLon');
        const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: etiqueta,
                    datasets: [{
                        label: 'Mínima',
                        data: minima,
                        borderColor: '#36A2EB',
                        backgroundColor: '#36A2EB',
                    }, 
                  {
                    label: 'Sens Termica',
                    borderColor: '#ffce56',
                    backgroundColor: '#ffce56',
                    data: sensacion,
                },
                {
                        label: 'Máxima',
                        borderColor: '#FF6384',
                        backgroundColor: '#FF6384',
                        data: maxima,
                    }]
                },
            });}
     