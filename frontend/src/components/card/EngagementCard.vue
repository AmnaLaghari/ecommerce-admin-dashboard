<template>
    <div class="card p-4 d-flex flex-column align-items-center text-center">
      <h5>Conversion Rate: {{ summary.conversionRate }}%</h5>
  
      <div class="d-flex justify-content-around w-100 my-3">
        <div>
          <h6 class="text-muted mb-1">Avg Daily Active Users</h6>
          <h4>{{ summary.avgDAU }}</h4>
        </div>
        <div>
          <h6 class="text-muted mb-1">Avg Daily Buyers</h6>
          <h4>{{ summary.avgDailyBuyers }}</h4>
        </div>
      </div>
  
      <div class="progress rounded-pill" style="height: 24px; width: 100%;" >
    <div
      class="bg-main progress-bar"
      role="progressbar"
      :style="{ width: `${summary.conversionRate}%` }"
      :aria-valuenow="summary.conversionRate"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ summary.conversionRate }}%
    </div>
  </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  
  const summary = ref({ avgDAU: 0, avgDailyBuyers: 0, conversionRate: 0 })
  
  onMounted(async () => {
    const res = await fetch('http://localhost:3000/api/revenue/engagement-summary')
    summary.value = await res.json()
  })
  const circleStyle = computed(() => ({
    background: `conic-gradient(#007bff ${summary.value.conversionRate}%, #e0e0e0 0%)`
  }))
  </script>

  