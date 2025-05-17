<template>
    <div class="chart">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { Line } from 'vue-chartjs'
  import { computed } from 'vue'
  import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
  
  const props = defineProps({
    data: Array
  })
  
  const chartData = computed(() => ({
    labels: props.data?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Revenue',
        data: props.data?.map(item => item.revenue) || [],
        borderColor: '#0097b2',
        tension: 0.4,
        fill: true
      }
    ]
  }))
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Sales Over Time'
      }
    }
  }
  </script>
  