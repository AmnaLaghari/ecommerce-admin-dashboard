<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" class="chart" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const props = defineProps({ data: Array })

const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Orders by Category'
    }
  }
}

watchEffect(() => {
  if (props.data?.length) {
    chartData.value = {
      labels: props.data.map(c => c.category),
      datasets: [{
        label: 'Orders',
        data: props.data.map(c => c.orders),
        backgroundColor: '#0097b2'
      }]
    }
  }
})
</script>