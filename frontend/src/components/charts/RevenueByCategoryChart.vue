<template>
    <div>
      <Doughnut :data="chartData" :options="chartOptions" class="pie-chart"/>
    </div>
  </template>
  
  <script setup>
  import { Doughnut } from 'vue-chartjs'
  import { computed } from 'vue'
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  const props = defineProps({ data: Array })
  
  const chartData = computed(() => ({
    labels: props.data?.map(c => c.category) || [],
    datasets: [
      {
        label: 'Revenue',
        data: props.data?.map(c => c.revenue) || [],
        backgroundColor: [
          '#0097b2', '#1fbeda', '#5499a5', '#0b6b7c', '#34b2c9'
        ],
        hoverOffset: 12,
        borderWidth: 1
      }
    ]
  }))
  
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue by Category',
        padding: { top: 10, bottom: 20 }
      },
      legend: { position: 'right' },
      tooltip: {
        callbacks: {
          label: context => {
            const category = context.label
            const value = context.parsed
            const percent = props.data.find(d => d.category === category)?.percent
            return `${category}: $${value.toFixed(2)} (${percent}%)`
          }
        }
      }
    }
  }
  </script>
  