<template>
    <div class="row my-3">
        <div class="col">
            <div class="card p-4 text-center">
                <fa icon="trophy" size="2x" class="kpi-icon" />
                <h6 class="text-muted mb-1">Top Category</h6>
                <h4>{{ data.topCategory.category }}</h4>
                <p class="text-success fw-bold mb-0">${{ data.topCategory.revenue }}</p>
            </div>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <div class="card p-4 text-center">
                <fa icon="trophy" size="2x" class="kpi-icon" />
                <h6 class="text-muted mb-1">Top Product</h6>
                <h4>{{ data.topProduct.name }}</h4>
                <p class="text-primary fw-bold mb-0">${{ data.topProduct.revenue }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ data: Object })
</script>