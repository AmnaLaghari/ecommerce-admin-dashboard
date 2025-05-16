<template>
    <div>
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script setup>
  import { Pie } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  const props = defineProps({ data: Array })
  
  const chartData = {
    labels: props.data.map(c => c.category),
    datasets: [
      {
        label: 'Revenue',
        data: props.data.map(c => c.revenue),
        backgroundColor: [
          '#007bff', '#28a745', '#ffc107', '#6610f2', '#fd7e14'
        ],
        hoverOffset: 12,
        borderWidth: 1
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue by Category',
        padding: { top: 10, bottom: 20 }
      },
      legend: { position: 'bottom' },
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
  