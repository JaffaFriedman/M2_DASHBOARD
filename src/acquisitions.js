let etiqueta=[];
let maxima=[];
let minima=[];
let dataW={};

 window.onload = function (){
  Grafico ();
 }

async function getData() {
    const url=`https://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=616629f9acdc3b22b8b09553e632e5da&units=metric&lang=es`
    const response=await fetch(url);
    dataW=await response.json(); 
        let i=0;
        for(i=0;i<40;i++){        
                etiqueta.push(dataW.list[i].dt_txt);
                maxima.push(dataW.list[i].main.temp_max);
                minima.push(dataW.list[i].main.temp_min);
                console.log(minima[i],maxima[i])
             }   
            }

const ctx = document.getElementById('myChart');

async function Grafico () {
   await getData();
   const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: etiqueta,
        datasets: [{
            label: 'Minima',
            data: minima,
            borderColor: '#36A2EB',
            backgroundColor: '#9BD0F5',
        }, {
          label: 'Maxima',
          borderColor: '#FF6384',
          backgroundColor: '#FFB1C1',
          data: maxima,
      }]
    },
});}
