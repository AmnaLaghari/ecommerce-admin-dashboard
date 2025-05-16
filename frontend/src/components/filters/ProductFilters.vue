<template>
    <div class="d-flex flex-wrap gap-3 mb-4">
      <select class="form-select mx-2" v-model="localFilters.stockStatus">
        <option value="">All Stock</option>
        <option value="in">In Stock</option>
        <option value="low">Low Inventory</option>
        <option value="out">Out of Stock</option>
      </select>
  
      <select class="form-select mx-2" v-model="localFilters.category">
        <option value="">All Categories</option>
        <option>Men's Fashion</option>
        <option>Women's Fashion</option>
        <option>Home and kitchen</option>
        <option>Electronics</option>
        <option>Health</option>
      </select>

      <select class="form-select mx-2" v-model="localFilters.sortBy">
        <option value="">Sort by</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
				<option value="newest">Newest</option>
  			<option value="oldest">Oldest</option>
      </select>
  
      <input
        type="text"
        class="form-control w-auto mx-2 "
        placeholder="Search by name..."
        v-model="localFilters.search"
      />

			<button class="button-primary" @click="clearFilters">Clear Filters</button>
    </div>
  </template>
  
  <script setup>
  import { reactive, watch } from 'vue'
  
  const props = defineProps({
    modelValue: Object
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const localFilters = reactive({
		...props.modelValue,
		sortBy: props.modelValue.sortBy || ''
	})

	function clearFilters() {
		localFilters.stockStatus = ''
		localFilters.category = ''
		localFilters.search = ''
		localFilters.sortBy = ''
	}

  
  watch(
    () => localFilters,
    (newVal) => {
      emit('update:modelValue', { ...newVal })
    },
    { deep: true }
  )
  </script>
  