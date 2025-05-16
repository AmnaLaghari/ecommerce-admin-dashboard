<template>
  <div class="kpi-card card text-center shadow-sm h-100">
    <div class="card-body">
      <div class="kpi-icon mb-2" v-if="icon">
        <fa :icon="icon" size="2x" class="kpi-icon" />
      </div>
      <h6 class="card-title text-muted">{{ title }}</h6>
      <h4 class="card-text fs-4 fw-semibold mb-0">{{ value }}</h4>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: [String, Array] 
})
</script>

