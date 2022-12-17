
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    onClick: (e) => {
      const canvasPosition = getRelativePosition(e, chart);

      // Substitute the appropriate scale IDs
      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
    }
  }
});
 
const data = {
  labels: generateLabels(),
  datasets: [
    {
      label: 'Dataset',
      data: generateData(),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
      fill: false
    }
  ]
};

const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: (ctx) => 'Fill: ' + ctx.chart.data.datasets[0].fill
      }
    },
    interaction: {
      intersect: false,
    }
  },
};

const inputs = {
  min: -100,
  max: 100,
  count: 8,
  decimals: 2,
  continuity: 1
};

const generateLabels = () => {
  for(i=0;i<40;i++){        
   etiqueta.push(data.list[i].dt_text);
}  
};

const generateData = () =>  {
  for(i=0;i<40;i++){        
   maxima.push(data.list[i].main.temp_max);
   //minima.push(data.list[i].main.temp_min);
}  
};