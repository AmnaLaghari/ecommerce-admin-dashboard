<template>
    <div>
      <Bar :data="chartData" :options="chartOptions" class="bar-chart"/>
    </div>
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs'
  import { computed } from 'vue'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
  
  const props = defineProps({ data: Array })
  
  const chartData = computed(() => ({
    labels: props.data.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: props.data.map(item => item.revenue),
        backgroundColor: '#0097b2'
      }
    ]
  }))
  
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue Growth'
      },
      legend: { display: false }
    }
  }
  </script>
  