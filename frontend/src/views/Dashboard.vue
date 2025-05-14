<template>
    <div>
      <h1>Revenue Dashboard</h1>
      <canvas id="revenueChart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import Chart from 'chart.js/auto'
  
  onMounted(async () => {
    const res = await fetch('http://localhost:3000/api/revenue')
    const data = await res.json()
  
    const chart = new Chart(document.getElementById('revenueChart'), {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          label: 'Revenue',
          data: data.map(d => d.revenue),
          borderColor: 'blue',
          fill: false
        }]
      }
    })
  })
  </script>
  