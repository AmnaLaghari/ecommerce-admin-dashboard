<template>
    <div class="row my-3">
        <div class="col">
            <div class="card p-4 text-center shadow-sm">
                <fa icon="trophy" size="2x" class="kpi-icon" />
                <h6 class="text-muted mb-1">Top Category</h6>
                <h4>{{ data.topCategory.category }}</h4>
                <p class="text-success fw-bold mb-0">
                    ${{ (data.topCategory.revenue / 1000).toFixed(1) }}k
                </p>
            </div>
        </div>
    </div>
    <div class="row my-3">
        <div class="col">
            <div class="card p-4 text-center shadow-sm">
                <fa icon="trophy" size="2x" class="kpi-icon" />
                <h6 class="text-muted mb-1">Top Product</h6>
                <h4>{{ data.topProduct.name }}</h4>
                <p class="text-success fw-bold mb-0">
                    {{ data.topProduct && data.topProduct.revenue != null
                        ? `$${data.topProduct.revenue.toLocaleString(undefined, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}`
                        : 'N/A'
                    }}
                </p>

            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ data: Object })
</script>