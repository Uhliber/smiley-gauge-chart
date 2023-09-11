<template>
  <div>
    <canvas ref="smileyGaugeChart" style="pointer-events: none;"></canvas>
  </div>
  <div>
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Gauge Value</label>
      <div class="mt-2 flex rounded-md shadow-sm">
        <div class="relative flex flex-grow items-stretch focus-within:z-10">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <GaugeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input v-model="gaugeValue" @input="handleGaugeValueInput" type="number" name="gaugeValue" id="gaugeValue" class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" min="0" max="100" placeholder="Enter Gauge Value" />
        </div>
        <button type="button" @click="handleGaugeValueRandom" class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <DiceIcon class="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Random
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import GaugeIcon from '@components/icons/GaugeIcon.vue';
import DiceIcon from '@components/icons/DiceIcon.vue';
import Chart from 'chart.js/auto';
import gaugeNeedlePlugin from '@plugins/gaugeNeedle';
import svgLabelsPlugin from '@plugins/svgLabels';

Chart.register(gaugeNeedlePlugin, svgLabelsPlugin);

let gaugeInputTimeout = null;
let gaugeChartInstance = null;

const smileyGaugeChart = ref(null);
const gaugeValue = ref(86)
const segments = ref([
  {
    label: 'Bad',
    color: '#802323',
    backgroundColor: '#ff4545',
    svg: (color, stroke = 0, size = 30) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20"><path stroke="${color}" stroke-width="${stroke}" fill="${color}" d="M8.5 8.5a1 1 0 1 1-1.54-.842l-1.217-.73a.5.5 0 0 1 .514-.857l2.502 1.5a.5.5 0 0 1-.259.93Zm5 0a1 1 0 1 1-2 0a.5.5 0 0 1-.256-.929l2.498-1.5a.5.5 0 0 1 .515.858l-1.216.73a1 1 0 0 1 .459.841Zm.062 4.89a.5.5 0 0 1-.7-.075l-.003-.003a1.942 1.942 0 0 0-.137-.137a3.075 3.075 0 0 0-.507-.37c-.461-.27-1.187-.555-2.213-.555s-1.753.284-2.216.556a3.088 3.088 0 0 0-.508.37a1.92 1.92 0 0 0-.138.137l-.003.003a.5.5 0 0 1-.777-.63l.39.314l-.39-.313v-.001l.002-.001l.002-.002l.005-.006l.014-.018l.049-.054c.04-.043.098-.102.174-.17c.152-.138.375-.315.674-.491c.6-.353 1.5-.694 2.722-.694c1.221 0 2.12.34 2.72.694c.3.176.522.353.673.49a2.877 2.877 0 0 1 .222.226l.015.017l.005.006l.002.003c0 .001.001.002-.389.314l.39-.312a.5.5 0 0 1-.078.702ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></svg>`
    }
  },
  {
    label: 'Poor',
    color: '#80531a',
    backgroundColor: '#ffa534',
    svg: (color, stroke = 0, size = 30) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20"><path stroke="${color}" stroke-width="${stroke}" fill="${color}" d="M7.5 9.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm6-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm.062 4.89a.5.5 0 0 1-.7-.075l-.003-.003a1.91 1.91 0 0 0-.137-.137a3.069 3.069 0 0 0-.507-.37c-.461-.27-1.187-.555-2.213-.555s-1.753.284-2.216.556a3.088 3.088 0 0 0-.508.37a1.92 1.92 0 0 0-.138.137l-.003.003a.5.5 0 0 1-.777-.63l.39.314l-.39-.313v-.001l.002-.001l.002-.002l.005-.006l.014-.018l.049-.054c.04-.043.098-.102.174-.17c.152-.138.375-.316.674-.491c.6-.353 1.5-.694 2.722-.694c1.221 0 2.12.34 2.72.694c.3.176.522.353.673.49a2.907 2.907 0 0 1 .222.226l.015.017l.005.006l.002.003s.001.002-.389.314l.39-.312a.5.5 0 0 1-.078.702ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></svg>`
    }
  },
  {
    label: 'Fair',
    color: '#80711a',
    backgroundColor: '#ffe234',
    svg: (color, stroke = 0, size = 30) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20"><path stroke="${color}" stroke-width="${stroke}" fill="${color}" d="M7.5 9.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm6-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-7 3.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7ZM2 10a8 8 0 1 1 16 0a8 8 0 0 1-16 0Zm8-7a7 7 0 1 0 0 14a7 7 0 0 0 0-14Z"/></svg>`
    }
  },
  {
    label: 'Good',
    color: '#5c6f15',
    backgroundColor: '#b7dd29',
    svg: (color, stroke = 0, size = 30) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20"><path stroke="${color}" stroke-width="${stroke}" fill="${color}" d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16Zm0 1a7 7 0 1 0 0 14a7 7 0 0 0 0-14Zm-2.845 9.427a4.011 4.011 0 0 0 5.512.17l.178-.17a.5.5 0 0 1 .767.636l-.057.07l-.023.022a5.011 5.011 0 0 1-7.087-.023a.5.5 0 0 1 .71-.705ZM12.5 7.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2Zm-5 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z"/></svg>`
    }
  },
  {
    label: 'Great',
    color: '#2c7216',
    backgroundColor: '#57e32c',
    svg: (color, stroke = 0, size = 30) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 20 20"><path stroke="${color}" stroke-width="${stroke}" fill="${color}" d="M6.494 8.075c.045-.295.339-.575.754-.575s.709.28.754.575a.5.5 0 1 0 .988-.15C8.863 7.09 8.104 6.5 7.248 6.5s-1.615.59-1.742 1.425a.5.5 0 1 0 .988.15Zm6.254-.575c-.415 0-.708.28-.754.575a.5.5 0 0 1-.988-.15c.127-.835.886-1.425 1.742-1.425s1.615.59 1.742 1.425a.5.5 0 0 1-.988.15c-.046-.295-.339-.575-.754-.575ZM5.495 10a.5.5 0 0 0-.497.549C5.236 12.992 7.154 15 9.995 15c2.841 0 4.76-2.008 4.998-4.451a.5.5 0 0 0-.498-.549h-9Zm4.5 4c-2.081 0-3.516-1.303-3.912-3h7.825c-.397 1.697-1.831 3-3.913 3ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></svg>`
    }
  },
])

const labels = computed(() => {
  return segments.value.map(segment => segment.label);
})

const dataSegments = computed(() => {
  return Array(segments.value.length).fill(100 / segments.value.length)
});

const backgroundColors = computed(() => {
  return segments.value.map(segment => segment.backgroundColor);
})

const gaugeValueIndex = computed(() => {
  let cumulativeSum = 0;

  for (let i = 0; i < dataSegments.value.length; i++) {
    cumulativeSum += dataSegments.value[i];
    if (cumulativeSum >= gaugeValue.value) {
      return i;
    }
  }
})

const gaugeChartData = reactive({
  labels: labels.value,
  svgLabels: segments.value,
  datasets: [
    {
      label: 'Smiley Gauge Chart',
      data: dataSegments.value,
      backgroundColor: backgroundColors.value,
      borderJoinStyle: 'miter',
      circumference: 180,
      rotation: 270,
      cutout: '60%',
      needleValue: gaugeValue.value,
      needleLength: 60,
      highlightedSvgLabel: gaugeValueIndex.value,
      showLabels: true,
    },
  ],
});

const gaugeChartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    }
  }
});

const initGaugeChart = () => {
  const ctx = smileyGaugeChart.value.getContext('2d');
  gaugeChartInstance = new Chart(ctx,  {
    type: 'doughnut',
    data: gaugeChartData,
    options: gaugeChartOptions,
  });
}

const handleGaugeValueInput = () => {
  if (gaugeInputTimeout) {
    clearTimeout(gaugeInputTimeout);
  }

  gaugeInputTimeout = setTimeout(() => {
    if (gaugeValue.value > 100) {
      gaugeValue.value = 100
    }
    
    updateGaugueValue();
  }, 500);
};

const handleGaugeValueRandom = () => {
  gaugeValue.value = Math.floor(Math.random() * (100 - 0 + 0)) + 0;
  updateGaugueValue();
};

const updateGaugueValue = () => {
  if (gaugeChartInstance) {
    gaugeChartInstance.data.datasets[0].needleValue = gaugeValue.value;
    gaugeChartInstance.data.datasets[0].highlightedSvgLabel = gaugeValueIndex.value;
    gaugeChartInstance.update();
  }
}

onMounted(() => {
  initGaugeChart();
});
</script>

<style scoped>
/* Add your custom styles here if needed */
</style>
