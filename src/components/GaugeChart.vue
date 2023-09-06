<template>
  <div>
    <h1>
      GAUGE CHART
    </h1>
  </div>
</template>

<script setup>
// import { ref, onMounted, onBeforeMount } from 'vue';
// import Chart from 'chart.js/auto';
// import ChartGauge from 'chartjs-gauge';
// import * as helpers from 'chart.js/helpers';
// import GoodIcon from '@assets/smileys/good-icon.svg';

// const smileyGaugeChart = ref(null);

// onBeforeMount(async () => {
//   window.Chart = Chart;
//   Chart.helpers = helpers;
//   await import("chart.js-plugin-labels-dv");
// })

// onMounted(() => {
//   const ctx = smileyGaugeChart.value.getContext('2d');

//   // const data = {
//   //   labels: ['Critical', 'Poor', 'Fair', 'Good', 'Excellent'],
//   //   datasets: [
//   //     {
//   //       label: 'Smiley Gauge Chart',
//   //       data: [20, 20, 20, 20, 20],
//   //       backgroundColor: ['#ff4545', '#ffa534', '#ffe234', '#b7dd29', '#57e32c'],
//   //       circumference: 180,
//   //       rotation: 270,
//   //       cutout: '60%',
//   //     },
//   //   ],
//   // };

//   // // Doughnut chart options
//   // const options = {
//   //   responsive: true,
//   //   maintainAspectRatio: false,
//   //   plugins: {
//   //     // legend: {
//   //     //   display: false,
//   //     // },
//   //     labels: {
//   //       render: 'label'
//   //     }
//   //   }
//   // };

//   // Create the doughnut chart
//   const smiley = new ChartGauge(ctx, {
//     type: 'gauge',
//     data: {
//       labels: ['Critical', 'Poor', 'Fair', 'Good', 'Excellent'],
//       datasets: [{
//         value: 3,
//         minValue: 0,
//         data: [1, 2, 3, 4, 5],
//         backgroundColor: ['#ff4545', '#ffa534', '#ffe234', '#b7dd29', '#57e32c'],
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       needle: {
//         radiusPercentage: 2,
//         widthPercentage: 3.2,
//         lengthPercentage: 10,
//         color: 'rgba(0, 0, 0, 1)'
//       },
//       valueLabel: {
//         display: false,
//       },
//       plugins: {
//         labels: {
//           render: 'label',
//         }
//       }
//     }
//   });
//   console.log(ChartGauge)
//   console.log(smiley)
// });
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
