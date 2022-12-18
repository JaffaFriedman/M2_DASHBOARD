let etiqueta=[];
let maxima=[];
let minima=[];
let dataW={};
 async function fforecastSantiago() {   
    const url=`https://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
    const response=await fetch(url);
    dataW=await response.json(); 
    let i=0;

    for(i=0;i<40;i++){        
            etiqueta.push(dataW.list[i].dt_txt);
            maxima.push(dataW.list[i].main.temp_max);
            minima.push(dataW.list[i].main.temp_min);
         }   
         console.log(etiqueta,maxima,minima)
   
  }

  fforecastSantiago() ;


  export{ fforecastSantiago,etiqueta,maxima,minima }
  