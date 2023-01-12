/*Version 2.0 04-01-2023
Contiene las funcionalidades del Mapbox y de las tarjetas con la inforamción de clima para cada 
ciudad y zona geográfica y los graficos. Este archivo tiene las siguientes funciones.
        initOpciones 
                Realiza la carga inicial
        refresh1
                Refresca el grafico 1, que muestra el clima de la fecha seleccionada por hora (de la derecha)
        refresh2
                Refresca el grafico 2 , que muestra el clima de a 1 hora seleccionada por 5 dias (del centro)
        tituloLugar
                Permite seleccionar la imagen para el pais o ciudad.
        fclima
                Recupera los datos del clima de este momento mediante la api.
        armarClima
                Arma la tarjeta que depliega los datos del clima
        fforecastF1
                Recupera los datos de la api que tiene el la proyección a 5 dias, los prepara para llamar a la api que realiza el grafico 1
        fforecastF2
                Recupera los datos de la api que tiene el la proyección a 5 dias, los prepara para llamar a la api que realiza el grafico 2
        graficoF1
                Arma la tarjeta del grafico 1
        graficoF2
                Arma la tarjeta del grafico 2
*/ 
import { imagenClima,imagenTermometro,imagenViento } from "./imagenes.js";
import {ffecha, fhora, fdia } from "./fechas.js";
let dataW={};
let dataF={};
let i=0;
 
let keyOpenWeather="24407ce777d816d8c6aee20ffa3aeb63";
//let keyOpenWeather="02bf0d97e9e5722dd8664c905a770e50";
let url="https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=24407ce777d816d8c6aee20ffa3aeb63&units=metric&lang=es";

 
let fechas =document.getElementById('fechas');   
let horas =document.getElementById('horas');   

let buscar= document.getElementById("buscar");
let ciudad=document.getElementById("ciudad");
let tableW1=document.getElementById("tableW1");
let celdaW1= tableW1.querySelectorAll("th");

let  grafF1 = {};
let canvasF1=document.getElementById("canvasF1");
let tableF1=document.getElementById("tableF1");
let celdaF1= tableF1.querySelectorAll("th");

//
let  grafF2 = {};
let canvasF2=document.getElementById("canvasF2");
let tableF2=document.getElementById("tableF2");
let celdaF2= tableF2.querySelectorAll("th");

  
let tituloNb=document.getElementById("tituloNb");
let tituloW1=document.getElementById("tituloW1");
let pais={};
let horaVal="00:00";
let fechaVal=" ";

let opcionesF1=[];
let opcionesF2=[];
let sunrise="";
let sunset="";
let horaLocal=document.getElementById("horaLocal");
window.onload = function() {
        ciudad.value="Santiago";
        url=`https://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=${keyOpenWeather}&units=metric&lang=es`;
        fclima(); 
        url=`https://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=${keyOpenWeather}&units=metric&lang=es`;
        initOpciones();
        graficoF1 ();
        graficoF2 ();
}
async function initOpciones() { 
        let string=" ";        
        const response=await fetch(url);
        dataF=await response.json();  
        fechaVal=dataF.list[8].dt_txt.substr(0,10);
        dataF.list.forEach(e =>{ 
             //   string= fdia(e.dt,dataF.timezone);
            //    console.log(string);
                string=e.dt_txt.substr(0,10);
                if(!opcionesF2.includes(string)) {
                        opcionesF2.push(string);
                        let fecha = document.createElement('option'); 
                        fecha.value=string;
                        fechas.appendChild(fecha);
                }
                
                string=e.dt_txt.substr(11,5);
                if(!opcionesF1.includes(string) && fechaVal===e.dt_txt.substr(0,10)) {
                        opcionesF1.push(string);
                        let hora = document.createElement('option'); 
                        hora.value=string;
                        horas.appendChild(hora);
                }
        })
        document.getElementById("tituloF1").textContent =  "Pronóstico por hora para el dia "+fechaVal; 
        document.getElementById("tituloF2").textContent = " Temperatura Próximos 5 días a las 21:00 horas";
}
 

function refresh1(){
        if ( grafF1 ) {
                grafF1.clear();
                grafF1.destroy(); }
        graficoF1 ();
}

function refresh2(){
      if ( grafF2 ) {
                grafF2.clear();
                grafF2.destroy(); }
       graficoF2 ();
}

function tituloLugar(){
        let ubicacion='ubicacion_1';
        pais=" ";
        if (dataW.sys.country != undefined || dataW.sys.country != null) {pais=dataW.sys.country; ubicacion='ubicacion_0'; }
        if (dataW.name != undefined ||  dataW.name != null) { ciudad.value=dataW.name; ubicacion='ubicacion_1'; }
        tituloW1.innerHTML=`<h5><img src="./img/${ubicacion}.png"  style="height: 50px" >${pais} ${ciudad.value} Latitud: ${dataW.coord.lat} Longitud: ${dataW.coord.lon} </h5>` 
 }

function capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
  }


mapboxgl.accessToken = "pk.eyJ1IjoiamFmZmFmcmllZG1hbiIsImEiOiJjbGJpYTJwajYwbjh3M3JxYmYzbWZmbTB0In0.Be-Ftie95WrhEJUrOUV7QQ";
const map = new mapboxgl.Map({
        container: "map", 
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-70.6483, -33.4569],
        zoom: 4
});
 
map.on("click", (e) => {
        url=`https://api.openweathermap.org/data/2.5/weather?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}&appid=${keyOpenWeather}&units=metric&lang=es`;
        fclima(); 
        url=`https://api.openweathermap.org/data/2.5/forecast?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}&appid=${keyOpenWeather}&units=metric&lang=es`;0
        refresh1 ();
        refresh2 ();         
});

buscar.onclick = function(){
        url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value}&appid=${keyOpenWeather}&units=metric&lang=es`;
        fclima(); 
        url=`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad.value}&appid=${keyOpenWeather}&units=metric&lang=es`;
        refresh1 ();
        refresh2 (); 
}
 
 
document.getElementById("hora")
  .addEventListener("input", function(event){
        if(event.inputType == "insertReplacementText" || event.inputType == null) {
          horaVal=event.target.value;
          event.target.value = "";
          document.getElementById("tituloF2").textContent = " Temperatura Próximos 5 días a las "+horaVal+" horas";
          refresh2 ();
    }
})

document.getElementById("fecha")
  .addEventListener("input", function(event){
        if(event.inputType == "insertReplacementText" || event.inputType == null) {
          fechaVal=event.target.value;
          event.target.value = "";
          document.getElementById("tituloF1").textContent =  " Pronóstico por hora para el dia "+fechaVal; 
          refresh1 ();
    }
})
async function fclima()  {  
        const response=await fetch(url);
        dataW=await response.json();
        await armarClima();
        map.flyTo({
            center: [dataW.coord.lon, dataW.coord.lat],
            zoom: 4,
            essential: true            
        }); 
}

async function armarClima(){
        tituloLugar();
        let imgterm= imagenTermometro (dataW.main.temp);
        sunrise=fhora(dataW.sys.sunrise,dataW.timezone );
        sunset=fhora(dataW.sys.sunset,dataW.timezone);
        let hora=fhora(dataW.dt,dataW.timezone);
        let fecha=ffecha(dataW.dt,dataW.timezone);
        let imgWeather=imagenClima (dataW.weather[0].description,dataW.weather[0].main,sunrise,sunset,hora);
        let imgViento=imagenViento(dataW.wind.deg);
        celdaW1[0].innerHTML= 
                `<p><img src="./img/viento.png"  style="height: 40px; width:40px;" > Viento ${dataW.wind.speed} m/s</p>
                <p><img src="${imgViento}" style="height: 60px;"> ${dataW.wind.deg} grados</p>
                <p><img src="./img/humedad.png" style="height: 40px; width:40px;" >Humedad ${dataW.main.humidity}%</p>
                <p><img src="./img/img_sunrise.png"  style="height: 50px" >${sunrise}</p>
                <p><img src="./img/img_sunset.png"  style="height: 50px" >${sunset} </p>  
                `  
        celdaW1[1].innerHTML = 
                `<p class="align-middle""><img src="${imgWeather}" style="width: 140px" ></p> ` 
        celdaW1[2].innerHTML= 
                `<h3><img src="${imgterm}"  style="height: 80px" > ${dataW.main.temp}℃  </h3> 
                <p><small>Min ${dataW.main.temp_min}℃</p>  
                <p>Max ${dataW.main.temp_max}℃ </p>     
                <p>Sens.Térmica ${dataW.main.feels_like}℃</p>
                <p>${capitalizar(dataW.weather[0].description)}</p>  `      
        if (dataW.timezone/3600+3!=0)
        horaLocal.innerHTML= `<p>Hora Local ${fecha} ${hora}  diferencia con Chile ${dataW.timezone/3600+3} horas </p> `;
        else horaLocal.innerHTML= `<p>Hora Local ${fecha} ${hora}  </p> `;
        }

 

async function fforecastF1(imagen,minima,maxima,sensacion,horasT) {    
        let string="";
        let j=0;
        const response=await fetch(url);
        dataF=await response.json();  
        console.log(dataF)
        dataF.list.forEach(e => {
                string=e.dt_txt.substr(0,10)
                if (string===fechaVal) {
                        horasT.push(e.dt_txt.substr(11,5));
                        imagen.push( imagenClima (e.weather[0].description,e.weather[0].main ,sunrise,sunset,e.dt_txt.substr(11,5)));
                        minima.push(e.main.temp_min);
                        maxima.push(e.main.temp_max);
                        sensacion.push(e.main.feels_like);
                        j++;
                }     
        });   
        celdaF1.forEach((e,i) => {
               if(i<j) {
                        e.innerHTML=`<div class="p-2">
                        <img src="${imagen[i]}" style="width: 30px"> 
                        <p><small>${sensacion[i]}℃</p>  <div>`;   
                }
                 else e.innerHTML=`<p></p>`; });
        
        }
   
async function fforecastF2(imagen,minima,maxima,sensacion,fechasT)  {    
        let string=" ";
        let j=0;
        const response=await fetch(url);
        dataF=await response.json();       
        dataF.list.forEach(e => {
                        string=e.dt_txt.substr(11,5)
                        if (string===horaVal) {
                                fechasT.push(e.dt_txt.substr(0,10));
                              //  fechasT.push(fdia(e.dt,dataF.timezone));
                                imagen.push( imagenClima (e.weather[0].description,e.weather[0].main ,sunrise,sunset,e.dt_txt.substr(11,5)));
                                minima.push(e.main.temp_min);
                                maxima.push(e.main.temp_max);
                                sensacion.push(e.main.feels_like);
                                j++;
                        }     
        });   
        celdaF2.forEach((e,i) => {
                if(i<j){
                        e.innerHTML=`<div class="ps-4">
                        <img src="${imagen[i]}" style="width: 30px"> 
                        <p><small>${sensacion[i]}℃</p> 
                        <div>`;   
                        }
                        else e.innerHTML=`<p></p>`; });
        
}


 async function  graficoF1 () {
        const imagen= new Array();
        const minima= new Array(); 
        const maxima= new Array(); 
        const sensacion= new Array(); 
        const horasT=new Array();
        await fforecastF1(imagen,minima,maxima,sensacion,horasT);
         grafF1 = new Chart(canvasF1, {
                type: 'line',
                data: {
                    labels: horasT,
                    datasets: [
                    {   label: 'Minima',
                        data: minima,
                        borderColor: '#36A2EB',
                        backgroundColor: '#36A2EB',}, 
                    {   label: 'Sens Termica',
                        borderColor: '#ffce56',
                        backgroundColor: '#ffce56',
                        data: sensacion,},
                   {   label: 'Máxima',
                        borderColor: '#FF6384',
                        backgroundColor: '#FF6384',
                        data: maxima,},
                   ]},});

            }
 
async function  graficoF2 () {
                const imagen= new Array();
                const minima= new Array(); 
                const maxima= new Array(); 
                const sensacion= new Array(); 
                const fechasT=new Array();
                 await fforecastF2(imagen,minima,maxima,sensacion,fechasT);
                 grafF2 = new Chart(canvasF2, {
                        type: 'line',
                        data: {
                            labels: fechasT,
                            datasets: [
                            {   label: 'Minima',
                                data: minima, 
                                borderColor: '#36A2EB',
                                backgroundColor: '#36A2EB',}, 
                            {   label: 'Sens Termica',
                                borderColor: '#ffce56',
                                backgroundColor: '#ffce56',
                                data: sensacion,},
                            {   label: 'Máxima',
                                borderColor: '#FF6384',
                                backgroundColor: '#FF6384',
                                data: maxima,},
                           ]},});
                    }    